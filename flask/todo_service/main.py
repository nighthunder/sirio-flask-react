from dataclasses import dataclass
import datetime
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
app.run(debug=True)
load_dotenv()

# create the extension
db = SQLAlchemy()

# Make the connection
host = os.getenv('DATABASE_URL')
user = os.getenv('DATABASE_USER')
passwd = os.getenv('DATABASE_PASSWD')
database = os.getenv('DATABASE_DB')

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://{}:{}@{}/{}".format(user,passwd,host,database)
# initialize the app with the extension
db.init_app(app)
    
@dataclass
class User(db.Model):
    id: int
    firstname: str
    lastname: str
    phone: str
    situation: str
    type: int
    email: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstname= db.Column(db.String, unique=True, nullable=False)
    lastname= db.Column(db.String, unique=True, nullable=False)
    situation = db.Column(db.String, nullable=False)
    type = db.Column(db.Integer, db.ForeignKey('user_type.id'), nullable=False)
    email = db.Column(db.String)
    phone = db.Column(db.String)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __init__(self, type, firstname, lastname, phone, email, situation, created_at = created_at, updated_at = updated_at):
        self.type = type
        self.email = email
        self.situation = situation
        self.firstname = firstname
        self.lastname = lastname
        self.phone = phone
        self.created_at = created_at
        self.updated_at = updated_at

    def __repr__(self):
        return '<User %r>' % self.name
    
    def serialize(self):
        return {"id": self.id,
                "name": self.firstname + self.lastname,
                "situation": self.situation,
                "type": self.type,
                "email": self.email,
                }

@dataclass
class UserType(db.Model):
    id: int
    description: str
    situation: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String, unique=True, nullable=False)
    situation = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __init__(self, description, situation, created_at = created_at, updated_at = updated_at):
        self.description = description
        self.situation = situation
        self.updated_at = updated_at
        self.created_at = created_at

    def __repr__(self):
        return '<UserType %r>' % self.description
    
# Create all models
# db.create_all()

@dataclass
class Situation(db.Model):
    id: int
    description: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String, unique=True, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __init__(self, description, created_at = created_at, updated_at = updated_at):
        self.description = description
        self.updated_at = updated_at
        self.created_at = created_at

@app.route('/users',methods=['GET'])
def getProfessional():
    response = jsonify(User.query.all()) 
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response;

@app.route('/user',methods=['POST'])
@cross_origin(origin='*')
def postUser():
    '''if request.headers['Content-Type'] != 'application/json':
        return 'Invalid Content-Type', 400'''

    data = request.get_json()
    # Now you can access the data in the request body
    
    # Example: accessing a specific field in the JSON data
    firstname = data.get('firstname')
    lastname = data.get('lastname')
    email = data.get('email')
    phone = data.get('phone')
    type = data.get('type')
    situation = data.get('situation')
    created_at = datetime.datetime.now()
    updated_at = datetime.datetime.now()
    me = User(type, firstname, lastname, phone, email, situation, created_at, updated_at)
    db.session.add(me) 
    db.session.commit()
    return jsonify({'success': 'ok'})

@app.route('/types',methods=['GET'])
def getType():
    return  jsonify(UserType.query.all()) 

@app.route('/type',methods=['POST'])
@cross_origin(origin='*')
def postType():
    '''if request.headers['Content-Type'] != 'application/json':
        return 'Invalid Content-Type', 400'''

    data = request.get_json()
    # Now you can access the data in the request body
    
    # Example: accessing a specific field in the JSON data
    description = data.get('description')
    situation = data.get('situation')
    created_at = datetime.datetime.now()
    updated_at = datetime.datetime.now()
    me = UserType(description, situation, created_at, updated_at)
    db.session.add(me) 
    db.session.commit()
    return jsonify({'success': 'ok'})

@app.route('/situations',methods=['GET'])
def getSituations():
    return  jsonify(Situation.query.all()) 

@app.route('/situation',methods=['POST'])
@cross_origin(origin='*')
def postSituation():
    '''if request.headers['Content-Type'] != 'application/json':
        return 'Invalid Content-Type', 400'''

    data = request.get_json()
    # Now you can access the data in the request body
    
    # Example: accessing a specific field in the JSON data
    description = data.get('description')
    created_at = datetime.datetime.now()
    updated_at = datetime.datetime.now()
    me = Situation(description, created_at, updated_at)
    db.session.add(me) 
    db.session.commit()
    return jsonify({'success': 'ok'})

@app.route('/user_type',methods=['POST'])
@cross_origin(origin='*')
def postUserType():
    if request.headers['Content-Type'] != 'application/json':
        return 'Invalid Content-Type', 400

    data = request.get_json()
    # Now you can access the data in the request body
    
    # Example: accessing a specific field in the JSON data
    user_type_id = data.get('type')
    user_id = data.get('id')
    created_at = datetime.datetime.now()
    updated_at = datetime.datetime.now()

    user = User.query.get(user_id)

    if user:
        user.type = user_type_id 
        db.session.commit()
        return 'User updated successfully'

    return 'User not found', 404
