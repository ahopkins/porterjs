Public Methods
==============

Wrappers
--------

PorterJS exposes several convenience wrappers:

* ``p.one()``
* ``p.all()``
  
These methods are essentially just wrappers for ``document.querySelector`` and ``document.querySelectorAll``. You can chain them together, as long as `all` is not followed by another call.

    p.one('#some_id').all('p')      >> OKAY
    p.one('#some_id').one('p')      >> OKAY
    p.all('.some_class').one('p')   >> NOT OKAY
    p.all('.some_class').all('p')   >> NOT OKAY

In addition, it also exposes some additional methods that are used under the hood, but can be helpful in creating UI components:

* ``p.trigger_call()``
* ``p.ready()``
* ``p.debounce()``
* ``p.events()``
* ``p.stack()``
* ``p.Request()``
* ``p.load()``