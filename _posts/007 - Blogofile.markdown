---
categories: python, meta
tags: python, blogofile
date: 2011/02/22 19:25:00
title: Blogofile - rethinking simple websites
slug: blogofile-rethinking-simple-websites
author: Dougal
---

This website has gone through a number of different solutions over the years 
but during [SiteSprint](http://sitesprint.info/) (II) I settled on a new site 
built with [Mingus](https://github.com/montylounge/django-mingus). Mingus 
offers a great feature set and is really well made (it makes use of many 
reusable apps that already exist). However, I was tired. Tired of blogging 
platforms, I needed to go back to basics.

So, step up [Blogofile](http://www.blogofile.com/). Firstly, what is it? 
Essentially it is a static site generator. You get to use Python, a templating 
language and a fairly simple but standard MVC architecture. However, the net 
result isn't a WSGI Python app, but rather a static media. A whole set of 
HTML and your other files like HTML and CSS too. One clever trick it uses is
to take advantage of folder structure and index.html files to create nice 
URL's.

As I use [Disqus](http://disqus.com/) for all my comments the content of my 
blog rarely ever changes. I add or update a post now and then but on a day to 
day basis, it rarely changes. Rendering the page on each request is really 
inefficient and caching each page is overkill. My CV for example is stored as 
markdown on my site and rendered to html, a pdf or a doc as requested - now I 
only need to do this once. 

For me, the main advantage comes from editing almost everything in vim. Now if 
I want to work on a post or do some maintenance I don't need to go through 
the Django admin and work in there. I can simply edit in vim and push back 
to the git repository. Which also means everything is version controlled and 
maintained in a sane way which fits into my workflow. 

Hosting isn't really an issue for me with Django as with tools like 
[Fabric](http://docs.fabfile.org/), [Chef](https://github.com/opscode/chef) and 
[Gunicorn](http://gunicorn.org/) it doesn't need to be painful anymore. 
However, there is something to be said for the simplicity of deploying a 
completely static site. I don't need to worry about a wsgi server, a database 
or anything else and backing up isn't an issue. 

I do have a few gripes with Blogfile though, they are fairly minor but nothin'
is perfect. I'm not a fan of [Mako](http://www.makotemplates.org/), I'd much 
rather edit [Jinja2](http://jinja.pocoo.org/) templates. I'm pondering adding 
this functionality and the nice thing about blogofile is that it should be
fairly straightforward to do so. When working on your Blogofile site there is 
a handy server for testing locally but you need to rebuild manually to see the 
changes. This is a little annoying and I usually have two tabs open, one doing 
the rebuild every 10 seconds and one serving.

Incidentally, you can see the code for my Blogofile Blog on 
[github](https://github.com/d0ugal/dm).
