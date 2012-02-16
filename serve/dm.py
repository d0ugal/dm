import sys

from flask import Flask, render_template, send_from_directory, redirect
from raven.contrib.flask import Sentry


def create_app():
    return Flask("dm", template_folder='../dm/templates')

app = create_app()
app.config.from_object('config')
sentry = Sentry(app, dsn='https://f0262365d4f3480588f480b1db432bc5:964d6476f55c48769c3ba92ad76557a9@app.getsentry.com/40')


@app.errorhandler(404)
def not_found(error):
    sentry.captureException(sys.exc_info())
    return render_template('flask/404.html'), 404


@app.errorhandler(500)
def server_error(error):
    return render_template('flask/500.html'), 404


@app.route('/')
def home():
    return send_from_directory("../output/", "index.html")


@app.route('/admin/')
def admin():
    return render_template('flask/admin.html')


@app.route('/<path:filename>')
def pretty_static(filename):
    """
    Serve static files in a nicer way. If the path ends with a / - serve the
    index.html. If it ends with a .html, redirect to remove it.
    """

    if filename.endswith("/index.html"):
        pretty_path, _ = filename.rsplit("/")
        return redirect("/%s/" % pretty_path)
    elif filename == "index.html":
        return redirect("/")
    elif filename.endswith('/') or filename == "":
        filename += 'index.html'
    elif '.' not in filename and not filename.endswith("/"):
        return redirect("%s/" % filename)

    folder = "../output/"

    if '/' in filename:
        sub_path, f = filename.rsplit("/", 1)
        folder = folder + sub_path
    else:
        f = filename

    return send_from_directory(folder, f)

if __name__ == "__main__":
    app.run()