MongoDb
#######
:date: 2012-03-30 23:47
:author: Dougal Matthews
:category: notes
:url: notes/mongodb/
:save_as: notes/mongodb/index.html


Bulk Loading
------------

- Disable balancer (when sharding)
- Disable safe writes
- Batch load in bulks
- Verify database afterwards!
- Verify replicas.
- Create indexes afterwards (use background=1 to avoid locking the db)