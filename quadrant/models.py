from django.db import models
from appauth.models import User
# Create your models here.
class QuadrantUser(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='quadrant_user')
    SOP = models.TextField(null=True)
    

