The Development of OpenStack
############################

:date: 2014-04-11 19:23
:author: Dougal Matthews
:category: openstack
:tags: python, openstack,
:short_summary: A brief introduction to OpenStack and the development process used in Openstack.
:status: draft

In November last year, I started working in a `new position`_ and it required
me to get up to speed with OpenStack quickly. This post will cover some of what
I learned in that period and hopefully help others get a grasp on `OpenStack`_.

.. _new position: http://dougalmatthews.com/2013/Nov/18/joining-red-hat/
.. _OpenStack: http://www.openstack.org/

.. contents::


What is OpenStack?
------------------

OpenStack is an open source, Python based infrastructure as a service (`IaaS`_)
platform. In other words, OpenStack is an implementation of a cloud. This
means, OpenStack can be used to manage virtual machines, distributed storage
and virtual networks and a large number of other services. The most commonly
known public clouds are `Amazon Web Services`_ and `Microsoft Azure`_.

To think of things even more simply, you can typically think of a cloud as a
service where you can request a resource, use it and destroy it when you are
done without ever having to touch physical hardware. So, for example, I may
request 4 machines, all connected on the same network that I can use to
deploy my application. Then as my needs change I can either add or remove more.

OpenStack has a huge number of users, some of the better known names are;

- Canonical
- CERN (Large Hadron Collider)
- NSA
- PayPal
- Rackspace
- Red Hat
- Yahoo

.. _Amazon Web Services: http://aws.amazon.com
.. _Microsoft Azure: http://azure.microsoft.com
.. _IaaS: http://en.wikipedia.org/wiki/Infrastructure_as_a_service#Infrastructure_as_a_service_.28IaaS.29


The OpenStack components
------------------------

A large number of services are involved in running OpenStack, however,
typically users tend to hear about a small subset which are either most core
to the functionality of public facing. The cloud.

Compute Service
  Also known as Nova, compute creates and manages large pools of virtual
  machines.

Object Storage Service
  Also known as Swift, object storage provides a distributed, flexible,
  storage for objects/blobs of data.

Block Storage Service
  Also known as Cinder, block storage creates and manages disk volumes that
  can be attached to your virtual machines.

Networking Service
  Also known as Neutron, networking provides a flexible software defined
  network.

Dashboard
  Also known as Horizon, this is the web interface that allows you to easily
  manage your cloud. All of the services in OpenStack can be managed through
  Horizon.

All of the above services are the key components, but there are a number of
common or shared services that are required for these to work.

Identity Service
  Also known as Keystone, provides token based authentication between services
  and service discovery.

Image Service
  Also known as Glance, provides services for discovering, registering and
  retrieving virtual machine images.


This list isn't even complete, there are at least eight other services and this
is a growing number.

.. image:: /static/images/openstack-development/openstack-software-diagram.png
   :alt: alternate text

This is the image that is used to show what OpenStack looks like. However, it
is a marketing image and in reality a blatant lie. It shows how some of the
main components link together but massively simplifies the full architecture
to a level that makes it seem simple. The following image gives a much more
accurate of what a typical OpenStack deployment will look like.

.. image:: /static/images/openstack-development/openstack-arch-havana-logical-v1.jpg
   :alt: alternate text

This image is now around six months old, as its for the Havana release and it
doesn't include every service - only a possible deployment. In reality, this
is one of the simpler OpenStack deployment options.


The Development Process
-----------------------

Since OpenStack was originally released in 2010 it has grown at an astonishing
rate. The scale is huge. To put this isn't perspective, lets look at a few
statistics.

- Over 1.3 [#]_ million lines of code.
- Over 1,200 active [#]_ engineers in over 100 companies.
- Over 100 core git repositories. `Over 250`_ including everything.
- Over 5,000 commits each month.
- Over 600 - 1,000 new patches to review each week day.
- Over 1,000 emails every month on openstack-dev.

Now that we have established OpenStack is big, how is the project managed?

- A new version is released every six months.
- Design summits happen somewhere in the world after each release. Over 5,000
  attendees are currently expected at the summits.
- Each project within OpenStack has a Project Technical Lead - they are voted
  in for each release.
- Blueprints are created for features and in depth discussions are held on the
  OpenStack-dev mailing list.
- Each project has a set of "core reviewers" which you can earn by reviewing
  changes.
- Each change must be reviewed by at least two core reviewers and this means
  typically most reviewed get at least four or five eyes on the code. Only
  Jenkins has permission to merge changes into the master branch, this happens
  automatically when at least two core reviewers sign it off.

With this much development happening, there is lots of potentially broken code.
OpenStack relies on a huge continuous integration platform which runs against
every patch every time its updated. As much is possible is automatically
checked; python style, documentation builds, unittests and integration tests.
To manage this, the test runs are carried out in the cloud (of course) using
Rackspace Cloud and HP Public Cloud and running on over `60 concurrent`_
machines. The infrastructure for this is open, and if you so wish, you could
`run your own version`_ or borrow bits for your own projects.

.. _Over 250: http://git.openstack.org
.. _60 concurrent: https://www.youtube.com/watch?v=eB5ZmU6KKoY
.. _run your own version: http://ci.openstack.org/running-your-own.html


Creating a development environment?
-----------------------------------

Getting started is actually a fairly easy process, thanks to a project called
DevStack which creates a local OpenStack install with all the git repository
sources in place for easy editing. The only prerequisite is that you have git
installed and you are running on a Linux box. Unless you like problems, use
Fedora 20 or Ubuntu 12.04 and if you like your machine, **run this in a VM**
with at least 2 gig of ram.

.. code-block:: bash

    git clone https://github.com/openstack-dev/devstack.git
    cd devstack && ./stack.sh

This will take a while depending on your machine and internet connection, but
after the first time its much much faster. After its finished, if everything
looks good, head to the IP address of your virtual machine and you should be
presented with the Horizon login.

This is a fairly 'standard' OpenStack install, it contains the core and most
common components. Devstack is `configurable`_, you can enable and disable any
that interest you.

Once you are setup, you need to pick a project and typically they have decent
contribution guides. They will typically provide you with links to bugs,
reviews and show you how to run the tests. Lots of the projects

.. _configurable: http://devstack.org/stackrc.html


Why OpenStack?
--------------

- It's OpenSource!
- You will interact with some of the best engineers around and learn lots.
- Lots of really interesting and challenging problems.
- It is a *very* hirable skill at the moment, lots of companies are crying
  out for people that know Python and OpenStack. Red Hat is one such company,
  if you are interested. Get `in touch`_ and I can tell you more.

.. _in touch: dougal@dougalmatthews.com

.. [#] This number varies depending what you read, but this seems to be the
       most commonly cited.
.. [#] Active in this case means at least one code contribution in the last
       6 months.
