title: Effective Code Review
category: python
tags: python, code-review
date: 2016-03-14 13:17
author: Dougal Matthews

Let's talk about code review. For something that takes a large chunk of my time and has an important role in software development, I don't hear people talking about it that often. Maybe that is because we are all doing a great job and have no room for improvement?

<blockquote class="twitter-tweet" data-dnt="true" data-lang="en" data-conversation="none" data-align="center">
    <p lang="en" dir="ltr">
        Every code review a demoralizing mass designed to take motivation out of the equation.
    </p>
    &mdash; Your Friend Stubby (@stubby)
    <a href="https://twitter.com/stubby/status/704449073529618434">
        February 29, 2016
    </a>
</blockquote>
<!-- <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script> -->

It certainly isn't an enjoyable experience for some people. Let's start to talk about how we can improve it.


### Why are we doing Reviews Anyway?

When asked, many developers cite the primary motivation for carrying out code reviews is to find defects in the code. In [Expectations, Outcomes, and Challenges of Modern Code Review][eoacomcr], the author writes

> [...] while finding defects remains the main motivation for review, reviews are less about defects than expected and instead provide additional benefits such as knowledge transfer, increased team awareness, and creation of alternative solutions to problems.

Given there is so much more we can get out of code review, I think we need to
reframe the discussion. It needn't be a negative process for anyone, but it can be a very rewarding and educational experience for everyone.


### Authoring changes

- Context is kind
- Small and contained changes are much easier to review


### Reviewing changes

![gif](http://i.imgur.com/gGwno33.gif)

- Be polite
- Review to learn, not just to feedback (so review work of your seniors)
- Let people know when they taught you something
- Ask questions, don't tell


### Core Review Tooling

I left this section to the end, not because it isn't important, but because there are many options that are all fine and it really comes down to the project and the preferences of those involved.

My main recommendation here is that you evaluate the options, many people use GitHub by default because that is where they host the code. It can work fine in many cases, but the other options can be compelling. We will look at a few of the pros and cons.

#### GitHub

I feel I can confidently say that this is the most common way of doing code reviews. Simply open pull requests and have others comment on them.

+ Reasonably accessible
  - The UI is better than some
  - Most people seem to have github accounts.
- Messy commit history, or change history.
  - You can push additional commits to update a PR - this can create an excessive commit history
  - Or you can force push to keep things tidy but previous revisions are lost


#### Gerrit

+ Review commit messages
+ Flags to give feedback
+ Review the commit message
+ shared responsibility between core reviewers
- Not good with branches
- Bad UI


#### Phabricator



[eoacomcr]: http://research.microsoft.com/apps/pubs/default.aspx?id=180283
