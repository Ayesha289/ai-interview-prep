from flask import Flask
from flask_pymongo import PyMongo
from flask_mail import Mail
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from flask_cors import CORS
from bson.objectid import ObjectId
from .model import User, Interview
import os

load_dotenv()

mongo = PyMongo()
mail = Mail()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    CORS(app)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    
    # MongoDB configuration
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    mongo.init_app(app)

    app.config['MAIL_SERVER']="smtp.gmail.com"
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = 'info.preppyy@gmail.com'
    app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True
    mail.init_app(app)
    jwt.init_app(app)
    
    from .auth import auth
    from .interview import interview

    app.register_blueprint(interview, url_prefix='/api')
    app.register_blueprint(auth, url_prefix='/auth')

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        user_data = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if user_data:
            return User(user_data)
        return None


    return app
