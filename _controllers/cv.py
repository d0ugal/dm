import cStringIO as StringIO
import os

from blogofile.cache import bf
import ho.pisa as pisa


config = {
    "name": 'cv',
    "description": 'cv',
    "author": 'Dougal Matthews',
    "url": 'http://dougalmatthews.com',
    "priority": 0,
    "enabled": True,
}


def init():

    path = bf.util.path_join('cv', "index.html")
    html_path = bf.util.path_join('cv', "dougalmatthews.html")
    doc_path = bf.util.path_join('cv', "dougalmatthews.doc")

    cv_path = '_cv/cv.markdown'

    filters = bf.config.controllers.blog.post_default_filters['markdown']

    src = open(cv_path, "r").read().decode('utf-8')
    cv = str(bf.filter.run_chain(filters, src))

    env = {
        'cv': cv,
    }

    bf.writer.materialize_template("cv.mako", path, env)
    bf.writer.materialize_template("cv_html.mako", html_path, env)
    bf.writer.materialize_template("cv_html.mako", doc_path, env)

    template = bf.writer.template_lookup.get_template("cv_pdf.mako")

    cv = bf.writer.template_render(template, env)

    a, b = cv.split("<h3>Experience</h3>")

    cv = a + "<pdf:nextpage />\n<h3>Experience</h3>" + b

    pdf_path = os.path.join(os.path.dirname(__file__), '..', '_site', 'cv', 'dougalmatthews.pdf')

    StringIO.StringIO(cv.encode("ISO-8859-1", "xmlcharrefreplace"))
    pisa.CreatePDF(cv, file(pdf_path, "wb"))


def build_finally():
    pass
