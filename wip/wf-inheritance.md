..
 This work is licensed under a Creative Commons Attribution 3.0 Unported
 License.

 http://creativecommons.org/licenses/by/3.0/legalcode

====================
Workflow Inheritance
====================

Include the URL of your launchpad blueprint:

https://blueprints.launchpad.net/mistral/+spec/example

Introduction paragraph -- why are we doing anything? A single paragraph of
prose that operators can understand. The title and this first paragraph
should be used as the subject line and body of the commit message respectively.

Some notes about the mistral-spec and blueprint process:

* Not all blueprints need a spec. If a new feature is straightforward enough
  that it doesn't need any design discussion, then no spec is required. It
  should be decided on IRC meeting with the whole core team.

* The aim of this document is first to define the problem we need to solve,
  and second agree the overall approach to solve that problem.

* This is not intended to be extensive documentation for a new feature.
  For example, there is no need to specify the exact configuration changes,

  nor the exact details of any DB model changes. But you should still define
  that such changes are required, and be clear on how that will affect
  upgrades.

* You should aim to get your spec approved before writing your code.
  While you are free to write prototypes and code before getting your spec
  approved, its possible that the outcome of the spec review process leads
  you towards a fundamentally different solution than you first envisaged.

* But, API changes are held to a much higher level of scrutiny.
  As soon as an API change merges, we must assume it could be in production
  somewhere, and as such, we then need to support that API change forever.
  To avoid getting that wrong, we do want lots of details about API changes
  upfront.

Some notes about using this template:

* Your spec should be in ReSTructured text, like this template.

* Please wrap text at 79 columns.

* The filename in the git repository should match the launchpad URL, for
  example a URL of: https://blueprints.launchpad.net/mistral/+spec/awesome-thing
  should be named awesome-thing.rst.

* Please do not delete any of the sections in this template. If you have
  nothing to say for a whole section, just write: None.

* For help with syntax, see http://sphinx-doc.org/rest.html


Problem description
===================

A detailed description of the problem. What problem is this blueprint
addressing?

Use Cases
---------

What use cases does this address? What impact on actors does this change have?
Ensure you are clear about the actors in each use case: Developer, End User,
Deployer etc.


Proposed change
===============

Here is where you cover the change you propose to make in detail. How do you
propose to solve this problem?

If this is one part of a larger effort make it clear where this piece ends. In
other words, what's the scope of this effort?

Alternatives
------------

What other ways could we do this thing? Why aren't we using those? This doesn't
have to be a full literature review, but it should demonstrate that thought has
been put into why the proposed solution is an appropriate one.

Data model impact
-----------------

Changes which require modifications to the data model often have a wider impact
on the system.  The community often has strong opinions on how the data model
should be evolved, from both a functional and performance perspective. It is
therefore important to capture and gain agreement as early as possible on any
proposed changes to the data model.

Questions which need to be addressed by this section include:

* What new database schema changes is this going to require?

* What database migrations will accompany this change.

* How will the initial set of new data objects be generated, for example if you
  need to take into account existing workflow/execution, or modify other
  existing data, please describe how that will work.

REST API impact
---------------

Each API method which is either added or changed should have the following:

* Specification for the method.

  * A description of the added or changed method.

  * Method type (POST/PUT/GET/DELETE).

  * Normal http response code(s).

  * Expected error http response code(s).

  * URL for the resource.

  * Parameters which can be passed via the url.

* Example use case including typical API samples for both data supplied
  by the caller and the response.

End user impact
---------------

Aside from the API, are there other ways a user will interact with this
feature?

* Does this change have an impact on python-mistralclient? What does the user
  interface there look like?

Performance Impact
------------------

Describe any potential performance impact on the system, for example
how often will new code be called, and is there a major change to the calling
pattern of existing code.

Examples of things to consider here include:

* A small change in a utility function or a commonly used decorator can have a
  large impacts on performance.

* Calls which result in a database queries can have a profound impact on
  performance when called in critical sections of the code.

* Will the change include any locking, and if so what considerations are there
  on holding the lock?

Deployer impact
---------------

Discuss things that will affect how you deploy and configure OpenStack
that have not already been mentioned, such as:

* What config options are being added? Are the default values ones which will
  work well in real deployments?

* Is this a change that takes immediate effect after its merged, or is it
  something that has to be explicitly enabled?

* If this change is a new binary, how would it be deployed?

* Please state anything that those doing continuous deployment, or those
  upgrading from the previous release, need to be aware of. Also describe
  any plans to deprecate configuration values or features.


Implementation
==============

Assignee(s)
-----------

Who is leading the writing of the code? Or is this a blueprint where you're
throwing it out there to see who picks it up?

If more than one person is working on the implementation, please designate the
primary author and contact.

Primary assignee:
  <launchpad-id or None>

Other contributors:
  <launchpad-id or None>

Work Items
----------

Work items or tasks -- break the feature up into the things that need to be
done to implement it. Those parts might end up being done by different people,
but we're mostly trying to understand the timeline for implementation.


Dependencies
============

* Include specific references to specs and/or blueprints in mistral, or in
  other projects, that this one either depends on or is related to.

* Does this feature require any new library dependencies or code otherwise not
  included in Mistral? Or does it depend on a specific version of library?


Testing
=======

Please discuss the important scenarios needed to test here, as well as
specific edge cases we should be ensuring work correctly.

Please discuss how the change will be tested, e.g. how Mistral is deployed?
Does this change need some specific config options? Does this change need
some 3rd party services pre-installed?


References
==========

Please add any useful references here. You are not required to have any
reference. Moreover, this specification should still make sense when your
references are unavailable. Examples of what you could include are:

* Links to mailing list or IRC discussions

* Links to notes from a summit session

* Links to relevant research, if appropriate

* Anything else you feel it is worthwhile to refer to
