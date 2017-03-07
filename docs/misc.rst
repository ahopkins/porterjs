Miscellaneous
=============

Objects
-------

Dotted property getter and setter
+++++++++++++++++++++++++++++++++

Given any object, you can get or set a property in by a dotted string notation.

.. code-block:: javascript

    var nested = {
        inner: {
            property: {
                found: {
                    here: 'Hello, world.'
                }
            }
        }
    }

    console.log(nested.getProperty('inner.property.found.here'))

    nested.setProperty('inner.property.found.here', 'Something else')