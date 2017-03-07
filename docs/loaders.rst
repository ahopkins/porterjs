Loaders
=======

Loaders are the tools that turn HTML events into events and building blocks. The process is initiated by the ``load()`` method, which is also `publically available`_ <public.rst> as ``p.load()``. Whenever HTML is being rendered, it should be followed by this method to capture any newly inserted DOM elements. This should be 

Types
-----

Links
+++++

**Anchors ``<a>``**: By default all anchor elements will have their default behavior removed, and instead will trigger one of two options:

    1.  If your `CONFIG`_ is setup for **server side rendering**, then it will trigger the ``trigger_call`` method. See `server side rendering`_ and `elements`_ for more details.
    2.  If your CONFIG is setup for **client side rendering**, then it will trigger the `router`_ .
        
You can opt out of this default behavior by adding ``ignore-self``, or ``exclude`` as the element's class.

*NOTE: Make sure to exclude your element if you want to assign a different click event to it.*

**Any element with ``[data-url]``**: By adding the ``data-url`` attribute, any element can become a link. This is useful when you want an antire row of a table to be clickable.


Events
------

There are two events that are emitted during the ``load()``. You can hook into it with your own functionality by adding an event for ``preLoaders`` and ``postLoaders``.

.. code-block:: javascript

    p.events.add('preLoaders', function () {
        console.log('Do something great./');
    });
    
    .. _router: http://
    .. _elements: http://
    .. _server side rendering: http://and `elements`_ 
    .. _elements: elements.rst
    .. _CONFIG: http://