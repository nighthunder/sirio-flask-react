# sirio-flask-react
<h1>Sírio flask api with react typescript frontend project</h1>

<h2> How to set up the RESTFUL API :</h2>

<p>Install <a href="https://www.python.org/" target="_blank">python</a></p>

<p>Check python is installed</p>

``` code
python --version
```

<p>If not add python to the PATH.</p>

<p>Install virtualenv on Windows:<p>

``` code
py -m pip install --user virtualenv

```

<p>On mac or linux:</p>

``` code
python3 -m pip install --user virtualenv
```

<h2>How to run</h2>

<p>Activate the virtual environment on Windows:</p>

``` code
flask\Scripts\activate
```

<p>On Mac/linux: </p>

``` code
source flask/bin/activate
```

<p>Run the API RESTFUL service, on Windows:</p>

``` code
flask --app main run
``` 

<p>On Mac/Linux:</p>

``` code
FLASK_APP=main.py flask run
```
<p>Install the mysql connector:</p>
<p> You can install other connectors, like postgres as you wish</p>

``` code
pip install mysql-connector-python
```

<p> Install Flask Alchemy ORM: </p>

``` code
pip install -U Flask-SQLAlchemy
```

<p>The dump of the database is at /dump folder. </p>

<h2>How to set up the front:</h2>

<p>Install <a href="https://nodejs.org/en" target="_blank">nodejs</a></p>

<p>Check if nodejs is installed:</p>

``` code
npm --version
```

<p>Enter in the react folder</p>

<p>Install the node dependencies:</p>

``` code
npm install
```

<p>Start:</p>

``` code
npm start
```

<p>React is running! </p>