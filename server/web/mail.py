from flask import render_template
from flask_mail import Message
from . import mail


def welcome_user(user, otp):

    msg = Message()
    msg.subject = "Verify your Email"
    msg.sender = 'info.preppyy@gmail.com'
    msg.recipients = [user["email"]]
    msg.html = render_template('welcome.html', user=user, otp=otp)

    mail.send(msg)

def forget_pass_email(user):

    token = user.get_reset_token()

    msg = Message()
    msg.subject = "Preppyy Password Reset"
    msg.sender = 'info.preppyy@gmail.com'
    msg.recipients = [user.email]
    msg.html = render_template('password.html', user=user, token=token)

    mail.send(msg)