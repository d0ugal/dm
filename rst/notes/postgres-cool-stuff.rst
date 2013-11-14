PostgreSQL, The cool stuff.
###########################
:date: 2013-11-09 18:23
:author: Dougal Matthews
:category: notes
:url: /notes/postgres-the-cool-stuff/
:save_as: notes/postgres-the-cool-stuff/index.html
:short_summary: Neat, fun and interesting features in Postgres.

A collection of my favourite Postgres features. Rather than going into much
detail I will link you to the relevant documentation (for now).


hstore
~~~~~~

Create a column which can store key value data in it. This can then be queried
by keys and values. As a data type this maps well to a Python dictionary.

Quick example - insert data, select one key and filter by one key.

.. code-block:: sql

    CREATE TABLE example (
    id serial PRIMARY KEY,
    data hstore);

    INSERT INTO example (data) VALUES
    ('name => "John Smith", age => 28, gender => "M"'),
    ('name => "Jane Smith", age => 24');

    SELECT id, data->'name' FROM example;

    SELECT id, data->'age' FROM example
    WHERE data->'age' >= '25';


- http://www.postgresql.org/docs/9.3/static/hstore.html


PL/Python
~~~~~~~~~

Use Python on the database. This allows you to reuse code, do faster python
(as there is no round trip) and add database constraints with Python.

How to many a simple max function that given two numbers returns the biggest.

.. code-block:: sql

    CREATE LANGUAGE plpythonu;

    CREATE FUNCTION pymax (a integer, b integer)
      RETURNS integer
    AS $$
      if a > b:
        return a
      return b
    $$ LANGUAGE plpythonu;

    SELECT pymax(1, 2);

- http://www.postgresql.org/docs/9.3/static/plpython.html


Foreign Data Wrappers
~~~~~~~~~~~~~~~~~~~~~

Access data in other databases from Postgres. There are a large number of
wrappers that allow you to query databases like Redis or MongoDB. This is
particularly useful for doing reports and joins on a NoSQL data or migrating
data from one database to Postgres.

- http://www.craigkerstiens.com/2013/08/05/a-look-at-FDWs/
- https://github.com/dpage/redis_fdw
- https://github.com/citusdata/mongo_fdw


Psycopg2 and Async
~~~~~~~~~~~~~~~~~~

The Python psycopg2 driver supports async. This allows you to make queries and
rather than wait for the result you can continue doing something while you wait.
Typically this is used when working with something like Twisted but for slower or
longer queries it would be useful.

Quick async example on an intentionally slow query.

.. code-block:: python

    import psycopg2
    from psycopg2.extras import wait_select

    aconn = psycopg2.connect(..., async=1)
    wait_select(aconn)
    acurs = aconn.cursor()
    acurs.execute("SELECT pg_sleep(5); SELECT * FROM example;")
    wait_select(acurs.connection)
    acurs.fetchone()[0]

- http://initd.org/psycopg/docs/advanced.html#asynchronous-notifications


Table Inheritance
~~~~~~~~~~~~~~~~~

Rather than implementing 1-2-1 relationships between tables to fake inheritance
you can actually extend tables via inheritance.

Inheriting from another table is very easy, just part of the child table
definition.

.. code-block:: sql

    CREATE TABLE detailed_example(
        more_data hstore
    ) INHERITS (example);

- http://www.postgresql.org/docs/9.3/static/tutorial-inheritance.html



Transaction Savepoints
~~~~~~~~~~~~~~~~~~~~~~

In a database transaction you can create savepoints and roll back a transaction
to that point (rather than all or nothing.)

Nice example, borrowed from the docs.

.. code-block:: sql

    BEGIN;
    UPDATE accounts SET balance = balance - 100.00
        WHERE name = 'Alice';
    SAVEPOINT my_savepoint;
    UPDATE accounts SET balance = balance + 100.00
        WHERE name = 'Bob';
    ~~ oops ... forget that and use Wally's account
    ROLLBACK TO my_savepoint;
    UPDATE accounts SET balance = balance + 100.00
        WHERE name = 'Wally';
    COMMIT;

- http://www.postgresql.org/docs/9.3/static/tutorial-transactions.html
