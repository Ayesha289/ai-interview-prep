from flask import Blueprint, request, jsonify, json
from flask_login import login_user, login_required, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin
import pyotp
from . import mongo, mail
from .mail import welcome_user, forget_pass_email
from .model import User

# Initialize Blueprint and CORS
auth = Blueprint('auth', __name__)
CORS(auth, resources={r"/*": {"origins": "*"}})

# Dictionary to store OTPs temporarily with userId as the key
otp_storage = {}

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
            return jsonify({
                "message": "Successfully Logged In",
                "id": str(user.get_id()),
                "credits": user_data.get('credits')
            })
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

        credits = 60

        user_data = mongo.db.users.find_one({"email": email})
        if user_data:
            return jsonify({"message": 'Email Already Exists!'})

            # Hash the password
            hashed_password = generate_password_hash(pass1, method='pbkdf2:sha256', salt_length=16)

            # Create new user without storing OTP
            new_user = {
                "email": email,
                "first_name": firstName,
                "password": hashed_password,
                "credits": credits
            }

            # Insert new user into the database
            inserted_id = mongo.db.users.insert_one(new_user).inserted_id
            user_data = mongo.db.users.find_one({"_id": ObjectId(inserted_id)})
            user = User(user_data)
            login_user(user, remember=True)

            secret_key = pyotp.random_base32()
            otp_generate = pyotp.TOTP(secret_key, interval=600)
            otp = otp_generate.now()
            otp_storage[str(user.get_id())] = otp

            welcome_user(new_user, otp)

            return jsonify({"message": 'Successfully registered. OTP sent to email.', "id": str(user.get_id()), "credits": credits})
    except Exception as e:
        return jsonify({"error": 'An error occurred: ' + str(e)})

@auth.route('/verify-otp', methods=['POST'])
@cross_origin()
def verify_otp():
    data = json.loads(request.data)
    user_id = data['id']
    user_otp = data['otp']

    # Check if the userId exists in the otp_storage dictionary
    if user_id in otp_storage:
        stored_otp = otp_storage[user_id]

        # Verify if the submitted OTP matches the stored OTP
        if user_otp == stored_otp:
            del otp_storage[user_id]  # OTP is valid, delete it from the dictionary
            return jsonify({"message": "OTP verified successfully. Access granted!"})
        else:
            return jsonify({"message": "Invalid OTP"}), 400
    else:
        return jsonify({"message": "No OTP found for the user or OTP has expired"}), 404

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
