from flask import Flask
from routes.interview import interview

app = Flask(__name__)

app.register_blueprint(interview)

if __name__ == "__main__":
    app.run(debug=True)
