---
categories: javascript
tags: balls, canvas
date: 2010/01/08 19:25:00
title: Fun with Balls
author: Dougal
permalink: /articles/2010/jan/8/fun-with-balls/
---

As a simple for-fun ritual when I learn a new language I like to create
a simple very basic application that has some 2D balls (spheres if you
prefer) bouncing on the screen and then I would mess with settings and
effects, fairly basic stuff. It's not really all that exciting but its
fun to write and covers enough things to help you get a decent  start
with the language.

#### JavaScript Balls
I've done this with a few languages, the first was with Visual Basic 6
at college and since then I've done it again with Perl and JavaScript. I
did start one in Java but don't think I ever finished. I've never got
around to creating a Python port and I'm going to have to change that
but for the moment here it is in JavaScript.

 > ** [See it in action here](/media/blog/balls/) **
 >
 > Note, you will need a browser that is capable of handling \<canvas\>
 > so in other words - not Internet Explorer 6. Also I'm afraid the
 > size is fixed so it wont look nice on small resolutions.

The code is really shoddy as its one of the first things I coded in
JavaScript. I'd like to re-write it at some point to compare how I do it
now that I feel comfortable with the language.

I remember when I wrote this my computer wasn't fast enough to render it
very smoothly and the only browser it worked on was FireFox (and
probably Safari but I didn't, and still don't, have a mac). I'm glad to
see how much the browser landscape has changed since then.

#### The Others
I've totally lost the perl implementation - I think I probably left it
on a university computer somewhere. I've got the VB6 code but I don't
have visual studio (installed) anymore and I don't have a floppy drive to
access it!

My Python version, well I think I might do that later if I have time.
I've done very little GUI code with Python so it would make for a fun
exercise.

#### Whats changed?
I find it interesting that as programmers we can often find our way
around an unfamiliar language enough to get things working but generally
you don't take advantage of that languages features. I guess this could
be likened to writing in a language you don't really know (anything but
english in my case) and stumbling with grammar and spelling[^1].

Looking back, the most interesting thing is probably how different I
would approach the problem now. I used Prototype, a library I don't
really have anything against but it doesn't really fit with how I see
JavaScript now as it adds various features that make it feel more like a
'traditional' object oriented language with classes and classical
inheritance. The code relies on global objects and has events written
into the HTML.

Quite frankly most of the code is rubbish but thats one of the ways you
learn! Given the task now I would use jQuery and might consider using some
HTML5 or CSS3 features. That actually sounds quite fun - I sense a
mini project coming up.

[^1]: Something I'm particularly fond of doing.

