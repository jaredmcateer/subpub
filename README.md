SubPub
======= 

SubPub is a simple Publish/Subscription object.

How to use
----------

Subscribe
---------
`subPub.subscribe('your subscription name', handlerFunction);`

Publish
-------

The optional `dataMemo` parameter will be passed on to the subscribed function handlers 

`subPub.publish('your subscriptio name'[, dataMemo]);`

Unsubscribe
-----------

If you do not specify the function handler to unsubscribe, all handlers subscribed to the key will be removed.

`subPub.unsubscribe('your subscription name'[, handlerFunction]);`
