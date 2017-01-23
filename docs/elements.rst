Elements and Attributes
=======================

PorterJS tries to do all the dirty work for you in trying to figure out what you want to happen. One way it operates is to use ``data-*`` attributes on elements. Many other frameworks (we won't mention which ones) spurn the HTML specifications and run custom attribute names. But not PorterJS. It is designed to work with HTML5 compliant source code. Here are all of the recognized attributes.

Attributes
----------

``data-bind``
++++++++++++++++

*   **Purpose**: To enable two-way binding between an ``<input>`` and the `DataStack`_.
*   **Value**: A key in the DataStack, accessible as: ``p.stack.get('someKey')``.
*   **Example**:

.. code-block:: html

    <input data-bind="someKey">


``data-class``
++++++++++++++

See also ``.toggler`` below.

*   **Purpose**: To define the class that should be toggled.
*   **Value**: The class name to be toggled.
*   **Example**:

.. code-block:: html

    <a href="#" data-class="classToBeToggled" class="toggler" data-target="someId">toggle link</a>

``data-method``
+++++++++++++++

*   **Purpose**: To change the HTTP request method for any element that triggers a call.
*   **Default**: ``GET``, except on a ``form`` element that defaults to ``POST``
*   **Value**: Can be: ``GET``, ``POST``, ``PATCH``, ``PUT``, ``DELETE``
*   **Example**:

.. code-block:: html

    <a href="/some/path" data-method="PATCH">link to call a patch</a>



``data-model``
+++++++++++++++

*   **Purpose**: To update the value or text if an element upon the change of a `DataStack`_ key.
*   **Default**: 
*   **Value**: 
*   **Example**:

.. code-block:: html

    <span data-model="someKey"></span>

or

.. code-block:: html

    <input data-model="someKey">



``data-target`` (when used on a ``.toggler`` element)
+++++++++++++++++++++++++++++++++++++++++++++++++++++

See also ``.toggler`` below.

*   **Purpose**: To define the element ``id`` of the intended target.
*   **Value**: The ``id`` of the target.
*   **Example**:

.. code-block:: html

    <a href="#" data-target="someId" class="toggler" data-class="classToBeToggled">toggle link</a>



``data-target`` (when used on an ``<input>`` element)
+++++++++++++++++++++++++++++++++++++++++++++++++++++

*   **Purpose**: To define the ``<form>`` element to be submitted on submit.
*   **Value**: The ``id`` of the target ``form``.
*   **Example**:

.. code-block:: html

    <form id="someFormId">
        <input data-target="someFormId">
    </form>


``data-url``
++++++++++++

*   **Purpose**: 
*   **Default**: 
*   **Value**: 
*   **Example**:

.. code-block:: html

    ...

``data-<EVENT NAME>``
+++++++++++++++++++++

This can be used with any of the following events: ``click``, ``keyup``, ``keydown``, ``focus``, ``blur``, ``change``

*   **Purpose**: To trigger an event on the occurrence of some event.
*   **Value**: The name of the function to call.
*   **Example**:

.. code-block:: html

    <input data-keyup="someValidator">

    <script>
        var someValidator = function (event) {
            ...
        }
    </script>


Elements
--------

``<a></a>`` or ``[data-url]``
+++++++++++++++++++++++++++++

By default, **all** ``<a></a>`` tags will be captured to send HTTP requests asynchronously. However, you can opt out of this behavior with one of the following:

* Setting the element's class as ``.exclude`` or ``.ignore-self``
* ``[target]``
  
In addition, you can create a "fake" link by setting ``[data-url]`` on any element. This will attach a click even to it. This could be usefule, in the following example to make clickable table rows:

.. code-block:: html

    <table>
        <tr data-url="/go/to/element/1">
            ...
        </tr>
        <tr data-url="/go/to/element/2">
            ...
        </tr>
        <tr data-url="/go/to/element/3">
            ...
        </tr>
    </table>



``#content``
++++++++++++

...



``.toggler``
++++++++++++

...


``.modal-open``
+++++++++++++++

...

.. _DataStack: http://.