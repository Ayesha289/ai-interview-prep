from flask_login import UserMixin
from bson.objectid import ObjectId
import jwt
from time import time
from werkzeug.security import generate_password_hash
import os

class Interview:
    def __init__(self, interview_data):
        self.id = str(interview_data.get('_id'))
        self.user_id = interview_data.get('user_id')
        self.prompt = interview_data.get('prompt')
        self.result = interview_data.get('result')

    def get_interview_id(self):
        return str(self.id)

class User(UserMixin):
    def __init__(self, user_data):
        self.id = str(user_data.get('_id'))
        self.email = user_data.get('email')
        self.first_name = user_data.get('first_name')
        self.password = user_data.get('password')

    def get_id(self):
        return str(self.id)
    
    def get_reset_token(self, expires=300):
        secret_key = os.getenv('SECRET_KEY')
        if not secret_key:
            raise ValueError("SECRET_KEY environment variable is not set.")
        
        return jwt.encode({'reset_password': self.email, 'exp': time() + expires},
                           key=secret_key, algorithm="HS256")
    
    def set_password(self, password, commit=False):
        self.password = generate_password_hash(password)
        if commit:
            from . import mongo
            mongo.db.users.update_one({'_id': ObjectId(self.id)}, {'$set': {'password': self.password}})
    
    @staticmethod
    def verify_reset_token(token):
        try:
            secret_key = os.getenv('SECRET_KEY')
            if not secret_key:
                raise ValueError("SECRET_KEY environment variable is not set.")
            
            email = jwt.decode(token, key=secret_key, algorithms=["HS256"])['reset_password']
        except jwt.ExpiredSignatureError:
            print("Token expired.")
            return None
        except jwt.InvalidTokenError:
            print("Invalid token.")
            return None
        except Exception as e:
            print(f"Error decoding token: {e}")
            return None
        from . import mongo
        user_data = mongo.db.users.find_one({'email': email})
        if user_data:
            return User(user_data)
        return None
