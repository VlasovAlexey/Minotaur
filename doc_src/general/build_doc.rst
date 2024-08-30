How to Build Documentation Locally
====================================

1. Clone the repository.

2. Install Python.

3. Install the following dependencies:

.. code:: console

    $ pip install sphinx==5.3.0
    $ pip install myst_parser==0.18.1
    $ pip install breathe==4.35.0
    $ pip install sphinx-copybutton
    $ pip install sphinx-version-warning
    $ pip install sphinx-hoverxref
    $ pip install sphinx-markdown-tables
    $ pip install sphinx_rtd_theme==1.1.1
    $ pip install sphinx-tabs

.. note::

    If installing on Windows, Sphinx and all related components must be
    installed with administrator privileges.

4. In the directory ``Minotaur\doc_src`` Run the: ``build.bat``

5. To view the ready build, open the ``index.html`` file in the ``Minotaur\doc``
   directory.

.. Tip::
    The command is used to build documentation using Sphinx. Sphinx will generate the documentation in the
    specified output format (HTML by default) from the source in the current ``Minotaur\doc_src`` and place the prepared files in the ``Minotaur\doc`` directory.
    More information is available on :doc:`FAQ <../general/faq>`.
