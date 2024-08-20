from flask import Blueprint, render_template, request, jsonify, json
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

from . import db, mail
from .model import User
from .mail import welcome_user

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = json.loads(request.data)
        try:
            email = data['email']
            password = data['password']
            user = User.query.filter_by(email=email).first()
            if user:
                if check_password_hash(user.password, password):
                    login_user(user, remember=True)
                    return jsonify("Successfully Logged In")
                else:
                    return jsonify('Invalid credentials!') 
            elif not user:
                return jsonify('Invalid credentials!')
        except Exception as e:
            return json(e)
        
@auth.route('/register', methods=['GET', 'POST'])
def register():    
    if request.method == 'POST':
        data = json.loads(request.data)
        try:        
            email = data['email']
            firstName = data['fname']
            pass1 = data['password1']
            pass2 = data['password2']

            user = User.query.filter_by(email=email).first()
            if user:
                return jsonify('Email Already Exists!')
            else:
                new_user = User(email=email, first_name=firstName, password=generate_password_hash(pass1, method='pbkdf2:sha256', salt_length=16))
                db.session.add(new_user)
                db.session.commit()
                login_user(new_user, remember=True)
                welcome_user(new_user)
                return jsonify('successfully registered')
        except Exception as e:
            return jsonify('an error occured')

@auth.route('/logout', methods=['GET'])
@login_required
def logout():
    if request.method == 'GET':
        try:
            logout_user()
            return jsonify("successfully logged out")
        except Exception as e:
            return jsonify('an error occured')