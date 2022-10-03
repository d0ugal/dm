TIMEZONE = "Europe/London"

SITENAME = "Dougal Matthews"

DEFAULT_CATEGORY = "Uncategorised"

TWITTER_USERNAME = "d0ugal"

PDF_GENERATOR = False
REVERSE_CATEGORY_ORDER = True
DEFAULT_PAGINATION = 100

FEED_RSS = "feeds/all.rss.xml"
CATEGORY_FEED_RSS = "feeds/%s.rss.xml"
CATEGORY_FEED_ATOM = "feeds/%s.atom.xml"
TAG_FEED_RSS = "feeds/tag/%s.rss.xml"
TAG_FEED_ATOM = "feeds/tag/%s.atom.xml"

SOCIAL = (
    ("twitter", "http://twitter.com/d0ugal"),
    ("github", "http://github.com/d0ugal"),
)

SITEURL = FEED_DOMAIN = "http://www.dougalmatthews.com"

THEME = "dm"

ARTICLE_URL = "{date:%Y}/{date:%b}/{date:%d}/{slug}/"
ARTICLE_SAVE_AS = "{date:%Y}/{date:%b}/{date:%d}/{slug}/index.html"

PAGE_URL = "{slug}/"
PAGE_SAVE_AS = "{slug}/index.html"

AUTHOR_URL = "author/{slug}/"
AUTHOR_SAVE_AS = "author/{slug}/index.html"

TAG_URL = "tag/{slug}/"
TAG_SAVE_AS = "tag/{slug}/index.html"

TAGS_SAVE_AS = "tags/index.html"
CATEGORIES_SAVE_AS = "categories/index.html"
ARCHIVES_SAVE_AS = "archives/index.html"

DIRECT_TEMPLATES = (
    "index",
    "tags",
    "categories",
    "archives",
)

JINJA_ENVIRONMENT = {"extensions": ("jinja2.ext.loopcontrols",)}

STATIC_PATHS = ["images", "extra/CNAME"]
EXTRA_PATH_METADATA = {
    "extra/CNAME": {"path": "CNAME"},
}

RELATIVE_URLS = False

PLUGIN_PATHS = ["pelican-plugins"]
PLUGINS = [
    "sitemap",
    "pelican_alias",
]
