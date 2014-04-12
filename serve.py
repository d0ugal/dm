from os import environ, path

from flask import (Flask, render_template, send_from_directory, redirect, request)

from raven.contrib.flask import Sentry
import yaml

file_dir = path.dirname(__file__)


def create_app():
    return Flask("serve",
                 template_folder='dm/templates', static_folder='output/static')

app = create_app()
app.config.from_object('flask_config')


try:
    sentry = Sentry(app, dsn=environ['SENTRY_DSN'])
except KeyError:
    sentry = None
    print "MISSING SENTRY_DSN"

try:
    redirect_map = yaml.load(open('redirects.yml'))['redirects']

    for key in redirect_map.keys():
        if key.startswith("/"):
            raise Exception("Key %s starts with a /" % key)

    for value in redirect_map.values():
        if not value.startswith("/"):
            raise Exception("Key %s doesn't start with a /" % value)

except Exception:
    if sentry is not None:
        sentry.captureException
    redirect_map = {}


def r301(path):
    return redirect(path, code=301)


def _redirect(path):

    if path in redirect_map:
        return redirect_map[path]


@app.errorhandler(404)
def not_found(error):
    if sentry:
        sentry.captureMessage("404: %s" % request.url)
    return render_template('flask/404.html'), 404


@app.errorhandler(500)
def server_error(error):
    return render_template('flask/500.html'), 404


@app.route('/')
def home():
    return send_from_directory("output/", "index.html")


@app.route('/admin/', methods=['GET', ])
def admin():
    return render_template('flask/admin.html')


@app.route('/admin/', methods=['POST', ])
def admin_post():

    if sentry:
        vals = dict(request.form)
        sentry.captureMessage("Admin login attempt")
        sentry.captureMessage("Login values", **vals)
    return render_template('flask/admin_post.html')


@app.route('/<path:filename>')
def pretty_static(filename):
    """
    Serve static files in a nicer way. If the path ends with a / - serve the
    index.html. If it ends with a .html, redirect to remove it.
    """

    request_path = _redirect(filename)
    if request_path:
        return r301(request_path)

    # Remove the .html
    if filename.endswith("/index.html"):
        pretty_path, _ = filename.rsplit("/", 1)
        return r301("/%s/" % pretty_path)
    # Serve root
    elif filename == "index.html":
        return r301("/")
    # Add html for actually serving the file
    elif filename.endswith('/') or filename == "":
        filename += 'index.html'
    # Add the trailing slash
    elif '.' not in filename and not filename.endswith("/"):
        return r301("/%s/" % filename)
    elif '.' not in filename:
        message = "Don't know how to serve file %s" % filename
        print message
        sentry.captureMessage(message)

    folder = "{file_dir}/output/".format(file_dir=file_dir)

    # Split the file path into path and file name.
    if '/' in filename:
        sub_path, f = filename.rsplit("/", 1)
        folder = folder + sub_path
    else:
        f = filename

    return send_from_directory(folder, f)

if __name__ == "__main__":
    app.run()
