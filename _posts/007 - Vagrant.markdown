---
categories: vagrant
tags: vagrant, chef, python, django, ruby
date: 2011/02/26 19:25:00
title: My Vagrant Workflow
author: Dougal
---

[Vagrant](http://vagrantup.com/) is a command line tool for managing virtual 
machines aimed at virtualising your development environment. It is essentially 
a wrapper around Oracle's [VirtualBox](http://www.virtualbox.org/). However,
while a wrapper its an awesome one and makes the whole process super slick, 
quick and easy.

Getting started is really easy. There is a quick start on the Vagrant website
or you can try my version and grab a generic environment I've setup. You need
to think of Vagrant projects as a bit like a github repo, you have one per
directory so you can feel free to create one in your projets folder.

    :::
    sudo gem update --system
    gem install vagrant
    cd /path/to/project
    vagrant init

You may not need the first step there, but I did on my mac. There is a 
detailed setup guide 
[here](http://vagrantup.com/docs/getting-started/index.html). So if you have
any problems, head there first.

Now, have a look in your directory, you'll see that there is now a Vagrantfile
