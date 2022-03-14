from django.db import models
# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import uuid


class User(AbstractUser):
    bio = models.TextField(
        max_length=100, null=True, blank=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    email = models.EmailField()
    date_joined = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    rating = models.ForeignKey(
        'appauth.Rating', on_delete=models.CASCADE, null=True)
    experience = models.FloatField(null=False, default=1500.0)
    tier = models.IntegerField(null=False, default=5)

    secret_key = models.CharField(max_length=64, null=True, blank=True)

    profile_image = models.ImageField(null=True, blank=True)
    is_private = models.BooleanField(default=False)
    is_blacklisted = models.BooleanField(default=False)
    is_quadrant = models.BooleanField(default=False)

    isVerified = models.BooleanField(default=False)

    def is_friend(self,req_user):
        if self.watchers.filter(watcher=req_user).exists():
            return True
        return False

    def get_friends(self):
        return User.objects.filter(watchers__watcher=self)

    def update(self, **kwargs):
        for field, value in kwargs.items():
            setattr(self, field, value)
        self.save(update_fields=kwargs.keys())
        return self


class Rating(models.Model):
    uuid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    r_all = models.FloatField(null=False, default=1500.0)
    r_m = models.FloatField(null=False, default=1500.0)
    r_p = models.FloatField(null=False, default=1500.0)
    r_c = models.FloatField(null=False, default=1500.0)


class Watchfriend(models.Model):
    watcher = models.ForeignKey(
        User, related_name='watchees', on_delete=models.CASCADE)
    watchee = models.ForeignKey(
        User, related_name='watchers', on_delete=models.CASCADE)

