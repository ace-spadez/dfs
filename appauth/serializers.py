from rest_framework import serializers
from .validators import check_email_taken, check_username_taken ,check_username_valid
from .models import User, Rating    , Watchfriend
from core.models import Contest, Contestprocess
class RegisterInfoCheckSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, validators=[
                                     check_username_taken, check_username_valid])
    password = serializers.CharField(required=True)
    email = serializers.EmailField(
        required=True, validators=[check_email_taken])

class LoginInfoCheckSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
class UserSerializer(serializers.ModelSerializer):
    rating = RatingSerializer()
    is_friend = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields =[
            'uuid',
            'username',
            'bio',
            'email',
            'date_joined',
            'rating',
            'experience',
            'tier',
            'profile_image',
            'is_friend',
        ]
    def get_is_friend(self,user):
        req_user = self.context['request'].user
        return user.is_friend(req_user)
class SelfSerializer(serializers.ModelSerializer):
    rating = RatingSerializer()
    class Meta:
        model = User
        fields =[
            'username',
            'bio',
            'email',
            'date_joined',
            'rating',
            'experience',
            'tier',
            'profile_image',
            'is_quadrant',
        ]
class SelfInfoCheckSerializer(serializers.Serializer):
    bio  = serializers.CharField(required=False)
    profile = serializers.ImageField(required=False)
class UserPreviewSerializer(serializers.ModelSerializer):
    rating = RatingSerializer()
    class Meta:
        model = User
        fields =[
            'uuid',
            'username',
            'rating',
            'experience',
            'tier',
            'profile_image',
        ]
class BooleanSerializer(serializers.Serializer):
    value = serializers.BooleanField(required=True)

# class ContestDateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Contest
#         fields = [
#             'name',
#             'target_date',
#             'duration'
#         ]

class RatingHistorySerializer(serializers.ModelSerializer):
    rating = RatingSerializer()
    rating_change = RatingSerializer()
    class Meta:
        model = Contestprocess
        fields = [
            'rating',
            'rating_change',
            'rated_date'
        ]
