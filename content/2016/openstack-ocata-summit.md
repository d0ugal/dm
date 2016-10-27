title: OpenStack Ocata Summit
category: openstack
tags: summit, mistral, tripleo
date: 2016-11-03 20:24:10 
author: Dougal Matthews

I spent last week at the Ocata design summit in Barcelona and wanted to take
the opportunity to write up some notes from the week while it is still fresh.

Overall, it was an extremely interesting and well run event. Thanks to all 
involved in making it happen.


### Tuesday

Today was about getting settled in and meeting up with folks. There is some
design work going on, but most of the topics relevant to me didn't really kick
off until Wednesday. I tried sitting in a few sessions, but didn't take much 
in as I was sleep deprived.

I did enjoy the "[What the Heck is OoO][wth-ooo]" session; it was a neat
introduction to TripleO, a project that can be bewildering to new developers
and users. It covered the essential terminology and explained the project
goals. When you are so involved in a project it is good to take a step back and
look at the bigger picture sometimes. I think we need to do a better job of
making TripleO more approachable - is there a way we can reduce the jargon
required to have a basic understanding?

I finished the  day off by popping along to the RDO party briefly. There was a 
great turnout and a bunch of familiar faces.

[wth-ooo]: https://www.openstack.org/summit/barcelona-2016/summit-schedule/events/15994/what-the-heck-is-ooo-owls-all-the-way-down


### Wednesday

I started today with a quick 5km run along the Barcelona beach front, it makes
for a pretty nice running spot - it is very flat! Unfortunately the weather
isn't great, but it did stay dry for my run.

I watched some of the keynotes today, the [demos by the TripleO infra
team][ci-demo] of our CI setup was particularly nice to see. It is great to see
this amazing work get some of the spotlight. I had a number of interesting
conversations about Mistral and TripleO and squeezed in a few test runs of my
talk.

In the afternoon I attended a few design sessions and gave my talk in the last
slot. "[TripleO: Containers - Current Status and Roadmap][tripleo-containers]"
was the first session I attended. It was really interesting and there was a ton
of interest based on how full the room was. There are a huge number of
interesting problems to work through, but ideas and the spec seem to be taking
things in the right direction.  

Next I went to the TripleO work session on "[Growing the team][tripleo-grow]",
again we had another full room and that perhaps highlighted why we need to
discuss this and the growing pains we are having with so many active
developers. We discussed an [active proposal][squad-review] to split the team 
into squads and allow focus and development to happen in more focused, smaller
groups. This seemed like a popular idea. We also discussed a way of better
identifying subject matter experts, the consensus didn't seem as clear but it
sounds like we might try using gerrit groups to better identify these people.
We also discussed a way of better identifying subject matter experts, the
consensus didn't seem as clear but it sounds like we might try using gerrit
groups to better identify these people. 

Finally I finished the day by giving my talk "[Effective Code Review][ecr]". It
went fairly well, but I think I rushed it a bit and probably skipped something
becuase I finished earlier than expected. The feedback and questions I had were
interesting, so overall I think it went down well.

[ci-demo]: https://www.openstack.org/summit/barcelona-2016/summit-schedule/events/17361/demoing-the-worlds-largest-multi-cloud-ci-application
[tripleo-containers]: https://etherpad.openstack.org/p/ocata-tripleo-containers
[tripleo-grow]: https://etherpad.openstack.org/p/ocata-tripleo-team-growing
[squad-review]: https://review.openstack.org/#/c/385201/
[ecr]: https://www.openstack.org/summit/barcelona-2016/summit-schedule/events/15113/effective-code-review

### Thursday

Today started sharp with the session "[Building Self-healing Applications][bsha]",
which contained an interesting exploration of using self-healing applications
with Aodh, Zaqar and Mistral. The end result was a nice demo and suggested
architecture which, in short, uses Aodh (the Telemitry alarm service) to
trigger Mistral workflows via Zaqar. This opens up oportunities for automating
a number of tasks based on what is happening in your cloud in real time, rather
than having alarms trigger manual administration tasks it can trigger
automated workflows that will complete the steps automatically.

