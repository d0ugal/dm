title: Finding dead code with Vulture
category: python
tags: vulture, cleanup, python, openstack
date: 2016-12-16 08:24:10
author: Dougal Matthews
alias: 2016/Dec/15/finding-dead-code-with-vulture/

Somebody recently introduced me to [Vulture], a Python project for finding
dead code.

> Vulture uses the ast module to build abstract syntax trees for all given
> files. While traversing all syntax trees it records the names of defined and
> used objects. Afterwards, it reports the objects which have been defined, but
> not used. This analysis ignores scopes and focuses only on object names.

That quote is taken from the project readme, it gives you a good overview of
how it works.

After you have installed ([I installed] Vulture with [pipsi]) usage is as
simple as...

    vulture path/to/code

For example, given this small bit of Python

```python
def fn():
    x = 1
    return 2

fn()
```

Saving that and running vulture against it will give me the following output.

    $ vulture code.py
    code.py:2: Unused variable 'x'

It cleverly finds the variable defined in a function that isn't used. It does
know that the function is used. This works well over multiple files too.

Using `--exclude` can create more useful results. Often you can find code that
isn't used with [coverage.py]. However, I generally run only with my unit
tests, so it is quite common for dead code to be left, with a single unit test
validating that it still works. Vulture's exclude flag means you can exclude
the tests, so code only used in the tests will appear unused.

I used this trick to look for dead code in [MkDocs].

    $ vulture mkdocs --exclude mkdocs/tests

You can see what that output looks like in this
[gist](https://gist.github.com/d0ugal/fd50b633e586a8c5239e9bad61674197). I also
used it on some OpenStack projects I am involved with
[and](https://review.openstack.org/#/c/409255/)
[found](https://review.openstack.org/#/c/409256/)
[some](https://review.openstack.org/#/c/409257/)
[unused](https://review.openstack.org/#/c/409258/) code I could then delete.

Unfortunately, false positives are common. Vulture only gives you a good place
to start your investigation. For example, if used on a library, you will have
code that is expected to be used externally (and is only called by your tests).
Vulture will also complain that every unittest test class isn't used as you
never directly make instances of it. This is also an issue for projects that
follow convention, like Django.

Despite these limitations, I found it very useful for getting some easy wins
and removing dead code. If you are familiar with the code, scanning through the
report is pretty quick and easy.

[I installed]: http://www.dougalmatthews.com/2016/Nov/12/create-an-excellent-python-dev-env/
[Vulture]: https://pypi.python.org/pypi/vulture
[coverage.py]: https://coverage.readthedocs.io
[pipsi]: https://github.com/mitsuhiko/pipsi
[MkDocs]: http://www.mkdocs.org/
