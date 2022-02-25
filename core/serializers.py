from rest_framework import serializers
from appauth.serializers import UserPreviewSerializer
from .models import Contest,Contestprocess,Problem,Option,\
    Submission
import datetime
from django.utils import timezone

import pytz
class ContestPreviewSerializer(serializers.ModelSerializer):
    writers = UserPreviewSerializer(many=True)
    is_applied = serializers.SerializerMethodField()
    is_attempted = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    
    class Meta:
        model = Contest
        fields  =[
            'uuid',
            'name',
            'date_created',
            'target_date',
            'duration',
            'contest_type',
            'contest_difficulty',
            'writers',
            'description',
            'contest_chips',
            'is_applied',
            'is_attempted',
            'status',
        ]
    def get_is_applied(self,contest):
        user =  self.context['request'].user
        if Contestprocess.objects.filter(user=user).exists():
            return True
        return False
    def get_is_attempted(self,contest):
        user =  self.context['request'].user
        if Contestprocess.objects.filter(user=user,attempt=True).exists():
            return True
        return False
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
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model =Option
        fields = [
            'uuid',
            'content',
            'option_image'
        ]
class ProblemSerializer(serializers.ModelSerializer):
    writer = UserPreviewSerializer()
    options = OptionSerializer(many=True)
    class Meta:
        model = Problem
        fields=[
            'uuid',
            'content',
            'content_image',
            'problem_type',
            'tags',
            'subject',
            'writer',
            'contest',
            'options'
        ]

class AnswerOptionSerializer(serializers.Serializer ):
    uuid = serializers.UUIDField(required=True)
class OptionModelSerializer(serializers.ModelSerializer ):
    class Meta:
        model = Option
        fields = [
            'uuid',
            'is_correct',
            'content',
            'option_image'
        ]
class AnswerModelSerializer(serializers.ModelSerializer):
    options = AnswerOptionSerializer(many=True,required=False)
 
    class Meta:
        model = Submission
        fields = [
            'uuid',
            'options',
            'integer_content'
        ] 

class AnswerSerializer(serializers.Serializer):
    options = AnswerOptionSerializer(many=True,required=False)
    integer_content =serializers.IntegerField(required=False)

class XProblemSerializer(serializers.ModelSerializer):
    writer = UserPreviewSerializer()
    options = OptionModelSerializer(many=True)
    submission = serializers.SerializerMethodField()
    class Meta:
        model = Problem
        fields=[
            'uuid',
            'content',
            'content_image',
            'problem_type',
            'tags',
            'subject',
            'writer',
            'contest',
            'options',
            'correct_integer',
            'submission'

        ]
    def get_submission(self,problem):
        user = self.context['request'].user
        if Submission.objects.filter(problem=problem,user=user).exists():
            submission = Submission.objects.get(problem=problem,user=user)
            return AnswerModelSerializer(submission).data
        return None

class StandingsModelSerializer(serializers.ModelSerializer):
    user = UserPreviewSerializer()
    class Meta:
        model = Contestprocess
        fields = [
            'user',
            'rating',
            'rating_change',
            'score',
            'rated_date'
        ]