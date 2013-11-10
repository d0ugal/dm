PostgreSQL, The cool stuff.
###########################
:date: 2012-10-01 18:23
:author: Dougal Matthews
:category: notes
:url: /notes/postgres-the-cool-stuff/
:save_as: notes/postgres-the-cool-stuff/index.html
:short_summary: Neat, fun and interesting features in Postgres.
:status: draft

A collection of my favourite Postgres features. Rather than going into much
detail I will link you to the relevant documentation (for now).


hstore
------

Create a column which can store key value data in it. This can then be queried
by keys and values. As a data type this maps well to a Python dictionary.

- http://www.postgresql.org/docs/9.3/static/hstore.html


PL/Python
---------

Use Python on the database. This allows you to reuse code, do faster python
(as there is no round trip) and add database constraints with Python.

- http://www.postgresql.org/docs/9.3/static/plpython.html


Foreign Data Wrappers
---------------------

Access data in other databases from Postgres. There are a large number of
wrappers that allow you to query databases like Redis or MongoDB. This is
particularly useful for doing reports and joins on a NoSQL data or migrating
data from one database to Postgres.

- http://www.craigkerstiens.com/2013/08/05/a-look-at-FDWs/


Psycopg2 and Async
------------------

The Python psycopg2 driver supports async. This allows you to make queries and
rather than wait for the result you can continue doing something while you wait.
Typically this is used when working with something like Twisted but for slower or
longer queries it would be useful.

- http://initd.org/psycopg/docs/advanced.html#asynchronous-notifications


Table Inheritance
-----------------

Rather than implementing 1-2-1 relationships between tables to fake inheritance
you can actually extend tables via inheritance.

- http://www.postgresql.org/docs/9.3/static/tutorial-inheritance.html
