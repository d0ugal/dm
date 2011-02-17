---
categories: vagrant
tags: vagrant, chef, python, django, ruby, osx
date: 2011/02/26 19:25:00
title: My Vagrant Workflow
summary: How Vagrant and other related tools have effected my workflow.
author: Dougal
---

Vagrant enables you to quickly and easily provision virtual machines to create
virtual development environments. The effect is similar to Python's 
virtualenvs but for the full virtual machine.

Machines can be built in minutes and the provisioning can be done with a 
number of popular tools including Chef and Puppet. This then means your 
deployment tools and scripts can be developed as part of your development 
workflow and wont be later established as an after thought.

Previously I would battle with OSX and try to install my dependancies with
Homebrew, Fink and MacPorts falling back to an Ubuntu virtual machine in
VMware. Now I head straight to the Ubuntu VM which is closer to my usual
deployment platform and usually “Just Works” 
