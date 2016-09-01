title: Automate publishing to PyPI with pbr and Travis
category: python
tags: python, pypi, pbr, travis
date: 2016-05-03
author: Dougal Matthews

Releasing new versions of your Open Source projects is a time demanding task. So in a [recent][retrace], and admitedly small, project I decided to try and make it as easy as possible.

I started using [pbr] and [Travis] to automatically deploy to [PyPI] each time I push a git tag. This means, creating a new release is as simple as `git tag 1.0.0 && git push origin --tags`. Let's break that down a bit.

## pbr

[Python Build Reasonableness][pbr](PBR) is a library for making packaging easier and more consistent. So long as you are happy to use it's conventions it works very well. The project is developed under the OpenStack umbrella and used on most project. That is how I was first introduced to it, but it works well outside of this ecosystem.

To use pbr, you need to add it to your `setup.py`, the project encourages using a setup.cfg, so your full setup.py might look like this.

```python
#!/usr/bin/env python

from setuptools import setup

setup(
    setup_requires=['pbr>=1.9', 'setuptools>=17.1'],
    pbr=True,
)
```

For retrace I had to make a few [extra additions][setuppy] because it is packaging up a single file, rather than a directory. After you have done this, much of the familiar details from a setup.py are added to a setup.cfg. This is most of the [retrace setup.cfg][setupcfg]

```
[metadata]
name = retrace
author = Dougal Matthews
author-email = dougal@dougalmatthews.com
summary = Configurable retrying.
description-file = README.rst
home-page = https://github.com/d0ugal/retrace
classifier =
    Intended Audience :: Developers'
    Natural Language :: English'
    Programming Language :: Python'
    Programming Language :: Python :: 2.7'
    Programming Language :: Python :: 3.4'
    Programming Language :: Python :: 3.5'

[files]
packages =
    retrace

[wheel]
universal = 1
```




[pbr]: http://docs.openstack.org/developer/pbr/
[PyPI]: https://pypi.python.org/pypi
[Travis]: https://travis-ci.org/
[retrace]: http://d0ugal.github.io/retrace/
[setuppy]: https://github.com/d0ugal/retrace/blob/master/setup.py
[setupcfg]: https://github.com/d0ugal/retrace/blob/master/setup.cfg