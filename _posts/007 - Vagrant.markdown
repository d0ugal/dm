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

    :::bash
    sudo gem update --system
    gem install vagrant
    cd /path/to/project
    vagrant init

You may not need the first step there, but I did on my mac. There is a 
detailed setup guide 
[here](http://vagrantup.com/docs/getting-started/index.html). So if you have
any problems, head there first.

In your current directory you should now have a file named `Vagrantfile`. This
is a simple Ruby based configuration file. The Vagrantfile is 
[well documented](http://vagrantup.com/docs/vagrantfile.html) so we'll skip
past that bit. Instead, copy the following into your vagrant file.

    :::ruby
    Vagrant::Config.run do |config|

      config.vm.box = "lucid32"
      config.vm.box_url = "http://files.vagrantup.com/lucid32.box"

      config.vm.forward_port("web", 8000, 60000)
      config.vm.network("33.33.00.10")

      config.vm.provision :chef_solo do |chef|

        chef.recipe_url = "http://cloud.github.com/downloads/d0ugal/chef_recipes/cookbooks.tar.gz"
        chef.cookbooks_path = [:vm, "cookbooks"]

        chef.add_recipe "main"
        chef.add_recipe "python"
        chef.add_recipe "postgres"

        chef.json.merge!({

          :project_name => "project_name",

          :system_packages => [],
          :python_global_packages => [],
          :python_packages => [],

        })

      end

    end

After copying in, look for project_name and change that to something on your
liking or you can just leave it for now.

 > If you have already been using vagrant, you will likely have the lucid box
 > already. The vagrant quick start tips download it and call it 'base' since
 > this is a common name I have changed it to something more explicit and
 > save. However, to avoid re-downloading you may want to change lucid32 to
 > base in your config file.

What does this do? It setups up a new Ubuntu Lucid machine and runs some 
chef recipies against it that I created. The base machine that its built on 
is downloaded from the url in the config and the chef cookbooks from the
other url that points to my github repository.

The Chef cookbook then installs some system wide pacahes, creates a virtual
environment, installs postgres and creates a database. These are not deploy
ready scripts but rather more hack scripts to quickly bootstrap a development
env.

After saving, you can now do `vagrant up` this will take a while as it needs 
to download the ubuntu box to create the VM from. The time delay is mostly 
due to downloading of the box and also various pacakes like postgres so be 
warned if you have a slow or limited connection, this is likely to sum up to 
around 800mb or so.

After its finished, you should be able to do this.

    :::bash
    vagrant ssh
    workon project_name
    ls -la

You will then be running from the virtual machine, but be in an activated 
Python virtual enviroment and in a directory that is mapped to the host 
machine. Thus the result of that should show the files for the directory that 
you started in.

After this you can pretty much carry on as normal. There are a few things to
note that may effect you. Any tools that rely on accessing the Python
iterpreter will not work as its not on a remote machine, I don't have a need
for this so I've not worked out a solution. I simple use the python debugger
directly in the ssh session.

When using Django's runserver, you need to specify an IP address. I've created 
a alias to make this easier.

    :::bash
    djr
    # is the same as
    python manage.py runserver 0.0.0.0:8000

To access the site itself, you'll then need to go to the IP address specified
in the config file. In this case the full path will be 
`http://33.33.00.10:8000`.

I'm stil working out my complete workflow for vagrant but I'm using this
machine as a base point for much of my work and creating a new machine for 
each project. The awesome thing is that you have a recorded setup of how the
machine is configured. The main downside is that it seems like it will be
tiresome to make different virtual machines if they vary significantly.
However, I'm sure there is something I can work out for this too.

If you have any idea's or suggestions please let me know.
