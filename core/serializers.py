from rest_framework import serializers
from appauth.serializers import UserPreviewSerializer
from .models import Contest,Contestprocess
import datetime
class ContestPreviewSerializer(serializers.ModelSerializer):
    writers = UserPreviewSerializer(many=True)
    is_applied = serializers.SerializerMethodField()
    is_attempted = serializers.SerializerMethodField()
    
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
            'is_attempted'
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

   