Public Methods
==============

PorterJS exposes several convenience wrappers:

* ``p.one()``
* ``p.all()``
  
These methods can each be chained in any context as needed, and essentially are just wrappers for ``document.querySelector`` and ``document.querySelectorAll``.

In addition, it also exposes some additional methods that are used under the hood, but can be helpful in creating UI components:

* ``p.trigger_call()``