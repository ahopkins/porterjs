Requests
========

Web architecture is mainly centered around the request/response model. The browser sends a request to a server, that server returns a response to the browser. PorterJS is centered around this dynamic (and therefore is not **currently** built to handle websockets--*COMING SOON!*).

PorterJS expects a response from the browser to be in JSON format, and can accomodate any key/value structure it is given. However, to leverage its core functionality, there is a set of reserved key/value pairs that will trigger certain browser side actions.

``breadcrumbs``
+++++++++++++++

*COMING SOON*



``callbacks``
+++++++++++++

*   **Purpose**: To trigger execution of a callback function
*   **Value(s)**: Should be an``{Object}`` in the following form
    
.. code-block:: javascript

    {
        'function': 'name_of_some_function',
        'arguments': [
            'list',
            'of',
            'some','
            'arguments'
        ]
    }


``errors``
++++++++++

*COMING SOON*



``html``
++++++++

*   **Purpose**: To push HTML code to elements in the DOM
*   **Value(s)**: Can be a ``"string"``, ``{Object}``, or ``[Array]``

1. If ``"string"``, then the contents of that string will be inserted into an element with an ``id="content"``.
2. If ``{Object}``, then each element with an id that equals ``key`` will have the corresponding ``value`` inserted.
3. If ``[Array]``, then each item should itself be an ``{Object}`` with two keys: ``id`` and ``content``.
  
.. code-block:: javascript
    
    // Scenario 1
    {
        "html": "Hello, world."
    }

    // Scenario 2
    {
        "html": {
            "foo": "bar"
        }
    }

    // Scenario 3
    {
        "html": [
            {
                "id": "spam",
                "content": "eggs"
            }
        ]
    }

``notifications``
+++++++++++++++++

*COMING SOON*



``redirect``
++++++++++++

*   **Purpose**: To trigger a reload or change in the ``window.location``
*   **Value(s)**: A string being the intended ``location``.


``title``
+++++++++

*COMING SOON*