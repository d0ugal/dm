title: Automate publishing to PyPI with pbr and Travis
category: python
tags: python, pypi, pbr, travis, twine, mkdocs
date: 2016-09-01 08:37
author: Dougal Matthews

Releasing new versions of your Open Source projects is a time demanding task.
So in a [recent][retrace], and admittedly small, project I decided to try and
make it as easy as possible.

I started using [pbr] and [Travis] to automatically deploy to [PyPI] each time
I push a git tag. This means, creating a new release is as simple as `git tag
1.0.0` and `git push origin --tags`. Anyone with commit access can then easily
and confidently roll a release.

Let's break that down a bit.

## pbr

[Python Build Reasonableness][pbr] is a library for making packaging easier
and more consistent. If you are happy to use it's conventions, which are
mostly reasonable, it works very well. The project is developed under the
OpenStack umbrella and used on most[^1] OpenStack project. That is how I was
first introduced to it, but it works well outside of this ecosystem.

To use [pbr], you need to add it to your `setup.py`, the project encourages
using a setup.cfg, so your full setup.py should look like this.

```python
#!/usr/bin/env python

from setuptools import setup

setup(
    setup_requires=['pbr>=1.9', 'setuptools>=17.1'],
    pbr=True,
)
```

For retrace I had to make a few [extra additions][setuppy] because it is
packaging up a single file, rather than a directory. After you have done this,
much of the familiar details from a setup.py are added to a setup.cfg. This is
most of the [retrace setup.cfg][setupcfg].

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

One of the *really* useful features in pbr is that it automatically versions
your projects. It uses git tags for this, so if you tag something `1.0.0,`
then the version published to PyPI etc. will be `1.0.0`. Then if you do some
commits (lets say 5) and pip install then you will install `1.0.0.dev5`.
Tagging a `1.0.1` then versions your bug fix release and resets the dev
counter.

It's really simple and removed the need to manually bump versions, which is
one of the manual steps that can easily be messed up.

## Travis

Hopefully most people know [Travis], it is CI-aaS, Continuous Integration as a
Service. They have built a really great product which they make free for Open
Source projects.

The most common Travis use case is probably for running tests and code
linting, which are both fantastic reasons, but there are compelling reasons to
have Travis automatically do deploys. Running the deploy on different local
machines increases the chances of picking up something that wasn't committed
to git. If you do this on a CI server, the deploy should always be done from a
clean and consistent environment.

This is most of the [retrace .travis.yml][travisyml] config file, trimmed down
a little to keep it short, but it should be functional. The deploy block is
the most interesting section.

```yaml
language: python
python: '3.5'
env:
- TOXENV=py35
- TOXENV=flake8
- TOXENV=docs
install:
- pip install tox
script:
- tox
deploy:
  provider: pypi
  user: d0ugal-deploy
  distributions: sdist bdist_wheel
  password:
    secure: b4f6y1xw5B/RXXnOu6JIaNcgOBZ0/CkNaMeEXsoQSewYZNwobLPYA
  on:
    tags: true
    repo: d0ugal/retrace
    condition: "$TOXENV = py35"
```

First we specify the provider as PyPI, then the PyPI user is set[^2]. We
specify both source and wheel distributions. The password is encrypted and
added with `travis encrypt --add deploy.password` and then some conditions are
set. We only want to deploy tags, the source repository and for a specific
`TOXENV` (otherwise the deploy will be attempted for each env).

Travis will then use [twine] to upload to PyPI, which uses HTTPS, even on
older Python versions.

## Updating documentation

As a bonus, this is a nice extra touch with Travis. You can easily have your
documentation automatically built and published. In [retrace] the
documentation is a small [MkDocs] project. With the following in your Travis
config you can easily publish your documentation on every commit.

```yaml
after_success:
  - git config user.name "Dougal Matthews";
  - git config user.email "dougal@dougalmatthews.com";
  - git remote add gh-token "https://${GH_TOKEN}@github.com/d0ugal/retrace.git";
  - git fetch gh-token && git fetch gh-token gh-pages:gh-pages;
  - pip install -IU -r test-requirements.txt .;
  - mkdocs gh-deploy -v --clean --remote-name gh-token;
```

You may want to move this to only happen on a deploy, but for a small project
like [retrace] there is typically a release after any changes that would
require docs updates.

---

Overall, I am *very* happy about how this came out. I would like to roll out a
similar strategy to other projects that I maintain. The change isn't earth
shatteringly huge, but it certainly greases the wheels a bit and makes things
easier.

[^1]: And quite possibly every OpenStack project, but there are [quite a
few](http://git.openstack.org/cgit), so I don't plan on checking!
[^2]: I have a dedicated user for automated deploys because I am paranoid 
about including my encrypted password.


[MkDocs]: http://www.mkdocs.org/
[pbr]: http://docs.openstack.org/developer/pbr/
[PyPI]: https://pypi.python.org/pypi
[retrace]: http://d0ugal.github.io/retrace/
[setupcfg]: https://github.com/d0ugal/retrace/blob/master/setup.cfg
[setuppy]: https://github.com/d0ugal/retrace/blob/master/setup.py
[Travis]: https://travis-ci.org/
[travisyml]: https://github.com/mkdocs/mkdocs/blob/master/.travis.yml
[twine]: https://pypi.python.org/pypi/twine
