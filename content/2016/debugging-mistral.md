title: Debugging Mistral in TripleO
category: openstack
tags: python, mistral, debug, tripleo
date: 2016-09-19 15:15
author: Dougal Matthews

During the OpenStack Newton cylce the TripleO project has started to use [Mistral], the OpenStack Workflow service. This has allowed us to provide an interface to TripleO that is used by the CLI and the new GUI (and potentially other consumes in the future).

We naturally had to debug a few problems along the way. We'll go through the steps to track down the issue.

## Mistal Primer

In TripleO, we call Mistral in two different ways - either by starting [Workflows] or directly calling [Actions]. Workflows are started by creating [Executions], this then represents the running workflow. Running actions are represented by Action Executions. Since Workflows are typically are made up of a number of action calls (or sub-workflow calls) this means start a Workflow will start one or more Executions and one or more Action Executions.

Unfortunately it isn't always clear if you are calling a workflow or action directly. So, first things first, what is happening in Mistral? Let's list the workflow executions and the action executions.

```
$ openstack workflow execution list
$ openstack action execution list
# or
$ mistal execution-list
$ mistal action-execution-list
```

These commands can be generally useful if you are waiting for something to finish and want to look for signs of progress.

The most important columns to pay attention to are the "Workflow name" and "State" in both. Then then "State info" in the execution list and the "Task name" in the action execution list.

## Finding the error

Okay, so something has gone wrong. Maybe you have an error that mentions Mistral or you noticed an error state in either the execution list or action execution list.

First check the executions. If you have a Workflow in error state, then you often want to look at the action executions unless there is an error in the workflow itself. The output here should give us enough information to tell if the workflow is a problem or one of the actions.

```bash
mistral execution-list | grep "ERROR";
# Grab the execution ID from above.
mistral execution-get $EXECUTION_ID;
mistral execution-get-output $EXECUTION_ID;
```

Then check the actions. Often these are more useful to look at, but you first want to know which workflow execution you are debugging.

```bash
# Also look at the actions
mistral action-execution-list;
mistral action-execution-get-output $ACTION_ID;
```

> NOTE: Sometimes an action execution is in the ERROR state, but that is expected. For example, in some workflows we check if a swift container exists and it is an "ERROR" if it doesn't, but it just changes the Workflow logic.

Hopefully this gives you some idea what is going on, but you may need to look into the Logs fo the full traceback...


## Logs

The Mistral log is very detailed and useful for in depth debugging. To follow it and look for messages from the TripleO actions, or ERROR's I find this very useful.

```bash
tail -f /var/log/mistral/mistral-server.log | grep "ERROR\|tripleo_common";
```

## Common-ish Problems

A couple of problems I've seen a few times and how they can be spotted.

- "Error response from Zaqar. Code: 503. Title: Service temporarily unavailable. Description: Messages could not be enqueued. Please try again in a few seconds.."

Sometimes workflows will fail when sending messages to Zaqar, this is how the result of a workflow is reported. Unfortunately this is hard to debug. You can usually safely retry the full workflow, or retry the individual task.

```bash
mistral task-list;
# Find the ID for the failed task.
mistral task-rerun $ID;
```

Hopefully we can resolve this issue: https://bugs.launchpad.net/tripleo/+bug/1626103


- Another problem? I shall add to this as they come up!


[Mistral]: http://docs.openstack.org/developer/mistral/
[Workflows]: http://docs.openstack.org/developer/mistral/terminology/workflows.html
[Actions]: http://docs.openstack.org/developer/mistral/terminology/actions.html
[Executions]: http://docs.openstack.org/developer/mistral/terminology/executions.html
