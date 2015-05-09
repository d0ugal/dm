title: MkDocs - Docs with Markdown
category: mkdocs
tags: python, mkdocs, documentation
date: 2015-05-09 13:17
author: Dougal Matthews

[MkDocs] is an open source Python tool for lowering the barrier to writing
documentation. The goal is relatively simple and focused, we want to make it
easier to write [high quality] prose based documentation.

Originally started by Tom Christie, I took over maintenance and development
about 6 months ago. Since then there has been a number of interesting changes,
I want to start writing about these, but first this post will introduce the
project for those unfamiliar with it.


## Quick start

The [MkDocs documentation][MkDocs] takes you through the process of getting
started in detail. This is the super quick version.

1. Start a new project with `mkdocs new my_project`. This will create a new
   directory called my_project or add a mkdocs config to an existing
   directory. It will also create a index.md file within a docs dir.

2. Move into the directory you provided above and run `mkdocs serve`

3. Now open up the index.md file and start editing, when you save, the browser
   should automatically refresh and show the new changes.

## What next?

You can [change the theme], create a [custom theme], tweak the [navigation
configuration] and [page titles].

I plan to follow up this post and share some of the changes and improvements
coming in MkDocs. Both from a technical and users point of view.



[MkDocs]: http://www.mkdocs.org
[high quality]: http://ericholscher.com/blog/2014/feb/27/how-i-judge-documentation-quality/
[change the theme]: http://www.mkdocs.org/user-guide/styling-your-docs/
[custom theme]: http://www.mkdocs.org/user-guide/styling-your-docs/#custom-themes
[navigation configuration]: http://www.mkdocs.org/user-guide/styling-your-docs/#custom-themes
