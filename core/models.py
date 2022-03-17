from django.db import models
from appauth.models import User
import uuid
from datetime import datetime
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
    PROPOSED = 'P'
    ACCEPTED = 'A'
    DEAD = 'D'
    CONTEST_STATUS_CHOICES = [
        (PROPOSED,'Proposed'),
        (ACCEPTED, 'Accepted'),
        (DEAD, 'Over'),        
    ]
    name = models.CharField(max_length=30)
    date_created = models.DateTimeField(auto_now_add=True)
    target_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.IntegerField()
    contest_type = models.CharField(max_length=30,choices=CONTEST_TYPE_CHOICES)
    contest_difficulty = models.CharField(max_length=30,choices = CONTEST_DIFFICULTY_CHOICES)
    # writers= models.ManyToManyField(User,related_name='written_contests')
    description = models.TextField()
    contest_chips = models.ManyToManyField(Contestchip,related_name='contests')
    contest_status = models.CharField(max_length=10,choices=CONTEST_STATUS_CHOICES,default=PROPOSED)
    def status(self):
        td =self.target_date
        ed = self.end_date
        dt =timezone.now()+timezone.timedelta(hours=5,minutes=30)
        print("ed",ed)
        print("td",td)
        print("dt",dt)
        if dt<td:
            return 'Pending'
        elif dt<ed:
            return 'Active'
        else:
            return 'Passed'
    def update(self, **kwargs):
        for field, value in kwargs.items():
            setattr(self, field, value)
        self.save(update_fields=kwargs.keys())
        return self
    def  __str__(self):
        return self.name
class Score(models.Model):
    uuid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    score_all = models.IntegerField(null=True,blank=True)
    score_m = models.IntegerField(null=True,blank=True)
    score_p = models.IntegerField(null=True,blank=True)
    score_c = models.IntegerField(null=True,blank=True)

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
    rated_date = models.DateTimeField(null=True,blank=True)
    def get_total_marks(self):
        sum = 0
        sum_p = 0
        sum_c = 0
        sum_m = 0
        for submission in self.submissions:
            sum += submission.get_marks()
            if submission.problem.subject == Problem.PHYSICS:
                sum_p+=submission.get_marks()
            elif submission.problem.subject == Problem.CHEMISTRY:
                sum_c+=submission.get_marks()
            elif submission.problem.subject == Problem.MATHS:
                sum_m+=submission.get_marks()

        self.score.score_all = sum
        self.score.score_p = sum_p
        self.score.score_c = sum_c
        self.score.score_m = sum_m
        self.score.save()
        return sum
    def __str__(self):
        return self.user.username+" "+self.contest.name

class Problem(models.Model):
    SINGLE = 'S'
    MULTIPLE = 'M'
    INTEGER = 'I'
    QUESTION_TYPE_CHOICES = [
        (SINGLE, 'Single option correct'),
        (MULTIPLE, 'Multiple options correct'),
        (INTEGER, 'Integer type question'),
        
    ]

    PHYSICS = 'P'
    CHEMISTRY = 'C'
    MATHS = 'M'
    QUESTION_SUBJECT_CHOICES = [
        (PHYSICS, 'Physics'),
        (CHEMISTRY, 'Chemistry'),
        (MATHS, 'Maths'),
        
    ]
    uuid = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    content = models.TextField()
    content_image = models.ImageField(null=True,blank=True)
    problem_type = models.CharField(max_length=20,choices=QUESTION_TYPE_CHOICES)
    tags = models.ManyToManyField(Contestchip,related_name='problems')
    subject =  models.CharField(max_length=30,choices= QUESTION_SUBJECT_CHOICES)
    writer = models.ForeignKey(User, on_delete=models.PROTECT,related_name='written_problems')
    correct_integer = models.IntegerField(null=True,blank=True)
    contest = models.ForeignKey(Contest, on_delete=models.PROTECT,related_name='problems')
    def update(self, **kwargs):
        for field, value in kwargs.items():
            setattr(self, field, value)
        self.save(update_fields=kwargs.keys())
        return self
    def __str__(self):
        return f"{self.contest.name} {self.subject} {self.problem_type}"
class Option(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    problem = models.ForeignKey(Problem,on_delete=models.CASCADE,related_name= 'options')
    is_correct = models.BooleanField(default=False)
    option_image = models.ImageField(null=True,blank=True)
    content = models.TextField(null=True,blank=True)
    def update(self, **kwargs):
        for field, value in kwargs.items():
            setattr(self, field, value)
        self.save(update_fields=kwargs.keys())
        return self


class Submission(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="submissions")
    contestprocess  = models.ForeignKey(Contestprocess,on_delete=models.CASCADE, related_name="submissions")
    problem = models.ForeignKey(Problem,on_delete=models.CASCADE,related_name='submissions')
    options = models.ManyToManyField(Option,null=True)
    integer_content = models.IntegerField(null=True)

    def get_marks(self):
        if self.problem.problem_type == Problem.INTEGER:
            if self.integer_content == self.problem.correct_integer:
                return 3
            else:
                return -1
        if self.problem.problem_type == Problem.SINGLE:
            if len(self.options)==0:
                return 0
            if len(self.options)>1:
                return -1
            option = self.options.first()
            if option.is_correct:
                return 3
            else:
                return -1
        elif self.problem.problem_type == Problem.MULTIPLE:
            if len(self.options)==0:
                return 0
            sum = 0
            for option in self.options:
                if not option.is_correct:
                    return -2
                else:
                    sum+=1
            return sum
        return 0
