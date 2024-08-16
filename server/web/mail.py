from flask import render_template
from flask_mail import Message
from . import mail


def welcome_user(user):

    msg = Message()
    msg.subject = "Welcome to Preppyy!!"
    msg.sender = 'info.preppyy@gmail.com'
    msg.recipients = [user.email]
    msg.html = render_template('welcome.html', user=user)

    mail.send(msg)