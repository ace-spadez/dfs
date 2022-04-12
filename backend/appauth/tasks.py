import logging

from django.urls import reverse
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from rankr_server.celery import app
from rankr_server.settings import EMAIL_HOST_USER


@app.task
def send_verification_email(user_id):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=user_id)
        message = f'Thank you for registering with Rankr!\n Click <a href="localhost:8080/verify?ab={user.secret_key}">Here</a>to verify your account.',
        send_mail(
            'Rankr Verification',
            message,
            EMAIL_HOST_USER,
            [user.email],
            html_message=message,
            fail_silently=False,
        )
    except UserModel.DoesNotExist:
        logging.warning("Tried to send verification email to non-existing user")
