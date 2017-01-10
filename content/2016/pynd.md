title: pynd - search Python code
category: python
tags: openstack, python, pynd
date: 2016-12-28 11:11:10
author: Dougal Matthews

For a while I have wanted a smarter grep[^1]. A
i[grep](http://manpage.io/p/grep/) that understands Python syntax and idioms. 

Over the last week or two I had a go at writing this and called it [pynd]
(**py**thon **fi**nd). As a very young project it is likely to change and
evolve but I would love some feedback. Is this something you think you would
use? What features would you like to see? [Please send me your feedback][ghi].

I have spent lots of time grepping [huge Python projects], pynd is starting to 
make that easier for me.

## What can it do?

pynd is best demonstrated with some simple examples from [the docs][pynd], ran
against [another project][retrace] of mine.

### Find and list all public functions

```python
$ pynd --def --public
./retrace.py
181:def retry(*dargs, **dkwargs):
105:    def delay(self, attempt_number):
117:    def delay(self, attempt_number):
128:    def attempt(self, attempt):
140:    def attempt(self, attempt_number):
150:    def validate(self, result):
159:    def validate(self, result):
171:    def delay(self, attempt_number):
174:    def attempt(self, attempt_number):
177:    def validate(self, result):
```

or, with the --private flag.

```python
$ pynd --private --def
./retrace.py
49:    def _update_wrapper(wrapper, wrapped,
67:    def _wraps(wrapped, assigned=functools.WRAPPER_ASSIGNMENTS,
233:    def _setup_limit(self, limit):
248:    def _setup_interval(self, interval):
263:    def _setup_validator(self, validator):
276:    def _nice_name(self, thing):
```

### Look for each time a class instance was created

```python
$ pynd --class Interval --call
./retrace.py
100:class Interval(_BaseAction):
251:            self._interval = Interval()
```

### Search only within docstrings

```python
$ pynd --doc "decorator" --ignore-case
./retrace.py
181:def retry(*dargs, **dkwargs):
The retry decorator. Can be passed all the arguments that are accepted by
Retry.__init__.
210:class Retry(object):
The Retry decorator class.

This class handles the retry process, calling wither limiters or interval
objects which control the retry flow.
```

### Everything else

Check out `pynd --help`

```text
$ pynd --help
usage: pynd [-h] [--version] [--ignore-dir [IGNORE_DIR [IGNORE_DIR ...]]]
            [--ignore-case] [--files-with-matches] [--show-stats]
            [--public | --private] [--verbose | --debug] [-d] [-c] [-f] [-i]
            [-C] [-a]
            [PATTERN] [FILES OR DIRECTORIES [FILES OR DIRECTORIES ...]]

Search for PATTERN in each Python file in filesystem from the current
directory down. If any files or directories are specified then only those are
checked.

positional arguments:
  PATTERN               The pattern to match against. This must be a valid
                        Python regular expression.
  FILES OR DIRECTORIES  A file or directory to limit the search scope. This
                        can be provided multiple times.

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit
  --ignore-dir [IGNORE_DIR [IGNORE_DIR ...]]
                        A pattern to exclude directories. This must be a valid
                        Python regular expression. It can be provided multiple
                        times.
  --ignore-case         Make all the regular expression matching case
                        insesitive.
  --files-with-matches  Don't output all the results, just the paths to files
                        that contain a result.
  --show-stats          At the end, show some stats.
  --public              Only show results considered to be public in Python.
                        They don't start with an underscore.
  --private             Only show results considered to be private in Python.
                        They start with an underscore.
  --verbose             Explain what is happening.
  --debug               Output excessively to make debugging easier
  -d, --doc             Match class and function docstrings.
  -c, --class           Match class names.
  -f, --def             Match function names.
  -i, --import          Match imported package names.
  -C, --call            Match call statements.
  -a, --attr            Match attributes on objects
```

## What next?

That was just a super quick tour of some of the features. Now I just need
to settle in and use the project for a while and hopefully find a few others 
to do the same. Then we can see [what to do next][ghi].

## Get involved.

See the [contributing docs][contrib] and [the roadmap][roadmap] or just join 
in on [Github][ghi].

[^1]: I actually use [ack](http://beyondgrep.com/), but
      [grep](http://manpage.io/p/grep/) is a better catch-all term.

[retrace]: http://d0ugal.github.io/retrace/
[pynd]: https://d0ugal.github.io/pynd/
[contrib]: https://d0ugal.github.io/pynd/contributing/
[roadmap]: https://d0ugal.github.io/pynd/roadmap/
[ghi]: https://github.com/d0ugal/pynd/issues/new
[huge Python projects]: http://git.openstack.org/cgit
