from rest_framework import serializers
from core.models import Contest,Contestchip
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
