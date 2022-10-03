title: MkDocs Making Strides
category: python
tags: python, mkdocs, documentation
date: 2015-06-27 12:24
author: Dougal Matthews

When I [last wrote about MkDocs], the most recent version was [0.12], but
[0.13] was just around the corner. We are now hard at work on [0.15]! So it is
about time to do a quick update.

With over 300 commits which include a ton of bug fixes and new features since
[0.12], I wont bore you with the full list. That is what the [release notes]
are for. Instead I'll highlight a couple of my favourite additions that are
released or will be coming in [0.15].

### Reload the development server with WebSockets

This is actually a feature that landed in MkDocs a while ago, it just hasn't
been mentioned much as it was an improvement to a feature that already
existed; the development server. It also happens to be one of my favourite
features as a user.

Whenever you edit a file and save changes in your editor, if `mkdocs serve` is
running, the filesystem event will be captured, the documentation rebuilt and
the page will be automatically reloaded. This brings near live feedback to
editing if you have your editor and browser sitting side by side.

We owe this functionality to the fantastic [python-livereload] library which
makes this very easy to do.

### Search

The biggest addition in 0.13 was the much anticipated client side search.
Below you can see a screenshot of it on use in the [MkDocs documentation]. The
search results update almost instantly as you type, creating a really
responsive search experience.

![MkDocs Search](/images/2015/search.png)

Search works in MkDocs by generating a JSON file with the full content of the
documentation during the build. This is then used with [lunr.js] to create and
search an index.

### A new CLI

MkDocs also received a new CLI thanks to the excellent [Click] library. On the
surface this doesn't seem like a huge feature, but it is now far easier to
discover usage from the command line with `mkdocs --help`.

```
$mkdocs --help
Usage: mkdocs [OPTIONS] COMMAND [ARGS]...

  MkDocs - Project documentation with Markdown.

Options:
  -V, --version  Show the version and exit.
  -q, --quiet    Silence warnings
  -v, --verbose  Enable verbose output
  -h, --help     Show this message and exit.

Commands:
  build      Build the MkDocs documentation
  gh-deploy  Deply your documentation to GitHub Pages
  json       Build the MkDocs documentation to JSON files...
  new        Create a new MkDocs project
  serve      Run the builtin development server
```

Click is fantastic to work with and it made writing the CLI easy and very
elegant compared with some of the more traditional Python libraries.

### Packageable Themes

This feature **is coming with MkDocs [0.15]** and was just merged into the
[master branch today]. Users will soon be able to [create custom themes and
distribute them] as Python Packages on PyPI. This change also sees 13 of the
15 MkDocs themes be moved into their own repos and packages. Doing so will
allow for faster and more flexible development outside of the code repository.

I am really excited to see what themes users come up with!

---

Now, back to work on MkDocs! I'll do some updates again soon about the next
features that I am working on.


[last wrote about MkDocs]: http://www.dougalmatthews.com/2015/May/09/mkdocs-docs-with-markdown/
[0.12]: http://www.mkdocs.org/about/release-notes/#version-0120-2015-04-14
[0.13]: http://www.mkdocs.org/about/release-notes/#version-0130-2015-05-26
[0.15]: https://github.com/mkdocs/mkdocs/blob/master/docs/about/release-notes.md#version-0150-2015--
[release notes]: http://www.mkdocs.org/about/release-notes/
[MkDocs documentation]: http://www.mkdocs.org/?q=deploy
[python-livereload]: http://livereload.readthedocs.org/en/latest/
[lunr.js]: http://lunrjs.com/
[Click]: http://click.pocoo.org/
[master branch today]: https://github.com/mkdocs/mkdocs/commit/ff05df30dd2de8840fb185363afa41a5517a69ef
[create custom themes and distribute them]: https://github.com/mkdocs/mkdocs/blob/master/docs/user-guide/custom-themes.md
