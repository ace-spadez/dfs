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
        send_mail(
            'Verify your QuickPublisher account',
            'Follow this link to verify your account:',
            EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )
    except UserModel.DoesNotExist:
        logging.warning("Tried to send verification email to non-existing user")
