title: Mistral Flow Control
category: openstack
tags: python, openstack, tripleo, mistral
date: 2017-01-09 14:2018
author: Dougal Matthews

When writing a Mistral [workflow] it is common that you want to add a condition
to a specific task. For example, you only want to run a task if the user
provided a specific input to the workflow. I found this counter intuitive at 
first and have since explained it to a few people, so I wanted to document it 
for the future.

As a contrived example, we want a workflow that returns "x is true" if we
pass the x input or "x is not true" if it isn't passed (or false is passed).

As a Pythonista, I wanted to solve the problem with something equivalent to 
this short Python code. It's just a simple if/else after all.

```python
def workflow(x=False):
    if x:
        return "x is true"
    else:
        return "x is not true"
```

In Mistral's [Workflow DSL] you need to think about it a little differently. 

```yaml
my_workflow:
  input:
    - x: false

  tasks:
    task_switch:
      on-success:
        task_a: <% $.x = true %>
        task_b: <% $.x != true %>
    task_a:
      action: std.echo output="x is true"
    task_b:
      action: std.echo output="x is not true"
```

In this workflow we have two tasks, `task_a` and `task_b`, they perform the
different outcomes we want. The logic that switches between them becomes a task
of it's own. The task `task_switch` doesn't specify an action or workflow to
run, this means that it performs a `std.noop`. On the success of this, which
should always happen, we then use a mapping of tasks and conditions (in the
`on-success` attribute) to specify what happens next. `task_a` and `task_b` are
the tasks and on the right of these we have the YAQL expression which is
evaluated to determine if they run. If their result is truthy, that task will
be scheduled for execution.

In our case, if I run the workflow with x=true, then it will evaluate to the 
following and only `task_a` will be executed.:

```yaml
on-success:
  task_a: true
  task_b: false
```

This then becomes something like a switch statement, however, unlike a switch
statement in most languages, multiple tasks and workflow paths can be followed
rather than the first that turns out to be true.

Here is a slightly more complicated workflow that shows multiple tasks being
called depending on the input.

```yaml
my_workflow:
  input:
    - letter

  tasks:
    task_switch:
      on-success:
        letter_a: <% $.letter = 'a' %>
        letter_a_or_b: <% $.letter in ['a', 'b']  %>
        letter_other: <% not $.letter in ['a', 'b'] %>
    letter_a:
      action: std.echo output="letter is a"
    letter_a_or_b:
      action: std.echo output="letter a or b"
    letter_other:
      action: std.echo output="letter is not a or b"
```

Input 'a' means tasks `letter_a` and `letter_a_or_b` are executed. Input 'b'
means that only `letter_a_or_b` is executed and any other input would execute
the `letter_other` command.

As mentioned before, these examples are contrived, but they can be quite useful
when used in larger workflows to control the flow or provide some simple
validation.

[Workflow]: http://docs.openstack.org/developer/mistral/terminology/workflows.html
[Workflow DSL]: http://docs.openstack.org/developer/mistral/dsl/dsl_v2.html
