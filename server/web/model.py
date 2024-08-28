from flask_login import UserMixin
from bson.objectid import ObjectId

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

