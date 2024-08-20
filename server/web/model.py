from flask_login import UserMixin
from bson.objectid import ObjectId

# class Evaluation(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     result = db.Column(db.String(5000))
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class User(UserMixin):
    def __init__(self, user_data):
        self.id = str(user_data.get('_id'))
        self.email = user_data.get('email')
        self.first_name = user_data.get('first_name')
        self.password = user_data.get('password')

    def get_id(self):
        return str(self.id)

