title: Interactive Mistral Workflows over Zaqar
category: openstack
tags: openstack, tripleo, ansible, python, mistral, zaqar
date: 2017-01-31 7:40:41
author: Dougal Matthews

It is possible to do some really nice automation with the Mistral Workflow
engine. However, sometimes user input is required or desirable. I set about to
write an interactive Mistral Workflow, one that could communicate with a user
over Zaqar.

<b>If you are not familiar with Mistral Workflows you may want to start
[here](http://www.dougalmatthews.com/2016/Nov/18/mistral-workflow-engine/),
[here](http://www.dougalmatthews.com/2017/Jan/09/mistral-flow-control/) or
[here](http://docs.openstack.org/developer/mistral/).</b>

### The Workflow

Okay, this is what I came up with.

```yaml
---
version: '2.0'

interactive-workflow:

  input:
    - input_queue: "workflow-input"
    - output_queue: "workflow-output"

  tasks:

    request_user_input:
      action: zaqar.queue_post
      retry: count=5 delay=1
      input:
        queue_name: <% $.output_queue %>
        messages:
          body: "Send some input to '<% $.input_queue %>'"
      on-success: read_user_input

    read_user_input:
      pause-before: true
      action: zaqar.queue_pop
      input:
        queue_name: <% $.input_queue %>
      publish:
        user_input: <% task(read_user_input).result[0].body %>
      on-success: done

    done:
      action: std.echo output=<% $.user_input %>
      action: zaqar.queue_post
      retry: count=5 delay=1
      input:
        queue_name: <% $.output_queue %>
        messages:
          body: "You sent: '<% $.user_input %>'"
```

Breaking it down...

1. The Workflow uses two queues one for input and one for output - it would be
   possible to use the same for both but this seemed simpler.

2. On the first task, `request_user_input`, the Workflow sends a Zaqar message
   to the user requesting a message be sent to the `input_queue`.

3. The `read_user_input` task pauses before it starts, see the `pause-before:
   true`. This means we can unpause the Workflow after we send a message. It
   would be possible to create a loop here that polls for messages, see below
   for more on this.

4. After the input is provided, the Workflow must be un-paused manually. It
   then reads from the queue and sends the message back to the user via the
   output Zaqar queue.


### See it in Action

We can demonstrate the Workflow with just the Mistral client. First you need to
save it to a file and use the `mistral workflow-create` command to upload it.

First we trigger the Workflow execution.

```
$ mistral execution-create interactive-workflow
+-------------------+--------------------------------------+
| Field             | Value                                |
+-------------------+--------------------------------------+
| ID                | e8e2bfd5-3ae4-46db-9230-ada00a2c0c8c |
| Workflow ID       | bdd1253e-68f8-4cf3-9af0-0957e4a31631 |
| Workflow name     | interactive-workflow                 |
| Description       |                                      |
| Task Execution ID | <none>                               |
| State             | RUNNING                              |
| State info        | None                                 |
| Created at        | 2017-01-31 08:22:17                  |
| Updated at        | 2017-01-31 08:22:17                  |
+-------------------+--------------------------------------+
```

The Workflow will complete the first task and then move to the `PAUSED` state
before `read_user_input`. This can be seen with the `mistral execution-list`
command.

In this Workflow we know there will now be a message in Zaqar now. The Mistral
action `zaqar.queue_pop` can be used to receive it...

```
$ mistral run-action zaqar.queue_pop '{"queue_name": "workflow-output"}'
{"result": [{"body": "Send some input to 'workflow-input'", "age": 4, "queue": {"_metadata": null, "client": null, "_name": "workflow-output"}, "href": null, "ttl": 3600, "_id": "589049397dcad341ecfb72cf"}]}
```

The JSON is a bit hard to read, but you can see the message body `Send some input to 'workflow-input'`.

Great. We can do that with another Mistral action...

```
$ mistral run-action zaqar.queue_post '{"queue_name": "workflow-input", "messages":{"body": {"testing": 123}}}'
{"result": {"resources": ["/v2/queues/workflow-input/messages/589049447dcad341ecfb72d0"]}}
```

After sending the message back to the requested Workflow we can unpause it.
This can be done like this...

```
$ mistral execution-update -s RUNNING e8e2bfd5-3ae4-46db-9230-ada00a2c0c8c
+-------------------+--------------------------------------+
| Field             | Value                                |
+-------------------+--------------------------------------+
| ID                | e8e2bfd5-3ae4-46db-9230-ada00a2c0c8c |
| Workflow ID       | bdd1253e-68f8-4cf3-9af0-0957e4a31631 |
| Workflow name     | interactive-workflow                 |
| Description       |                                      |
| Task Execution ID | <none>                               |
| State             | RUNNING                              |
| State info        | None                                 |
| Created at        | 2017-01-31 08:22:17                  |
| Updated at        | 2017-01-31 08:22:38                  |
+-------------------+--------------------------------------+
```

Finally we can confirm it worked by getting a message back from the Workflow...

```
$ mistral run-action zaqar.queue_pop '{"queue_name": "workflow-output"}'
{"result": [{"body": "You sent: '{u'testing': 123}'", "age": 6, "queue": {"_metadata": null, "client": null, "_name": "workflow-output"}, "href": null, "ttl": 3600, "_id": "5890494f7dcad341ecfb72d1"}]}
```

You can see a new message is returned which shows the input we sent.

### Caveats

As mentioned above, the main limitation here is that you need to manually
unpause the Workflow. It would be nice if there was a way for the Zaqar message
to automatically do this.

Polling for messages in the Workflow would be quite easy, with a `retry` loop
and Mistral's `continue-on`. However, that would be quite resource intensive.
If you wanted to do this, a Workflow task like this would probably do the
trick.

```yaml
  wait_for_message:
    action: zaqar.queue_pop
    input:
      queue_name: <% $.input_queue %>
    timeout: 14400
    retry:
      delay: 15
      count: <% $.timeout / 15 %>
      continue-on: <% len(task(wait_for_message).result) > 0 %>
```

The other limitation is that this Workflow now requires a specific interaction
pattern that isn't obvious and documenting it might be a little tricky. However,
I think the flexible execution it provides might be worthwhile in some cases.
