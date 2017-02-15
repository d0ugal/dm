title: Mistral on-success, on-error and on-complete
category: openstack
tags: python, openstack, workflow, mistral
date: 2017-02-14 16:35
author: Dougal Matthews

I spent a bit of time today looking into the subtleties of the Mistral task
properties `on-success`, `on-complete` and `on-error` when used with the `fail`
engine commands.

As an [upcoming docs patch](https://review.openstack.org/#/c/433557/) explains,
these are similar to the Python try, except, finally blocks. Meaning, that it
would look like the following.

```python
try:
    action()
    # on-success
except:
    # on-error
finally:
    # on-complete
```

I was looking to see how the Mistral engine command would work in combination
with these. In [TripleO] we want to mark a workflow as failed if it sends a
Zaqar message with the value `{"status": "FAILED"}`. So our task would look a
bit like this...

[TripleO]: https://github.com/openstack/tripleo-common/blob/master/workbooks/baremetal.yaml

```yaml
      send_message:
        action: zaqar.queue_post
        input:
          queue_name: <% $.queue_name %>
          messages:
            body:
              status: <% $.get('status', 'SUCCESS') %>
        on-complete:
          - fail: <% $.get('status') = "FAILED" %>
```

This task uses the `zaqar.queue_post` action to send a message containing the
status. Once it is complete it will fail the workflow if the status is equal
to `"FAILED"`. Then in the `mistral execution-list` the workflow will show as
failed. This is good, because we want to surface the best error in the
execution list.

However, if the `zaqar.queue_post` action fails then we want to surface that
error instead. At the moment it will still be possible to see it in the list
of action executions. However, looking at the workflow executions it isn't
obvious where the problem was.

Changing the above example to on-success solves that. We only want to manually
mark the workflow as having failed if the Zaqar message was sent with the
FAILED status. Otherwise if the message fails to send, the workflow will error
anyway with a more detailed error.
