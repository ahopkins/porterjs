Public Components
=================

Wrappers
--------

PorterJS exposes several convenience wrappers:

* ``p.one()``
* ``p.all()``
  
These methods are essentially just wrappers for ``document.querySelector`` and ``document.querySelectorAll``. You can chain them together, as long as ``all()`` is not followed by another call.

.. code-block:: text

    p.one('#some_id').all('p')      >> OKAY
    p.one('#some_id').one('p')      >> OKAY
    p.all('.some_class').one('p')   >> NOT OKAY
    p.all('.some_class').all('p')   >> NOT OKAY

Another difference is that you can call ``addEventListener()`` and ``removeEventListener`` on an entire group of nodes, unlike in stock JavaScript. So, for example, the following would work as expected.

.. code-block:: javascript

    p.all('.some_class').addEventListener('click', callSomeFunction)



Methods
-------

In addition, it also exposes some additional methods that are used under the hood, but can be helpful in creating UI components:

* ``p.trigger_call()``
* ``p.ready()``
* ``p.debounce()``
* ``p.load()``


Objects
-------

There are several classes that are used under the hood. These too (like the methods above) may be useful.

``p.events``
++++++++++++

This is an instantiated instance of the ``Dispatcher`` class. Essentially, it is the holding place for all custom events. It contains several methods that can be used to add, remove, and trigger custom events.

*   ``p.events.add(<NAME OF EVENT>,<CALLBACK>)``:
        Used to record ``<NAME OF EVENT>`` as a potential event.
*   ``p.events.remove(<NAME OF EVENT>,<CALLBACK>)``:
        Used to remove ``<NAME OF EVENT>`` as a potential event.
*   ``p.events.trigger(<NAME OF EVENT>,<ARGS>)``:
        Used to trigger ``<NAME OF EVENT>``.

.. code-block:: javascript

    var someFunction = function(arg1, arg2, arg3) {
        ...
    }

    p.events.add('myCustomEvent', someFunction)
    p.events.trigger('myCustomEvent', arg1, arg2, arg3)
    p.events.remove('myCustomEvent', someFunction)


``p.stack``
+++++++++++

This is an instantiated instance of the `DataStack` class. It is used to hold state for the application. Data is kept inside the `p.stack.storage` variable. **HOWEVER**, it is strongly encouraged to **NOT** directly access the `p.stack.storage` object. Doing so will cause a lot of unexpected results.

Instead, you shoule interact with the `stack` by using the getter and setter methods.

*   ``p.stack.set(<NAME OF KEY>, <VALUE>, <OPTIONAL CALLBACK>)``:
        Used to store a key/value pair to state. If the optional callback is passed, it will be called after the key/value has been stored.
*   ``p.stack.get(<NAME OF KEY>, <OPTIONAL DEFAULT VALUE>)``:
        Used to retrive a key/value pair from state. If the second, optional parameter is passed, it will return this as a default value if the ``key`` is not in the ``state``.
*   ``p.stack.push(<NAME OF KEY>, <VALUE>, <OPTIONAL CALLBACK>)``:
        Used to push a value to a an array in the state. If the optional callback is passed, it will be called after the value has been stored.

Regardless of the ``key``, there will be an event emmitted when storing a key/value to the ``state``. Its name will be ``key + 'StackChange'``. Therefore, you can capture this by adding a custom event.

.. code-block:: javascript

    p.events.add('someKeyStackChange', function() {
        console.log('This event was triggered by pushing an item to the stack')
        console.log('The value of someKey is: ' + p.stack.get('someKey'))
    })

    p.stack.set('someKey', 'abcdefg')


This also works with the ``push()`` method.

.. code-block:: javascript

    p.events.add('someKeyStackChange', function() {
        var my_list = p.stack.get('someKey')
        console.log('This event was triggered by pushing an item to the stack')
        console.log('There are ' + my_list.length + ' items in somKey')
    })

    p.stack.push('someKey', 'abcdefg')


``p.Request``
+++++++++++++

This is an object used to make AJAX calls, and to return a response. To begin, it should be instantiated with a URL as its parameter.

.. code-block:: javascript

    var request = p.Request("http://example.com")

To actually make a call, you call either ``post()`` or ``get()`` on it. Both methods take ``data`` as its first argument.

The ``data`` variable can either be a url encoded string (``foo=bar``) or an object (``{'foo': 'bar'}``).

In addition, the ``post()`` method also takes an additional second parameter: ``csrftoken``. This is a string that gets passed through to a ``X-CSRFToken`` header. Right now, I know this is limited functionality that is screaming of some need for further abstraction. But, PorterJS was developed first and foremost to run with a Django backend, hence the ``csrftoken`` in this form. Future releases will abstract away this logic, and also add better logic for adding headers.

To see this in action:

.. code-block:: javascript

    request.get().then(function (response) {
        console.log(response.responseText)
    }).catch(function (error) {
        console.log(error)
    })              