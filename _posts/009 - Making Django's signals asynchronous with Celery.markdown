---
categories: django, python
tags: python, django, signals, celery
date: 2011/10/10 17:21:00
title: Making Django's signals asynchronous with Celery
author: Dougal
---

**Update:** A comment on the ticket I opened by Alex Gaynor brought up a point
that I hadn't fully considered. It's worth noticing before going further in
this post and also worth pointing out my monkey patch doesn't answer this
question.

> After speaking with Carl, I'm marking this as wontfix because it is
> non-obvious as to whether pickling a Signal should include the registered
> receivers, and how that interacts with the weak referencing, since there's no
> obvious semantic it seems better not to guess.

I really enjoy working with both Django's signal framework and Celery tasks.
Today it occured to me that it would be useful to combine the two and have
“asynchronous signals”.

Here is the solution that I came up with, read on below if you want to see how
I arrived at this and why we need to monkey patch.

    :::python
    from celery.task import task
    from django.db.models.signals import post_save

    from myproject.models import MyModel

    # Warning. Monkey patch.
    from django.dispatch.dispatcher import Signal
    def reducer(self):
        return (Signal, (self.providing_args,))
    Signal.__reduce__ = reducer

    # With the patch done, we can now connect to celery tasks.
    @task(ignore_result=True)
    def async_post_save(sender, instance, **kwargs):
        # do something with the instance.
        pass
    post_save.connect(async_post_save.delay, sender=MyModel)


The first solution that occured to me was to use an intermediate function that
triggered the task. This works fine and doesn't require anything clever.

    :::python
    from celery.task import task
    from django.db.models.signals import post_save

    from myproject.models import MyModel

    @task
    def async_post_save(instance):
        # do something with the instance.
        pass

    def post_save_reciever(sender, instance, **kwargs):
        async_post_save.delay()
    post_save.connect(post_save_reciever)


However, this adds an extra level of redirection to code that shouldn't be
needed. Why can't be connect to tasks directly?

    :::python

    @task(ignore_result=True)
    def async_post_save(sender, instance, **kwargs):
        # do something with the instance.
        pass
    post_save.connect(async_post_save.delay, sender=MyModel)

This almost works, however, in the kwargs signal recievers are passed an
instance of django.display.dispatcher.Signal and this contains an instance
of threading.Lock - an object that can't be pickled. This leads me to the
monkey patch that was shown at the start of this article which simply adds
a __reduce__ method to the Signal class that alters the pickle behaviour and
only pickles the provided_args property of the Signal instance.

Incidently, you'll notice that I added ignore_result=True to each of the tasks.
While this isn't required, its not generally standard practice for signals
recievers to return anything, so you will probably want to do this too.

[View the ticket I opened a ticket to track this idea This link](https://code.djangoproject.com/ticket/17029)
