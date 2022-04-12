from rest_framework import serializers
from appauth.serializers import UserPreviewSerializer, RatingSerializer
from .models import Contest, Contestprocess, Problem, Option,\
    Submission, Score
from django.utils import timezone
from appauth.models import User

import pytz


class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = '__all__'


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = [
            'uuid',
            'content',
            'option_image'
        ]

class AnswerOptionSerializer(serializers.Serializer):
    uuid = serializers.UUIDField(required=True)


class OptionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = [
            'uuid',
            'is_correct',
            'content',
            'option_image'
        ]


class AnswerModelSerializer(serializers.ModelSerializer):
    options = AnswerOptionSerializer(many=True, required=False)

    class Meta:
        model = Submission
        fields = [
            'uuid',
            'options',
            'integer_content'
        ]

class ProblemSerializer(serializers.ModelSerializer):
    writer = UserPreviewSerializer()
    options = OptionSerializer(many=True)
    submission = serializers.SerializerMethodField()
    class Meta:
        model = Problem
        fields = [
            'uuid',
            'content',
            'content_image',
            'problem_type',
            'subject',
            'writer',
            'contest',
            'options',
            'submission'
        ]

    def get_submission(self, problem):
        user = self.context['request'].user
        if Submission.objects.filter(problem=problem, user=user).exists():
            submission = Submission.objects.get(problem=problem, user=user)
            return AnswerModelSerializer(submission).data
        return None




class AnswerSerializer(serializers.Serializer):
    options = AnswerOptionSerializer(many=True, required=False)
    integer_content = serializers.IntegerField(required=False)


class XProblemSerializer(serializers.ModelSerializer):
    writer = UserPreviewSerializer()
    options = OptionModelSerializer(many=True)
    submission = serializers.SerializerMethodField()

    class Meta:
        model = Problem
        fields = [
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

    def get_submission(self, problem):
        user = self.context['request'].user
        if Submission.objects.filter(problem=problem, user=user).exists():
            submission = Submission.objects.get(problem=problem, user=user)
            return AnswerModelSerializer(submission).data
        return None


class StandingsModelSerializer(serializers.ModelSerializer):
    user = UserPreviewSerializer()
    rating = RatingSerializer()
    rating_change = RatingSerializer()
    score = ScoreSerializer()
    class Meta:
        model = Contestprocess
        fields = [
            'user',
            'rating',
            'rating_change',
            'score',
            'rated_date',
            'status',
        ]
class ContestPreviewSerializer(serializers.ModelSerializer):
    writers = serializers.SerializerMethodField()
    is_applied = serializers.SerializerMethodField()
    is_attempted = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    question_count = serializers.SerializerMethodField()
    # authors = serializers.SerializerMethodField()
    attempt = serializers.SerializerMethodField()
    contest_process = serializers.SerializerMethodField()
    class Meta:
        model = Contest
        fields = [
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
            'is_attempted',
            'status',
            'question_count',
            'attempt',
            'contest_process'
            
            # 'authors'
        ]
    def get_contest_process(self,contest):
        user = self.context['request'].user

        if Contestprocess.objects.filter(user=user,contest=contest).exists():
            contest_process = Contestprocess.objects.get(user=user,contest=contest)
            return StandingsModelSerializer(contest_process).data
        return None

    def get_attempt(self,contest):
        user = self.context['request'].user
        if Contestprocess.objects.filter(user=user,contest=contest).exists():
            contest_process = Contestprocess.objects.get(user=user,contest=contest)
            if contest_process.attempt:
                return True
        return False
    def get_writers(self, contest):
        users = User.objects.filter(
            quadapplications__contest=contest, quadapplications__is_accepted=True)
        return UserPreviewSerializer(users, many=True).data

    def get_is_applied(self, contest):
        user = self.context['request'].user
        if Contestprocess.objects.filter(user=user, contest=contest).exists():
            return True
        return False

    def get_is_attempted(self, contest):
        user = self.context['request'].user
        if Contestprocess.objects.filter(user=user, attempt=True).exists():
            return True
        return False

    def get_question_count(self, contest):
        return contest.problems.count()

    def get_status(self, contest):
        return contest.status()
