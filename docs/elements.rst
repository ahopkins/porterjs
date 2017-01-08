Elements and Attributes
=======================

PorterJS tries to do all the dirty work for you in trying to figure out what you want to happen. One way it operates is to use ``data-*`` attributes on elements. Many other frameworks (we won't mention which ones) spurn the HTML specifications and run custom attribute names. But not PorterJS. It is designed to work with HTML5 compliant source code. Here are all of the recognized attributes.

Attributes
----------

(1) ``data-method`` 
+++++++++++++++

**Purpose**: To change the HTTP request method for any element that triggers a call.
**Default**: ``GET``, except on a ``form`` element that defaults to ``POST``
**Value**: Can be: ``GET``, ``POST``, ``PATCH``, ``PUT``, ``DELETE``

.. code-block:: html

    <a href="#" data-method="PATCH">link to call a patch</a>
    

Elements
--------

``<a></a>``
+++++++++++

By default, **all** ``<a></a>`` tags will be captured to send HTTP requests asynchronously. However, you can opt out of this behavior with:

* ``.exclude``
* ``.ignore-self``
* ``[target]``