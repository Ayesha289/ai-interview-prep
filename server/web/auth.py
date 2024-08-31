from flask import Blueprint, request, jsonify, json, render_template
from flask_login import login_user, login_required, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin

from . import mongo, mail
from .mail import welcome_user, forget_pass_email
from .model import User

auth = Blueprint('auth', __name__)
CORS(auth, resources={r"/*": {"origins": "*"}})

@auth.route('/login', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def login():
    data = json.loads(request.data)
    try:
        email = data['email']
        password = data['password']
        user_data = mongo.db.users.find_one({"email": email})
        if user_data and check_password_hash(user_data['password'], password):
            user = User(user_data)
            login_user(user, remember=True)
            return jsonify({"message": "Successfully Logged In", "id": str(user.get_id())})
        return jsonify({"message": 'Invalid credentials!'})
    except Exception as e:
        return jsonify({"error": str(e)})

@auth.route('/register', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def register():
    data = json.loads(request.data)
    try:
        email = data['email']
        firstName = data['fname']
        pass1 = data['password1']
        pass2 = data['password2']

        user_data = mongo.db.users.find_one({"email": email})
        if user_data:
            return jsonify({"message": 'Email Already Exists!'})
        else:
            # Hash the password before storing it
            hashed_password = generate_password_hash(pass1, method='pbkdf2:sha256', salt_length=16)
            new_user = {
                "email": email,
                "first_name": firstName,
                "password": hashed_password
            }
            inserted_id = mongo.db.users.insert_one(new_user).inserted_id
            user_data = mongo.db.users.find_one({"_id": ObjectId(inserted_id)})
            user = User(user_data)
            login_user(user, remember=True)
            welcome_user(new_user)
            return jsonify({"message": 'Successfully registered', "id": str(user.get_id())})
    except Exception as e:
        return jsonify({"error": 'An error occurred: ' + str(e)})

@auth.route('/logout', methods=['GET'])
@cross_origin()
@login_required
def logout():
    try:
        logout_user()
        return jsonify({"message": "Successfully logged out"})
    except Exception as e:
        return jsonify({"error": 'An error occurred: ' + str(e)})
    
@auth.route('/forget-password', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def forget_password():
    data = json.loads(request.data)
    email = data['email']
    user_data = mongo.db.users.find_one({"email": email})
    if user_data:
        user = User(user_data)
        forget_pass_email(user)
        return jsonify({"message": "Email for password reset has been sent!"})
    else:
        return jsonify({"message": 'Email does not exists!'})
    
    
@auth.route('/password_reset_verified/<token>', methods=['GET', 'POST'])
@cross_origin()
def reset_verified(token):
    try:
        data = json.loads(request.data)
        user = User.verify_reset_token(token)
        if not user:
            print('no user found')
            return jsonify({"message": "User not found"})
        password = data['password']
        if password:
            user.set_password(password, commit=True)
            return jsonify({"message": "password changed successfully!"})
    except Exception as e:
        return jsonify({"error": 'An error occurred: ' + str(e)})
