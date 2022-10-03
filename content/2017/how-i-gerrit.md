title: How I Gerrit
category: openstack
tags: python, openstack, gerrit, codereview
date: 2017-05-19 08:32:52
author: Dougal Matthews

I use Gerrit every day, and it often feels like I am using it all day too. Over
time I have started to develop a workflow that helps me more effectively manage
the large volume of OpenStack reviews.

**tl;dr - skip the the bottom to see the dashboards I use.**

The general approach I take is to prioritise and filter reviews. I start
filtering like this:

1. Look at starred reviews. These are reviews I have manually starred and want
to keep track of.
2. Find patches passing CI and with an existing +2. These should be in good
shape and ready for review.
3. Find patches passing CI but with no reviews. These are waiting for feedback.

After that, it becomes a bit wild-west. I just look at everthing. I want to
try and find a better way to group these, but the signal to noise ratio isn't
great.

## Dashboards

Gerrit has a neat Dashboard feature, that I think isn't very well exposed to
users.

    https://review.openstack.org/#/dashboard/?foreach=owner:self&Open=is:open&Closed=is%253Aclosed

That is a very simple example - the dashboard shows you your open patches, then
below your closed patches. You can quickly write dashboards like this with some
URL hacking.

There seem to be two special query parameters, then the rest are the searches
that you want. We have a base URL of https://review.openstack.org/#/dashboard/?
and then `foreach` can be used to apply a search to all searches in the
dashboard, this can be useful if you want to limit to a project (or a user, as
we did above). `title` lets you set a title for the dashboard, pretty obvious!

After that you can arbitrary query parameters, where the name of the parameter
is the section title and the value is the search itself.

## Gerrit Dash Creator

There is a nice Python project that helps you generate dashboards. I don't know
all that much about it, I just forked the project, added three dashboards and
ran tox to verify them.

The best thing about this is the library of examples you can learn from.

I have three dashboards, [one for my patches][mine] and one for the two
primary projects I am involved in; [TripleO] and [Mistral]. Now I have started
storing them here, I expect over time I'll end up with a few others.

[TripleO]: https://github.com/d0ugal/gerrit-dash-creator/blob/master/dashboards/d0ugal-tripleo.dash
[Mistral]: https://github.com/d0ugal/gerrit-dash-creator/blob/master/dashboards/d0ugal-mistral.dash

## My Dashboards

As these depend on your account - i.e. patches you have submitted, or if you
have starred patches, your results will vary.

- [My Dashboard][mine-live] - mostly patches I have submitted, but also a few others I want
- [TripleO][TripleO-live] - TripleO patches. Limited to the projects I am core in and with some prioritisation.
- [Mistral][Mistral-live] - Mistral patches, prioritised by how far they have moved.

My main takeaway from this is using the Gerrit starring feature to track
specific reviews. This helps me follow along with features that are important
or interesting to me. This has really helped my workflow, as I previously lost
or forgot about important reviews in the noise.

[mine]: https://github.com/d0ugal/gerrit-dash-creator/blob/master/dashboards/d0ugal.dash
[TripleO]: https://github.com/d0ugal/gerrit-dash-creator/blob/master/dashboards/d0ugal-tripleo.dash
[Mistral]: https://github.com/d0ugal/gerrit-dash-creator/blob/master/dashboards/d0ugal-mistral.dash
[mine-live]: https://review.openstack.org/#/dashboard/?title=My+Review+Dashboard&foreach=&Starred=is%253Astarred&Negative+Review=owner%253Aself+is%253Aopen+label%253ACode%252DReview%253C%253D%252D1&Failed+CI=owner%253Aself+label%253AVerified%253C%253D%252D1+is%253Aopen+NOT+label%253AWorkflow%253C%253D%252D1&Work+In+Progress=owner%253Aself+is%253Aopen+label%253AWorkflow%253C%253D%252D1&Waiting+For+Reviews=owner%253Aself+is%253Aopen+NOT+label%253AWorkflow%253C%253D%252D1+NOT+label%253AVerified%253C%253D%252D1+NOT+label%253ACode%252DReview%253E%253D2&Waiting+For+Second+Review=owner%253Aself+is%253Aopen+NOT+label%253AWorkflow%253E%253D1+NOT+label%253ACode%252DReview%253C%253D%252D2+label%253ACode%252DReview%253E%253D2&Reviewing=reviewer%253Aself+is%253Aopen+NOT+owner%253Aself+limit%253A20&My+Closed=owner%253Aself+is%253Aclosed+limit%253A20
[TripleO-live]: https://review.openstack.org/#/dashboard/?title=TripleO+Review+Dashboard&foreach=%2528project%253Aopenstack%252Fpython%252Dtripleoclient+OR%250Aproject%253Aopenstack%252Ftripleo%252Dcommon%2529+is%253Aopen&Starred=is%253Astarred&Waiting+For+Second+Review=NOT+label%253AWorkflow%253C%253D%252D1+NOT+label%253ACode%252DReview%253C%253D%252D2+label%253ACode%252DReview%253E%253D2&Waiting+For+Reviews=NOT+label%253AWorkflow%253C%253D%252D1+NOT+label%253AVerified%253C%253D%252D1+NOT+label%253ACode%252DReview%253E%253D2&You+are+a+reviewer%252C+but+haven%2527t+voted+in+the+current+revision=NOT+label%253ACode%252DReview%253C%253D2%252Cself+reviewer%253Aself+NOT+owner%253Aself+limit%253A10&Latest+Reviews=limit%253A20
[Mistral-live]: https://review.openstack.org/#/dashboard/?title=Mistral+Review+Dashboard&foreach=is%3Aopen&Starred=project%3A%5E.%2Amistral.%2A+is%3Astarred&Waiting+For+Second+Review=project%3A%5E.%2Amistral.%2A+NOT+label%3AWorkflow%3C%3D%2D1+NOT+label%3ACode%2DReview%3C%3D%2D2+label%3ACode%2DReview%3E%3D2&Waiting+For+Reviews=project%3A%5E.%2Amistral.%2A+NOT+label%3AWorkflow%3C%3D%2D1+NOT+label%3AVerified%3C%3D%2D1+NOT+label%3ACode%2DReview%3E%3D2&You+are+a+reviewer%2C+but+haven%27t+voted+in+the+current+revision=project%3A%5E.%2Amistral.%2A+NOT+label%3ACode%2DReview%3C%3D2%2Cself+reviewer%3Aself+NOT+owner%3Aself+limit%3A10&Patches+that+mention+Mistral=NOT+project%3A%5E.%2Amistral.%2A+message%3Amistral+limit%3A20&Latest+Reviews=project%3A%5E.%2Amistral.%2A+limit%3A20
