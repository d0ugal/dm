title: The Goals of Code Review
category: python
tags: python, code-review
date: 2016-06-05 13:17
author: Dougal Matthews

Let's talk about code review. It's a vital part of software development and takes up a large chunk of time, yet I don't often hear people talking about it. I think this is because it is often viewed as an unpleasant chore.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Every code review a demoralizing mass designed to take motivation out of the equation.</p>&mdash; Your Friend Stubby (@stubby) <a href="https://twitter.com/stubby/status/704449073529618434">February 29, 2016</a></blockquote>
<!-- <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script> -->

However, code review can be the most valuable and rewarding parts of your day. I'd like to start a conversation about code review, I generally enjoy it but know I there is space for improvement for me and many others.

### Commercial and Open Source

I am approaching this topic from both perspectives, although, since all my work at Red Hat is Open Source and all reviews are done in the open that does impact my experiences. I have worked in closed, private code reviews before and believe most of this can be generally applied.

### Why are we doing code review anyway?

When asked, many developers cite the primary motivation for code review is to find bugs in code. In the paper [Expectations, Outcomes, and Challenges of Modern Code Review][eoacomcr], the author writes

> [...] while finding defects remains the main motivation for review, reviews are less about defects than expected and instead provide additional benefits such as knowledge transfer, increased team awareness, and creation of alternative solutions to problems.

The researchers manually classified a large number of code reviews and what the outcome was. So, let's look at what they found and see how we can focus on improving this.


#### Knowledge Transfer

This is why is it important for everyone to review code. A fairly common mistake is for only senior developers to review code. However, reading and understanding a review is one of the best ways for everyone to learn the code base and increase the [bus factor] for the project. Reviews also allow developers to share general knowledge by sharing tips or referencing documentation that may make something easier.


> how about using OSError instead as it's more general: https://docs.python.org/3.4/library/exceptions.html#exception-hierarchy

#### Increased Team Awareness

Code reviews give developers a convenient way to follow what is happening in a project. It allows everyone to be involved in the discussion and decision making. With the alternative being to trawl through the version control history or stumble on new additions later, it seems obvious that this would be more effective.

#### Alternative Solutions

Often during code review the code may be correct, and work but alternative solutions are suggested that can improve the solution in some way (like reduce duplication, simplify or make it more efficient).


### summary?

Given there is so much more we can get out of code review, I think we need to
reframe the discussion. It needn't be a negative process for anyone and it can be a very rewarding and educational experience for everyone.

Unfortunately it is easy to unintentionally setup the process with a negative slant. Even the word *review* puts the author on the defensive, it sounds more like a performance review of the person when the process should be viewed as a collaborative discussion.


<!-- <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/d0ugal">@d0ugal</a> 0% thankfully. Coders act like they&#39;ve painted a masterpiece and tend to debate every piece of feedback.</p>&mdash; Mark Litwintschik (@marklit82) <a href="https://twitter.com/marklit82/status/737939325334237184">June 1, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
 -->

[eoacomcr]: http://research.microsoft.com/apps/pubs/default.aspx?id=180283
[bus factor]: https://en.wikipedia.org/wiki/Bus_factor
