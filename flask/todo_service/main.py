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
    name: str
    phone: str
    situation: str
    type: int
    email: str
    createdAt: datetime.datetime
    updatedAt: datetime.datetime

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name= db.Column(db.String, unique=True, nullable=False)
    situation = db.Column(db.String, nullable=False)
    type = db.Column(db.Integer, db.ForeignKey('professional_type.id'), nullable=False)
    email = db.Column(db.String)
    phone = db.Column(db.String)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __init__(self, type, name, phone, email, situation, createdAt = createdAt, updatedAt = updatedAt):
        self.type = type
        self.email = email
        self.situation = situation
        self.name = name
        self.phone = phone
        self.createdAt = createdAt
        self.updatedAt = updatedAt

    def __repr__(self):
        return '<User %r>' % self.name
    
    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "situation": self.situation,
                "type": self.type,
                "email": self.email,
                }

@dataclass
class ProfessionalType(db.Model):
    id: int
    description: str
    situation: str
    createdAt: datetime.datetime
    updatedAt: datetime.datetime

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String, unique=True, nullable=False)
    situation = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __init__(self, description, situation, createdAt = createdAt, updatedAt = updatedAt):
        self.description = description
        self.situation = situation
        self.updatedAt = updatedAt
        self.createdAt = createdAt

    def __repr__(self):
        return '<ProfessionalType %r>' % self.description
    
# Create all models
# db.create_all()

@app.route('/user',methods=['GET'])
def getProfessional():
    return  jsonify(User.query.all()) 

@app.route('/user',methods=['POST'])
@cross_origin(origin='*')
def postProfessional():
    if request.headers['Content-Type'] != 'application/json':
        return 'Invalid Content-Type', 400

    data = request.get_json()
    # Now you can access the data in the request body
    
    # Example: accessing a specific field in the JSON data
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    type = data.get('type')
    situation = data.get('situation')
    createdAt = datetime.datetime.now()
    updatedAt = datetime.datetime.now()
    me = User(type, name, phone, email, situation, createdAt, updatedAt)
    db.session.add(me) 
    db.session.commit()
    return jsonify({'success': 'ok'})

@app.route('/type',methods=['GET'])
def getType():
    return  jsonify(ProfessionalType.query.all()) 

@app.route('/type',methods=['POST'])
@cross_origin(origin='*')
def postType():
    if request.headers['Content-Type'] != 'application/json':
        return 'Invalid Content-Type', 400

    data = request.get_json()
    # Now you can access the data in the request body
    
    # Example: accessing a specific field in the JSON data
    description = data.get('description')
    situation = data.get('situation')
    createdAt = datetime.datetime.now()
    updatedAt = datetime.datetime.now()
    me = ProfessionalType(description, situation, createdAt, updatedAt)
    db.session.add(me) 
    db.session.commit()
    return jsonify({'success': 'ok'})

@app.route('/update_professional_type',methods=['POST'])
@cross_origin(origin='*')
def postProfessionalType():
    if request.headers['Content-Type'] != 'application/json':
        return 'Invalid Content-Type', 400

    data = request.get_json()
    # Now you can access the data in the request body
    
    # Example: accessing a specific field in the JSON data
    user_type_id = data.get('type')
    user_id = data.get('id')
    createdAt = datetime.datetime.now()
    updatedAt = datetime.datetime.now()

    user = User.query.get(user_id)

    if user:
        user.type = user_type_id 
        db.session.commit()
        return 'User updated successfully'

    return 'User not found', 404
