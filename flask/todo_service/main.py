from dataclasses import dataclass
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS, cross_origin
import logging

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

app = Flask(__name__)
CORS(app)
app.run(debug=True)

# create the extension
db = SQLAlchemy()

# Make the connection
host = "grafothinker.com.br"
user = "grafot76_flymaya"
passwd = "vD92J0J#5Pcb"
database = "grafot76_sirio"

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://{}:{}@{}/{}".format(user,passwd,host,database)
# initialize the app with the extension
db.init_app(app)
    
@dataclass
class User(db.Model):
    id: int
    name: str
    situation: str
    type: int
    email: str

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name= db.Column(db.String, unique=True, nullable=False)
    situation = db.Column(db.String, nullable=False)
    type = db.Column(db.Integer, db.ForeignKey('professional_type.id'), nullable=False)
    email = db.Column(db.String)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __init__(self, name, situation, type, email):
        self.name = name
        self.email = email
        self.situation = situation
        self.type = type
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.description
    
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
    situation: str
    description: str

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String, unique=True, nullable=False)
    situation = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __init__(self, description, situation):
        self.description = description
        self.situation = situation

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
    type = data.get('type')
    situation = data.get('situation')
    me = User(name, situation, type, email)
    db.session.add(me) 
    db.session.commit()
    return jsonify({'success': 'ok'})

@app.route('/type',methods=['GET'])
def getType():
    return  jsonify(ProfessionalType.query.all()) 

