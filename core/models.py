from django.db import models
from appauth.models import User
import uuid
from django.utils import timezone 
# Create your models here.
class Contestchip(models.Model):
    name = models.CharField(max_length=20,unique=True,primary_key=True)
class Contest(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    FULL = 'F'
    PHYSICS = 'P'
    CHEMISTRY = 'C'
    MATHS = 'M'
    CONTEST_TYPE_CHOICES = [
        (FULL, 'Full Course'),
        (PHYSICS, 'Physics'),
        (CHEMISTRY, 'Chemistry'),
        (MATHS, 'Maths'),
        
    ]

    MIXED = 'MX'
    MAINS = 'MN'
    ADVANCED = 'AV'
    EXTRA_ADAVNCED = 'XA'
    CONTEST_DIFFICULTY_CHOICES = [
        (MIXED, 'Mixed difficulty'),
        (MAINS, 'Mains level'),
        (ADVANCED, 'Advanced level'),
        (EXTRA_ADAVNCED, 'Extra advanced level'),
        
    ]
    name = models.CharField(max_length=30)
    date_created = models.DateTimeField(auto_now_add=True)
    target_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.IntegerField()
    contest_type = models.CharField(max_length=30,choices=CONTEST_TYPE_CHOICES)
    contest_difficulty = models.CharField(max_length=30,choices = CONTEST_DIFFICULTY_CHOICES)
    writers= models.ManyToManyField(User,related_name='written_contests')
    description = models.TextField()
    contest_chips = models.ManyToManyField(Contestchip,related_name='contests')

class Score(models.Model):
    uuid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    score_all = models.IntegerField(null=True)
    score_m = models.IntegerField(null=True)
    score_p = models.IntegerField(null=True)
    score_c = models.IntegerField(null=True)

class  Contestprocess(models.Model):
    PENDING = 'P'
    CURRENT = 'C'
    PASSED = 'X'
    CONTEST_STATUS_CHOICES = [
        (PENDING, 'Applied'),
        (CURRENT, 'Contest going on'),
        (PASSED, 'Contest over'),
        
    ]
    uuid = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='contest_processes')
    contest = models.ForeignKey(Contest,on_delete=models.CASCADE,related_name='contest_processes')
    attempt = models.BooleanField(default=False)
    status = models.CharField(max_length=20,default=PENDING,choices=CONTEST_STATUS_CHOICES)
    rating = models.ForeignKey('appauth.Rating',on_delete=models.CASCADE,null=True,related_name='processes')
    rating_change = models.ForeignKey('appauth.Rating',on_delete=models.CASCADE,null=True,related_name='ch_processes')
    score = models.ForeignKey(Score,on_delete=models.PROTECT,null=True)
    rated_date = models.DateTimeField(null=True)
class Problem(models.Model):
    SINGLE = 'P'
    MULTIPLE = 'C'
    INTEGER = 'X'
    CONTEST_STATUS_CHOICES = [
        (SINGLE, 'Single option correct'),
        (MULTIPLE, 'Multiple options correct'),
        (INTEGER, 'Integer type question'),
        
    ]

    PHYSICS = 'P'
    CHEMISTRY = 'C'
    MATHS = 'M'
    QUESTION_TYPE_CHOICES = [
        (PHYSICS, 'Physics'),
        (CHEMISTRY, 'Chemistry'),
        (MATHS, 'Maths'),
        
    ]
    uuid = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    content = models.TextField()
    content_image = models.ImageField(null=True)
    problm_type = models.CharField(max_length=20)
    tags = models.ManyToManyField(Contestchip,related_name='problems')
    subject =  models.CharField(max_length=30,choices= QUESTION_TYPE_CHOICES)
    writer = models.ForeignKey(User, on_delete=models.PROTECT,related_name='written_problems')
    correct_integer = models.IntegerField(null=True,blank=True)

class Option(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    problem = models.ForeignKey(Problem,on_delete=models.CASCADE,related_name= 'options')
    is_correct = models.BooleanField()
    option_image = models.ImageField(null=True)


class Submission(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="submissions")
    contestprocess  = models.ForeignKey(Contestprocess,on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem,on_delete=models.CASCADE)
    options = models.ManyToManyField(Option)
    integer_content = models.IntegerField()
