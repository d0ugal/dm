title: Create an Excellent Python Dev Env
category: python
tags: pyenv, virtualenv, pipsi
date: 2016-11-12 15:45
author: Dougal Matthews

There are a huge number of Python dev tools around, a number of them are
essential for my day to day development. However, they tend to suffer from a
lack of discoverability and it takes a while to find what works for you.

I'm going to quickly share what I use, some of these are well known, some are
probably not. I'd expect most people to pick and choose from this post as you
are unlikely to want everything I use, but there should be something useful for
most people.

These are my primary goals:

- Be able to install any Python version easily.
- Don't ever touch the system Python.
- An easy way to setup virtualenvs for specific projects.
- Install and isolate a number of Python tools.

How do we get there?

## pyenv

pyenv pitches itself as "simple python version management" and it does just
that. Once setup, you can easily install and switch between Python versions,
including specific point releases. `pyenv install --list` reveals it knows how
to install a *whopping* 271 different Python versions at the moment from cpython
2.1.3 up to 3.7-dev and pypy and stackless.

The [install process] is a bit manual, but there is an [install tool]
that makes it easier. After installing, I do something like this:

```bash
pyenv install -s 2.7.12;
pyenv install -s 3.5.2;
pyenv install -s 3.4.5;
pyenv install -s pypy-5.4.1;
pyenv global 2.7.12 3.5.2 3.4.5 pypy-5.4.1;
```

This installs the Python versions I typically need, and then sets them as the 
global default. The order is important, 2.7.12 becomes the default for python
as it is first and 3.5.2 becomes the default for python3.

If you just want to use a specific Python version in a directory, and it's 
subdirectories, you can run the command `pyenv local 3.5.2` and it will create
a `.python-version` file. Warning, if you do this in your home directory by
mistake it can be very confusing. 

One feature I'd love pyenv to have, is a way to tell it to install a Python 
version (like 2.7 or 3.5) and have it automatically install the latest point
release (and add a new command that removes and updates them when needed)

[install process]: https://github.com/yyuu/pyenv#installation
[install tool]: https://github.com/yyuu/pyenv-installer

## pyenv-virtualenv

For a long time I was a big user of virtualenvwrapper, however, my transition 
to pyenv and [fish] caused some issues. I stumbled on pyenv-virtualenv
(not to be mistaken with pyenv-virtualenvwrapper which also doesn't support 
fish) which covers all my needs. I wrote a few fish functions to make 
it a little easier to use. It isn't hard, but maybe just a little verbose.

For example, here is a handy way to make a temporary virtualenv, I found this 
feature of virtualenvwrapper (the mktmpenv command) particularly useful.

```fish
function venv-tmp
  set venv_tmp_name "tmp-"(random)
  pyenv virtualenv (expr substr (python --version 2>&1) 8 20) $venv_tmp_name
  venv-activate $venv_tmp_name
end

function venv-tmp-cleanup
  for val in (pyenv versions | grep "/envs/tmp-")
    venv-rm (basename $val)
  end
end
```

Generally it doesn't give me much over what virtualenvwrapper did (other than 
fish support) but I do like that it is managed by pyenv and integrates well.

[fish]: https://fishshell.com

## pipsi

pipsi is a more recent addition to my setup. It is a fairy simple tool which
allows you to install Python CLI tools in their own virtualenv and then the 
command is added to your path. The main advantage here is that they are all 
isolated and don't need to have compatible requirements. Uninstalling is also
much cleaner and easier - you just delete the virtualenv.

I install a bunch of Python projects this way, here are some of the most 
useful.

- [tox]: My defacto way of running tests. 
- [mkdocs]: A beautifully simple documentation tool (I might be [biased]).
- [git-review]: The `git review` command for gerrit integration.
- [flake8]: Python linting, mostly installs like this for vim.

[tox]: https://pypi.python.org/pypi/tox

[tox]: https://pypi.python.org/pypi/tox
[mkdocs]: http://www.mkdocs.org
[biased]: http://www.mkdocs.org/about/release-notes/#maintenance-team
[git-review]: https://pypi.python.org/pypi/git-review
[flake8]: https://pypi.python.org/pypi/flake8
[mkdocs]: http://www.mkdocs.org
[biased]: http://www.mkdocs.org/about/release-notes/#maintenance-team
[git-review]: https://pypi.python.org/pypi/git-review
[flake8]: https://pypi.python.org/pypi/flake8

# Putting it all together

So, overall I don't actually use that many projects, but I have very happy with 
how it works. I have the setup automated, and it looks like this.

```
# pyenv
if [ ! -d ~.pyenv ]; then
    curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
    git clone https://github.com/yyuu/pyenv-virtualenv.git ~/.pyenv/plugins/pyenv-virtualenv
else
    pyenv update
fi;

pyenv install -s 2.7.12;
pyenv install -s 3.5.2;
pyenv install -s 3.4.5;
pyenv install -s pypy-5.4.1;
pyenv global 2.7.12 3.5.2 3.4.5 pypy-5.4.1;
~/.pyenv/shims/pip install -U pip pipsi
rm -rf ~/.local/venvs
~/.pyenv/shims/pipsi install tox
~/.pyenv/shims/pipsi install mkdocs
~/.pyenv/shims/pipsi install git-review
~/.pyenv/shims/pipsi install 1pass
~/.pyenv/shims/pipsi install flake8
~/.pyenv/shims/pipsi install yaql
~/.pyenv/shims/pipsi install livereload
```

The summary is, first install pyenv and setup the Python versions you need.
Then install pipsi into the default pyenv environment and use that to install
the other tools. The system Python should never be touched.

A couple of things are missing as you'll need to setup paths and so on, so 
please do look at the install guides for each.
