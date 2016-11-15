title: Web Crawler with Mistral
category: openstack
tags: python, openstack, workflow, mistral
date: 2016-11-13 14:35
author: Dougal Matthews

I recently wrote a short [Mistral introduction], so you might want to start
there if you don't know the project. I said I wanted to come up with some
general Mistral examples, this is the first one.

Mistral takes care of scheduling and parallelism for you. So it seemed like it
would be a natural fit for a web crawler. The goal is fairly simple, given an
initial website, find the links within it and then download that website and do
the same thing again. The crawler will just crawl aimlessly, but it would be
trivial to add in an extra task that does something more useful - we will come
to that at the end.

First, we need to design the workflow that we want to use.


