from os import environ, path
_basedir = path.abspath(path.dirname(__file__))

ADMINS = frozenset(['dougal85@gmail.com'])
CSRF_ENABLED = False
DEBUG = True
SECRET_KEY = "Hey! FYI, I'm not a secret."
THREADS_PER_PAGE = 8

try:
    MAIL_SERVER = environ['SMTP_HOST']
    MAIL_USE_TLS = True
    MAIL_USERNAME = environ['SMTP_USER']
    MAIL_PASSWORD = environ['SMTP_PASSWORD']
except KeyError as e:
    print "MISSING SMTP_* SETTINGS."
