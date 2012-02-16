Vagrant
#######

:category: vagrant, python
:tags: vagrant, chef, python, django, ruby
:date: 2011-02-27 19:25
:title: My Vagrant Workflow
:author: Dougal Matthews

`Vagrant`_ is a command line tool for managing virtual machines aimed at
virtualising your development environment. It is essentially a wrapper around
Oracle's `VirtualBox`_ but a very good one.

.. _Vagrant: http://vagrantup.com
.. _VirtualBox: http://www.virtualbox.org

Getting started is really easy, there is a good quick start on the Vagrant
website, or you can try my version to get a development environment I've been
using - which is a basic box with some Python tools and postgres. Vagrant
projects are initialised for a directory and simply contains a file called
Vagrantfile (and an automatically generated .vagrant file). Generally speaking
I would then do this once in each project root allowing the vagrant file to
be version controlled and configured for an individual project. Then each
developer can create a virtual machine from the same config and this keeps
everybody on the same page.

.. code-block:: text

    sudo gem update --system
    gem install vagrant
    cd /path/to/project
    vagrant init

You may not need the first step there, but I did on my mac. There is a
detailed setup guide for different platforms `here`_. So if you have
any problems make sure you read that first.

.. _here: http://vagrantup.com/docs/getting-started/index.html

In your current directory you should now have a file named `Vagrantfile`. This
is a simple Ruby based configuration file. The Vagrantfile is
`well documented`_ so we'll skip past that bit. Instead, copy the following
into your vagrant file.

.. _well documented: http://vagrantup.com/docs/vagrantfile.html

.. code-block:: ruby

    Vagrant::Config.run do |config|

      config.vm.box = "lucid32"
      config.vm.box_url = "http://files.vagrantup.com/lucid32.box"

      config.vm.forward_port("web", 8000, 8000)
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

    If you have already been using vagrant, you will likely have the lucid box
    already. The vagrant quick start tips download it and call it 'base' since
    this is a common name I have changed it to something more explicit and
    safe. However, to avoid re-downloading you may want to change lucid32 to
    base in your config file.

What does this do? It setups up a new Ubuntu Lucid machine and runs some
chef recipies against that are downloading from my chef github repository.
The base machine that its built on is downloaded from the url in the config
this is provided by the Vagrant team (I've not had a chance to make my own
boxes yet).

The Chef cookbook then installs some system wide packages, creates a virtual
environment, installs postgres and creates a database. These are not deploy
ready scripts but rather more hacky scripts to quickly bootstrap a development
env.

After saving, you can now do `vagrant up` this will take a while as it needs
to download the ubuntu box to create the VM from. The time delay is mostly
due to downloading of the box and also various packages like postgres so be
warned if you have a slow or limited connection, this is likely to sum up to
around 800mb or so.

After its finished, you should be able to do this.

.. code-block:: text

    vagrant ssh
    workon project_name
    ls -la

You will then be running from the virtual machine, but be in an activated
Python virtual environment and in a directory that is mapped to the host
machine. Thus the result of that should show the files for the directory that
you started in. In my case I generally then need to do
`pip install -r requirements.txt` and after that I can run the project - be it
a Django website, or something different.

After this you can pretty much carry on as normal. There are a few things to
note that may effect you. Any tools that rely on accessing the Python
interpreter will not work as its not on a remote machine, I don't have a need
for this so I've not worked out a solution. I simply use the python debugger
directly in the ssh session. Editors like pyDev will likely loose some
functionality here but there may be a work around...

When using Django's runserver, you need to specify an IP address. I've created
a alias to make this easier. This assumes you are still connected to the
virtual machine but if not, cd into the project directory and run
`vagrant ssh`. How awesome is it to not need to remember IP's or logins?

.. code-block:: text

    djr
    # is the same as
    python manage.py runserver 0.0.0.0:8000

These shortcuts are best left for another post perhaps, but some more can be
seen in my `dotfiles repository`_.

.. _dotfiles repository: https://github.com/d0ugal/dotfiles

To access the site itself, you'll then need to go to the IP address specified
in the config file. In this case the full path will be
`http://33.33.00.10:8000` or since we have set the port forwarding in the
config above you should be able to go to localhost:8000.

I'm still working out my complete workflow for vagrant but I'm using this
machine as a base point for much of my work and creating a new machine for
each project. The best thing so far for me is a recorded development
environment that I can use to create a VM now or in 6 months when revisiting
an older project. My main problem at the moment is the effort required to
make big changes (new configs, new recipes etc.) but this should get easier
as I make more.

If you have any idea's or suggestions please let me know.
