title: Python 3 and pytest Intro in Glasgow
category: python
tags: python, pytest, glasgow
date: 2016-12-12 19:34:24
author: Dougal Matthews

I recently introduced a number of people to Python and pytest at the first 
[Glasgow Pair Programming][gpp] Meetup. I think it was a success as I slowly
took them through some simple programming problems to demonstrate the tooling
available in Python.

This post is just a reference for everything I mentioned (and I remember
mentioning!). So anyone that came along, or anyone looking for a similar list
of references can find these Python tools.

I used ...

- [Python 3.5], default to Python 3 and only used Python 2 if you must.
  Python 3.6 is out soon, anything from 3.4 upwards is good.
- [pip] to install packages from the Python Package Index ([PyPI])
- [pyenv] to install different Python versions. You may not need this if you
  have a good enough Python version on your system by default
- [virtualenv] to install Python packages for a specific project
- [pytest], the best way to write tests in Python. [unittest] works pretty well
  too and has wider adoption.
- The Python [collections] module is great, it has some really nice things in
  it. I didn't use [itertools] or [functools] but they are also neat.

Outside of Python, I also used [tmux] to manage my sessions. [fish] as my
shell. [i3wm] as my window manager in Fedora.

[gpp]: https://www.meetup.com/GlasgowPairProg/
[Python 3.5]: https://www.python.org/downloads/
[pip]: https://pip.pypa.io
[PyPI]: https://pypi.python.org/pypi
[virtualenv]: http://docs.python-guide.org/en/latest/dev/virtualenvs/
[pytest]: http://doc.pytest.org/
[unittest]: https://docs.python.org/3.6/library/unittest.html
[collections]: https://docs.python.org/3.6/library/collections.html
[itertools]: https://docs.python.org/3.6/library/itertools.html
[functools]: https://docs.python.org/3.6/library/functools.html
[tmux]: https://tmux.github.io/
[fish]: https://fishshell.com/
[i3wm]: https://i3wm.org/

