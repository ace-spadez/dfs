from rest_framework import serializers
from core.models import Contest,Contestchip,Problem
from core.serializers import OptionModelSerializer
from appauth.serializers import UserPreviewSerializer
from appauth.models import User
from .models import QuadContestApplication
import pytz
from django.utils import timezone
class QuadRegisterInfoCheckSerializer(serializers.Serializer):
    SOP = serializers.CharField(required=True)
class ContestChipSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
class QuadContestInfoCheckSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    target_date = serializers.DateTimeField(required=True)
    end_date = serializers.DateTimeField(required=True)
    duration = serializers.IntegerField(required=True)
    contest_type = serializers.ChoiceField(required=True,choices=Contest.CONTEST_TYPE_CHOICES)
    contest_difficulty = serializers.ChoiceField(choices=Contest.CONTEST_DIFFICULTY_CHOICES,required=True)
    description = serializers.CharField(required=True)
    contest_chips = ContestChipSerializer(many=True,required=False)
class QuadContestPatchInfoCheckSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    target_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    duration = serializers.IntegerField(required=False)
    contest_type = serializers.ChoiceField(required=False,choices=Contest.CONTEST_TYPE_CHOICES)
    contest_difficulty = serializers.ChoiceField(choices=Contest.CONTEST_DIFFICULTY_CHOICES,required=False)
    description = serializers.CharField(required=False)
    contest_chips = ContestChipSerializer(many=True,required=False)
class QuadProblemSerializer(serializers.ModelSerializer):
    options = OptionModelSerializer(many=True)
    writer = UserPreviewSerializer()
    class Meta:
        model = Problem
        fields =[
            'uuid',
            'content',
            'problem_type',
            'content_image',
            'tags',
            'writer',
            'correct_integer',
            'contest',
            'options',

            ##
            'training_data',
            'test_data'
            ##
        ]
class QuadTagSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
class QuadOptionCheckSerializer(serializers.Serializer):
    is_correct = serializers.BooleanField(required=True)
    option_image = serializers.ImageField(required=False)
    content = serializers.CharField(required=True)
class QuadProblemInfoCheckSerializer(serializers.Serializer):
    content = serializers.CharField(required=True)
    content_image = serializers.ImageField(required=False)
    problem_type = serializers.ChoiceField(choices=Problem.QUESTION_TYPE_CHOICES)
    subject =  serializers.ChoiceField(choices=Problem.QUESTION_SUBJECT_CHOICES)
    correct_integer = serializers.IntegerField(required=False)
    options = QuadOptionCheckSerializer(many=True,required=False)
    tags = QuadTagSerializer(many=True,required=False)

# #### MLCHLGR
#     training_data = serializers.FileField(required=False)
#     test_data = serializers.FileField(required=False)
##EOF
class QuadProblemInfoCheckPickleSerializer(serializers.Serializer):
    #### MLCHLGR
    training_data = serializers.FileField(required=False)
    test_data = serializers.FileField(required=False)
##EOF

class QuadOptionPatchSerializer(serializers.Serializer):
    uuid = serializers.UUIDField(required=True)
    is_correct = serializers.BooleanField(required=False)
    option_image = serializers.ImageField(required=False)
    content = serializers.CharField(required=False)
class QuadOptionUUIDSerializer(serializers.Serializer):
    uuid = serializers.UUIDField(required=True)
class QuadProblemPatchSerializer(serializers.Serializer):
    content = serializers.CharField(required=False)
    content_image = serializers.ImageField(required=False)
    subject =  serializers.ChoiceField(choices=Problem.QUESTION_SUBJECT_CHOICES,required=False)
    correct_integer = serializers.IntegerField(required=False)

    new_options = QuadOptionCheckSerializer(many=True,required=False)
    patch_options = QuadOptionPatchSerializer(many=True,required=False)
    delete_options = QuadOptionUUIDSerializer(many=True,required=False)

    tags = QuadTagSerializer(many=True,required=False)

#### MLCHLGR
    training_data = serializers.FileField(required=False)
    test_data = serializers.FileField(required=False)
##EOF
class QuadContestPreviewSerializer(serializers.ModelSerializer):
    writers = serializers.SerializerMethodField()
    is_applied = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    question_count = serializers.SerializerMethodField()
    is_attempted = serializers.SerializerMethodField()
    class Meta:
        model = Contest
        fields  =[
            'uuid',
            'name',
            'contest_status',
            'date_created',
            'target_date',
            'end_date',
            'duration',
            'contest_type',
            'contest_difficulty',
            'writers',
            'description',
            'contest_chips',
            'is_applied',
            'status',
            'question_count',
            'is_attempted'
        ]
    def get_writers(self,contest):
        users = User.objects.filter(quadapplications__contest=contest,quadapplications__is_accepted=True)
        return UserPreviewSerializer(users,many=True).data
    
    def get_is_applied(self,contest):
        user =  self.context['request'].user
        if QuadContestApplication.objects.filter(user=user,contest=contest).exists():
            return True
        return False
    def get_is_attempted(self,contest):
        user =  self.context['request'].user
        if QuadContestApplication.objects.filter(user=user,contest=contest,is_accepted=True).exists():
            return True
        return False
    def get_question_count(self,contest):
        return contest.problems.count()
    def get_status(self,contest):
        utc=pytz.UTC
        td =contest.target_date
        ed = contest.end_date
        dt =timezone.now()
        if dt<td:
            return 'Pending'
        elif dt<ed:
            return 'Active'
        else:
            return 'Passed'
