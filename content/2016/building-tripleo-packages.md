title: Installing Dev TripleO Packages
category: openstack
tags: python, utils, tripleo, openstack
date: 2016-10-19 11:59:18
author: Dougal Matthews

I only recently learned that [tripleo.sh] could help me easily build rpm's
for projects used in TripleO. I wish I had known this sooner, as my previous
approach to the problem was very hacky.

Basically, there are two flags you need to know. The first only needs to be
ran once, to set things up.

```bash
~/tripleo-ci/scripts/tripleo.sh --delorean-setup
```

I have cloned the tripleo-ci repo to `~/tripleo-ci`. Just update your path if
you have it in a different location.

After this completes, you can use the following command to build a project.

```bash
~/tripleo-ci/scripts/tripleo.sh --delorean-build openstack/tripleo-common
```

By default, this will clone the git repo for the project and store it in
`~/tripleo/tripleo-common`. After that it will build the package and the rpm
can be found nested under `~/tripleo/delorean/data/repos` - find and 
[grep](http://manpage.io/p/grep/) locates it easily enough (but there may be an
easier way?). After that a simple yum install and you are sorted.

You can then checkout a review from gerrit, or update the git repo in
`,~/tripleo/` and tripleo.sh will install that version, making it easy to
build and install projects. If you manually clone the repo and store it there
it wont do the initial checkout.

However, to make things even easier I put a script together. I can now do
this to install a specific gerrit review for a project.

```bash
~/tripleo-util/install-project.sh tripleo-common 385323;
```

This will checkout the review, build and run the yum install, all in one go.
If you don't include a review number, it will do the same but install the
master version, or whatever you have manually checked out.

The only catch is that some projects require you do extra steps, like
restarting mistral and loading Workflows when you install tripleo-common. I
am working on automating that stuff too. I have some scripts, but I want to
bring it all together eventually.

You can see the full source for this script below:

<script src="http://gist-it.appspot.com/http://github.com/d0ugal/tripleo-util/blob/master/install-project.sh"></script>


[tripleo.sh]: http://docs.openstack.org/developer/tripleo-docs/advanced_deployment/tripleo.sh.html
