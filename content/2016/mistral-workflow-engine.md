title: Mistral Workflow Engine
category: openstack
tags: python, openstack, workflow, mistral
date: 2016-11-18 14:35
author: Dougal Matthews

This year I have been getting to know [Mistral], the [OpenStack] workflow
service and recently joined the [Mistral core team]. This post is going to be a
bit of an introduction to the project and share some of my experiences with it.

But, first, what is a workflow service anyway?

> A workflow management system (WFMS) provides an infrastructure for the
> set-up, performance and monitoring of a defined sequence of tasks, arranged
> as a workflow.

That is the one-line description from [Wikipedia]. Put simply, a workflow is a
set of connected tasks that will be executed. However, the real advantage with
a service like Mistral is that it manages and stores the state of the workflow.
This means that it is able to restart or retry from any point.

The project is developed in the OpenStack community, but **can be used outside
of OpenStack**. We’ll come back to that later.

## The Hello Workflow

Okay, so, let’s start with a simple workflow and see what it does and how it
works. This should give you a taste of what the Mistral Workflow language looks
like but this example is poor - I plan to demonstrate more interesting examples
in future posts.

```YAML
version: '2.0'

hello_world:
    tasks:
        say_hello:
            action: std.echo output="Hello Workflow!”
            publish:
                output: <% task(say_hello).result %>
```

This is almost the simplest workflow possible, but it reveals a number of
features in the Workflow language. We’ll step through it.

First we need to specify the version we are working with, at the moment this
needs to be `version: ‘2.0’`. It is the only supported version.

Next we have the name of our workflow, `hello_world` and this workflow is made
up of a set of tasks, in this case we only have one task, called `say_hello`.
The workflow calls the `std.echo` action and passes a string as input. Once
the task is finished, it will publish the result of the task and the workflow
ends.

If we save the above workflow in a file called `hello_world.yaml` we can then
register it with the Mistral API.

```shell
$ mistral workflow-create hello_world.yaml;
```

Now that this workflow is stored in Mistral we can easily trigger it at any
point. Workflows are started by creating executions.

```shell
$ mistral execution-create hello_world;
```

After this workflow has been started it can be monitored easily with the
following commands. The `hello_world` workflow should finish almost instantly,
but workflows can run for an extended period of time.

```shell
$ mistral execution-list;
$ mistral execution-get $UUID;
$ mistral execution-get-output $UUID;
```

## What are actions?

Actions are really where all the power comes from, without them the workflow
wouldn't do very much, workflows just link together and connect a series of
actions.

It is often helpful to isolate and run Mistral actions directly as you design
the workflow. With the following action call we can replicate the functionality
of the workflow above (since it only called one action).

```shell
$ mistral run-action std.echo '{"output": "Hello Workflow!"}'
{"result": "Hello Workflow!"}
```

Mistral only provides a small set of [system actions] \(Mistrals standard
library), but they are all useful. Mistral also ships OpenStack actions for all
the OpenStack services - these are extremely useful.

Most Mistral users will want to write custom actions eventually, the Mistral 
documentation has a brief primer for [writing custom actions]. I hope to write
more about this later and also make some improvements to the official
documentation.


# Without OpenStack?

OpenStack is a great project, and it is huge. So unless you are using it
already it is unlikely you will install OpenStack to use Mistral. Thankfully
Mistral isn't tied to OpenStack at all, but it can integrate well. Essentially,
if you want to use Mistral with OpenStack you would setup KeyStone
authentication (Keystone is the OpenStack identity service). Otherwise you can 
use keycloak or run Mistral without authentication (but behind a proxy which
should add authentication).

The documentation for this again is poor and something I want to write about
and improve. So watch this space.

[OpenStack]: https://www.openstack.org/
[Wikipedia]: https://en.wikipedia.org/wiki/Workflow_management_system
[Mistral]: http://docs.openstack.org/developer/mistral/
[Mistral DSL v2]: http://docs.openstack.org/developer/mistral/dsl/dsl_v2.html
[writing custom actions]: http://docs.openstack.org/developer/mistral/developer/creating_custom_action.html
[Mistral core team]: http://lists.openstack.org/pipermail/openstack-dev/2016-November/107021.html
[system actions]: http://docs.openstack.org/developer/mistral/dsl/dsl_v2.html#system-actions
