Change default storage engine MySQL
###################################

:category: mysql
:tags: centos, django, innodb, mysql
:date: 2008-09-03 19:25
:title: Changing default storage engine in MySQL
:author: Dougal Matthews
:permalink: /articles/2008/sep/3/changing-default-storage-engine-in-mysql/

It took me a while to find the answer to this, so I thought I'd share it to
avoid anybody else wasting time with this. I needed to change the default
storage engine so Django would use innoDB rather than MyISAM. Otherwise, it
seemed to take the default.

You first need to locate the MySQL config file named my.cnf. On CentOS 5.2 it
is located at /etc/my.cnf but this will probably vary across platforms.

Then in that file find the [mysqld] and add add the following line below it
as shown below.

.. code-block:: text

    [mysqld]
    default-storage-engine = innodb

Finally, make sure you restart MySQL.

.. code-block:: text

    service mysqld restart


It's pretty easy when you know how, and you'll now had transactional tables by
default.

Alterantivaley though, you could use a `much better database`_.

.. _much better database: http://www.postgresql.org/