I then attended the "[OpenStackClient: Roadmap and Priorities][osc]" design
session. This was interesting to me due to my involvement in
python-tripleocleint - which was one of the earliest openstackclient plugins. 
A number of interesting topics come up in this session:

- The work discussed around improving the help in openstackclient sounds really
  important and I think it would be a really great change.
- A new meta-package that will install all plugins, so make it easier to get 
  everything. This will be useful so you don't need to know to install 
  openstackclient and python-heatclient.

Next, the "[TripleO upgrades][ooo-u]" session. If you think installing
OpenStack is complicated, upgrading OpenStack between releases opens up a whole
new set of problems. This session was very interesting as we briefly covered
how we upgrade now and how we are going to approach upgrading in the future,
which composable roles. Thankfully some very smart people are working on this.

Then another "[auto-healing][ah]" Is auto-healing a new buzzword that I missed?
This talk unfortunately wasn't what I was looking for. I primarily came to the
talk as it had Mistral tagged, but I don't think they even mentioned Mistral.
Having said that, it sounds like they are doing some interesting things and I
learned to pay more attention to abstracts.

"[Mistral and StackStorm][mas]" made for an interesting session as they are one of 
the biggest users of Mistral and helped shape the project. It is also
interesting to note that they use Mistral mostly outside of OpenStack which is
great as it demonstrates the viability of the project.

"[Nokia: TOSCA & Mistral][ntm]" gave a good summary of Mistral and what is new in
the Newton release. It was also interesting to hear how they are using Mistral
at Nokia.

Other than these, I sat in a few design sessions for oslo and Heat, but only
managed to follow along a little bit as I'm not as involved in these projects
but I have a peripheral interest.

Woah. Today was busy.

[bsha]: https://www.openstack.org/summit/barcelona-2016/summit-schedule/events/15052/building-self-healing-applications-with-aodh-zaqar-and-mistral
[osc]: https://www.openstack.org/summit/barcelona-2016/summit-schedule/events/17009/openstackclient-roadmap-and-priorities
[ooo-u]: https://etherpad.openstack.org/p/ocata-tripleo-upgrades
[ah]: https://www.openstack.org/summit/barcelona-2016/summit-schedule/events/15037/on-building-an-auto-healing-resource-cluster-using-senlin
[mas]: https://www.openstack.org/summit/barcelona-2016/summit-schedule/events/16999/mistral-mistral-and-stackstorm
[ntm]: https://www.openstack.org/summit/barcelona-2016/summit-schedule/events/17290/nokia-tosca-and-mistral-orchestrating-end-to-end-telco-grade-nfv



### Friday

Friday morning was packed full of design sessions - two for TripleO followed by
two for Mistral. Then the Mistral contributors meetup in the afternoon.

For TripleO we spoke about [composable undercloud deployment][cud] with Heat
and the [TripleO GUI/CLI][ooo-gui] and validations in the first session. These
were both good discussions, but it felt like there was too much to cover in 20
minutes, particularly for the second half. For me, it feels like the primary
goal for Ocata will be getting the GUI and CLI as close as possible - this will
involve a bunch of work on the Mistral workflows to make it possible. Other
than that, there will be lots of refinement to improve the user experience of
both the CLI and GUI.

The second design session was much more free-form and was open for general
questions and discussion related to Ocata.  This was really interesting to
follow along as we heard from a wide range of people about issues that were
important to them.

In the Mistral session we covered a wide range of topics. Focusing on some
current urgent issues and general usability by making small improvements and
work on the documentation. Rather than repeat that, we took some good [notes in
an etherpad][mistral-design].

[cud]: https://etherpad.openstack.org/p/tripleo-composable-undercloud 
[ooo-gui]: https://etherpad.openstack.org/p/gui-ocata
[mistral-design]: https://etherpad.openstack.org/p/mistral-barcelona-summit-topics-2016

