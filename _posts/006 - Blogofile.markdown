---
categories: meta
tags:
date: 2011/02/24 19:25:00
title: Blogofile - rethinking simple websites
slug: blogofile-rethinking-simple-websites
author: Dougal
---

This website has gone through a number of different solutions over the years -
during [SiteSprint](http://sitesprint.info/) (II) I created a new site 
based on Mingus. Minugs offers a great feature set and is really well made,
making use of many reusing apps that already exist. However, I was tired. 
Tired of blogging of the whole blogging platform, I needed to go back to
basics.

Step up Blogofile. Firstly, what is it? Essentially it is a static site 
generator. You get to use Python, a templating language and a fairly simple 
but standard MVC archetecture. However, the net result isn't a WSGI Python 
app, but rather a static media. A whole set of HTML and your other files 
like HTML and CSS too. 

As I use Disqus for all my comments the content of my blog rarely ever 
changes. Sure, I add a new post now and then or maybe update one but on a day 
to day basis, it rarely changes. Therefore rendering the page on each
request is really inneficient and caching each page is overkill. My CV for 
example is stored as markdown on my site and rendered to html, a pdf or a .doc 
as requested - now I only need to do this once.

For me, the main advantage comes from editing almost everything in vim. Now if 
I want to work on a post or do some maintenence I don't need to go through 
the Django admin and work in there. I can simply edit in vim and push back 
to the git repository. Which also means everything is version controlled and 
maintained in a sain way which fits into my workflow. 

Hosting isn't really an issue for me with Django as with tools like fabric,
chef or Gunicorn it doesn't need to be painful anymore. However, there is 
something to be said for the simplicity of deploying a complely static site.
I don't need to worry about anymore anything and worries about backing up 
are gone. Traffic surges for busy blogs wouldn't be an issue either.

I do have a few gripes with Blogfile though, they are fairly minor but nothin'
is perfect. I'm not a fan of Mako, I'd much rather edit Jinja2 templates for
the site and I'm pondering adding this functionality in. The nice thing is 
that it should be fairly trivial to add. When working on your site there is a 
handy server for testing locally however, you need to rebuild manually to see 
the changes. This is a little bugging and I usually have two tabs open, one
doing the rebuild every 10 seconds and one serving.

