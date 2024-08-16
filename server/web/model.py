from . import db 
import jwt
from time import time
from werkzeug.security import generate_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
import os

class Evaluation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    result = db.Column(db.String(5000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name= db.Column(db.String(150))
    evaluation = db.relationship('Evaluation')

    def get_reset_token(self, expires=300):
        return jwt.encode({'reset_password': self.email, 'exp': time() + expires},
                           key=os.getenv('SECRET_KEY'),algorithm="HS256")
    
    def set_password(self, password, commit=False):
        self.password = generate_password_hash(password)
        if commit:
            db.session.commit()

    @staticmethod
    def verify_reset_token(token):
        try:
            email = jwt.decode(token, key=os.getenv('SECRET_KEY'), algorithms=["HS256"])['reset_password']
            print(email)
        except Exception as e:
            print(e)
            return
        return User.query.filter_by(email=email).first()