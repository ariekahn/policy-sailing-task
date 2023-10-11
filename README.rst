.. image:: https://img.shields.io/badge/python-3.6+-blue.svg
        :target: https://www.python.org/downloads/release/python-360/

.. image:: https://img.shields.io/github/license/mashape/apistatus.svg
        :target: https://github.com/nivlab/NivLink/blob/master/LICENSE

NivTurk
=======

Niv lab tools for securely serving and storing data from online computational psychiatry experiments.

Quickstart
^^^^^^^^^^

The following is the minimal set of commands needed to get started with NivTurk (assuming you have already a virtual machine with python 3.6+ and npm installed):

.. code-block:: bash

    ssh <user-name>@<server-name>.princeton.edu
    git clone https://github.com/nivlab/nivturk.git
    cd nivturk
    pip install -r requirements.txt # For python dependencies
    npm install # For node
    npm run gunicorn # Launch the server

To locally demo the experiment (with it already running, see above):

.. code-block:: bash

    cd nivturk
    # To directly open in a browser
    npm run firefox / safari
    # or to print out a URL that can be copied to a browser

Documentation
^^^^^^^^^^^^^

For details on how to serve your experiment, how the code is organized, and how data is stored, please see the
`Documentation <https://nivlab.github.io/nivturk>`_.
