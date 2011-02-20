from blogofile.cache import bf

blog = bf.config.controllers.blog


def run():
    # The original feed paths for Blogofile
    write_feed(blog.posts, bf.util.path_join(blog.path, "feed"), "rss.mako")
    write_feed(blog.posts, bf.util.path_join(blog.path, "feed", "atom"),
                          "atom.mako")

    # Feed paths to match my current/old site.
    write_feed(blog.posts, bf.util.path_join(blog.path, "feeds", 'all'), "rss.mako")
    write_feed(blog.posts, bf.util.path_join(blog.path, "feeds", 'all', "atom"),
                          "atom.mako")

def write_feed(posts, root, template):
    root = root.lstrip("/")
    path = bf.util.path_join(root, "index.xml")
    blog.logger.info("Writing RSS/Atom feed: " + path)
    env = {"posts": posts, "root": root}
    bf.writer.materialize_template(template, path, env)
