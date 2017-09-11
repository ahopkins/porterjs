Welcome to PorterJS
===================

|KnownVulnerabilities| |Build| |StackShare|

Version 2.0 (coming soon)
+++++++++++++++++++++++++

.. note:: PorterJS is in the middle of a fairly substantial overhaul that **will** impact the API and backwards compatibility. Most likely, I will be incrementing the release number to version 2.0 when complete. The biggest changes will be the removal of server side operations as the `Request` and `Response` elements are being removed. In addition, the JSX branch will be merged into the master branch allowing full JSX implementation, and both component level and global level state management.

Version 1.1
+++++++++++

Read through the `documentation`_ and check out our `demo`_. If you want to see an example of how to build with it, as a client-side render single-page web application, check out `PorterMail`_.

You can get up and running by installing via ``npm``.

.. code-block:: bash

    npm install porterjs-framework

But, the only file you need is the resource, which you can get from `jsdelivr`_:

.. code-block:: html

    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/porterjs-framework@1.1.3/bin/porter.min.js"></script>

So, feel free to just link that one file.

This project is currently in active development. Please feel free to join as a tester, debugger, programmer, or drinking buddy.

.. _demo: http://porter.js.org
.. _documentation: http://porterjs.readthedocs.io/en/latest/
.. _jsdelivr: http://www.jsdelivr.com/projects/porterjs
.. _PorterMail: https://github.com/ahopkins/portermail
.. |KnownVulnerabilities| image:: https://snyk.io/test/npm/porterjs-framework/badge.svg
   :target: https://snyk.io/test/npm/porterjs-framework
.. |Build| image:: https://badge.fury.io/js/porterjs-framework.svg
    :target: https://badge.fury.io/js/porterjs-framework
.. |StackShare| image:: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
    :target: https://stackshare.io/AdmHpkns/porterjs
