#!/usr/bin/env python

from flask.ext.script import Manager


from serve import app

manager = Manager(app)


if __name__ == "__main__":
    manager.run()
