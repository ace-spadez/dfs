from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
import re


def check_username_taken(username):
    User = get_user_model()
    if User.objects.filter(username=username).count() >= 1:
        raise ValidationError("Username already  taken")


def check_username_valid(username):
    if not re.match('^[a-z][0-9a-z]*$', username):
        raise ValidationError("Username not valid")


def check_email_taken(email):
    User = get_user_model()
    if User.objects.filter(email=email).count() >= 1:
        raise ValidationError("email  already taken")
