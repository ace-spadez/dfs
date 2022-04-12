from django.db import models
from appauth.models import User
from core.models import Contest
# Create your models here.
class QuadrantUser(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='quadrant_user')
    SOP = models.TextField(null=True)
class QuadContestApplication(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='quadapplications')
    contest = models.ForeignKey(Contest,on_delete=models.CASCADE,related_name='quadapplications')
    is_accepted = models.BooleanField(default=False)

