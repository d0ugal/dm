title: Mistral Workflow Engine
category: openstack
tags: python, openstack, workflow
date: 2016-09-15 08:35
author: Dougal Matthews

This year I have been getting to know [Mistral], the [OpenStack] workflow service. This post is going to be a bit of an introduction to the project and share some of my experiences with it.

But, first, what is a workflow service anyway?

> A workflow management system (WFMS) provides an infrastructure for the set-up, performance and monitoring of a defined sequence of tasks, arranged as a workflow.

That is the one-line description from [Wikipedia]. Put simply, a workflow is a set of connected tasks that will be executed.

The project is developed in the OpenStack community, but **can be used outside of OpenStack**. We’ll come back to that later.

## The Hello Workflow

Okay, so, let’s start with a simple workflow and see what it does and how it works. That should help you get a feel for what the project can do.

We will be using the [Mistral DSL v2], which is currently the only supported workflow specification.

```YAML
version: '2.0'

hello_world:
    tasks:
        say_hello:
            action: std.echo output="Hello Workflow!”
            publish:
                output: <% task(say_hello).result %>
```

This is almost the simplest workflow possible, but it reveals a number of features in the Mistral DSL. We’ll step through it.

First we need to specify the version we are working with, at the moment this needs to be `version: ‘2.0’`.

Next we have the name of our workflow, `hello_world` and this workflow is made up of a set of tasks, in this case we only have one task, called `say_hello`. The workflow calls the `std.echo` function and passes a string as input. Once the task is finished, it will publish the result of the task and the workflow ends.

If we save the above workflow in a file called `hello_world.yaml` we can then register it with the Mistral API.

```shell
$ mistral workflow-create hello_world.yaml;
```

Now that this workflow is stored in Mistral we can easily trigger it at any point. Workflows are started by creating executions.

```shell
$ mistral execution-create hello_world;
```

After this workflow has been started it can be monitored easily with the following commands. The `hello_world` workflow should finish almost instantly, but workflows can run for an extended period of time.

```shell
$ mistral execution-list;
$ mistral execution-get $UUID;
$ mistral execution-get-output $UUID;
```

## What are actions?

Actions are really where all the power comes from, without them the workflow wouldn't do very much, workflows just link together and connect a series of actions.

It is often helpful to isolate and run Mistral actions directly as you design the workflow. With the following action call we can replicate the functionality of the workflow above (since it only called one action).

```shell
$ mistral run-action std.echo '{"output": "Hello Workflow!"}'
{"result": "Hello Workflow!"}
```

The Mistral documentation has a good primer for [writing custom actions].

# Using Mistral without OpenStack?

OpenStack is a great project, and it is huge. So unless you are using it already it is unlikely you will install OpenStack to try Mistral. Thankfully Mistral isn't tied to OpenStack at all, but it can integrate well.

Mistral can either be authenticated with Keystone and be a service in your overcloud or you can manage the authentication yourself.


[OpenStack]: https://www.openstack.org/
[Wikipedia]: https://en.wikipedia.org/wiki/Workflow_management_system
[Mistral]: http://docs.openstack.org/developer/mistral/
[Mistral DSL v2]: http://docs.openstack.org/developer/mistral/dsl/dsl_v2.html
[writing custom actions]: http://docs.openstack.org/developer/mistral/developer/creating_custom_action.html
