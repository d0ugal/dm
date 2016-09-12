title: Retrace - Configurable, elegant retrying
category: python
tags: python, retry, exception
date: 2016-09-12 21:35
author: Dougal Matthews

After I mentioned [Retrace] here [recently][pbr-post] a few people have asked me about it, so I thought I'd write up a quick post.

Retrace is, essentially, a retry decorator. There are many projects like this but after trying a few I either ran into issues or found the API cumbersome. I wanted something with a really simple interface but with the ability to easily build on it.


## Simplicity

By default, it will retry the function on any exception which subclasses Exception. Any exceptions that directly inherit from BaseException (like KeyboardInterrupt) wont be caught by default, as you generally don't want that.

```python
import retrace

@retrace.retry
def unstable():
    # ...
```

Of course, you can change what you catch by passing ``on_exception`` which can be any valid exception class.

```python
import retrace

@retrace.retry(on_exeption=IOError)
def unstable():
    # ...
```

## Portability

Retrace is tested and supported on Python 2.7, 3.3, 3.4 and 3.5. It is also [designed to be **easily vendorable**][vendorable], I understand that you might not want, or be able to include a dependency for such a small utility. so you can easily just grab the `retrace.py` file and include it in your project.


## Customisation

Retrace supports limiters, intervals and validators. These are all fairly similar concepts, but play a different role. We will quickly take a look at each of these.

### Limiters

A limiter defines how many times the function should be retried. This can be passed in as either a int or a callable.

For example, retry a maximum of 10 times.

```python
@retrace.retry(limit=10)
def unstable():
    # ...
```

If a callable is passed in, the number of retries can be limited easily with any custom logic.


```python
import random
import retrace

def random_limit(attempt):
    if attempt > random.randint(0, 10):
        raise retrace.LimitReached()

@retrace.retry(limit=random_limit)
def unstable():
    # ...
```

### Intervals

Intervals define the delay that is introduced between attempts. This can either be passed in as an int (which will then be the number of seconds) or as a callable.

Delay for 1 second between attempts.

```python
@retrace.retry(interval=1)
def unstable():
    # ...
```

Delay for `n` seconds, where `n` is the current number of attempts. This then gradually increases the delay by one second each try.

This works because `time.sleep` is a callable and we pass in the current attempt number each time.

```python
import time

@retrace.retry(interval=time.sleep)
def unstable():
    # ...
```

### Validators

Validators are used to verify that the result from the function passes a check.

If it isn't a callable, it can be any object that is then compared with the result. Check that the function returns the value `"EXPECTED"`.

```python
@retrace.retry(validator="EXPECTED")
def unstable():
    # ...
```

If it is a callable, it will be passed the result and it should return `True` it has passed and `False` if it has failed and the function should be called again.


```python
def validate_string(value):
    return isinstance(value, str)

@retrace.retry(validator=validate_string)
def unstable():
    # ...
```

---

It's a small project, but I find it useful fairly frequently. If this is something that interests you I would really like your feedback. How could it be made better? What do you need that I have not through of? [Please send me your ideas!][gh-issues]

[Retrace]: https://github.com/d0ugal/retrace
[pbr-post]: /2016/Sep/01/automate-publishing-to-pypi-with-pbr-and-travis/
[vendorable]: http://d0ugal.github.io/retrace/#vendoring
[gh-issues]: https://github.com/d0ugal/retrace/issues/new
