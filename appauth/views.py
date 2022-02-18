from django.shortcuts import render, get_object_or_404
from rest_framework import views, status, response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth import get_user_model, authenticate
from rest_framework.authtoken.models import Token
from django.db import transaction
from .serializers import RegisterInfoCheckSerializer,\
     LoginInfoCheckSerializer, UserSerializer,\
          UserPreviewSerializer, BooleanSerializer,\
               SelfInfoCheckSerializer, SelfSerializer, RatingHistorySerializer
# Create your views here.
from .models import User, Rating, Watchfriend
from core.models import Contest, Contestprocess

class RegisterView(views.APIView):
    def post(self, request):
        register_serializer = RegisterInfoCheckSerializer(data=request.data)
        register_serializer.is_valid(raise_exception=True)

        data = register_serializer.validated_data
        username = data['username']
        password = data['password']
        email = data['email']

        User = get_user_model()
        rating = Rating()
        rating.save()
        new_user = User.objects.create_user(
            username=username, email=email, password=password, rating=rating)

        new_user.save()

        token, _ = Token.objects.get_or_create(user=new_user)

        return response.Response(
            {
                'token': token.key,
                'username': new_user.username
            },
            status=status.HTTP_201_CREATED)


class LoginView(views.APIView):
    def post(self, request):
        login_serializer = LoginInfoCheckSerializer(data=request.data)
        login_serializer.is_valid(raise_exception=True)

        data = login_serializer.validated_data

        username = data['username']
        password = data['password']
        with transaction.atomic():
            user = authenticate(username=username, password=password)
        if user is None:
            return response.Response({'error': 'authentication falied'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            token, _ = Token.objects.get_or_create(user=user)
            return response.Response({
                'token': token.key,
            }, status=status.HTTP_200_OK)


class LogOutView(views.APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        request.user.auth_token.delete()
        return response.Response({"messagge": "Logged Out"}, status=status.HTTP_200_OK)


class UserView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request, username):
        owner = User.objects.get(username=username)
        serializer = UserSerializer(owner, context={'request': request})

        return response.Response(
            {
                "message": "Succesfully retrieved user",
                "body": serializer.data
            },
            status=status.HTTP_200_OK
        )


class FriendsView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user = request.user
        queryset = user.get_friends()
        serializer = UserPreviewSerializer(queryset, many=True)

        return response.Response(
            {
                "message": "Succesfully retrieved friends",
                "body": serializer.data
            },
            status=status.HTTP_200_OK
        )
    # def post(self,request):


class FriendView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request, username):
        user = request.user
        serializer = BooleanSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        value = data['value']
        watchee = User.objects.get(username=username)
        if value:
            Watchfriend.objects.get_or_create(watcher=user, watchee=watchee)
        else:
            Watchfriend .objects.filter(watcher=user, watchee=watchee).delete()

        return response.Response(
            {
                "message": f"Succesfully {'added' if value==True else 'removed'} friends",
            },
            status=status.HTTP_200_OK
        )


class SelfView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user = request.user
        serializer = SelfSerializer(user, context={'request': request})

        return response.Response(
            {
                "message": "Succesfully retrieved user",
                "body": serializer.data
            },
            status=status.HTTP_200_OK
        )
    def post(self,request):
        user = request.user
        serializer = SelfInfoCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data  

        user.update(**data)  


        serializer = SelfSerializer(user, context={'request': request})

        return response.Response( {
                "message": "Succesfully updated user",
                "body": serializer.data
            },
            status=status.HTTP_200_OK)

class RatingsHistoryView(views.APIView):
    def get(self,request,username):
        user = get_object_or_404(User,username=username)
        queryset = Contestprocess.objects.filter(user=user,status=Contestprocess.PASSED)
        serializer = RatingHistorySerializer(queryset,many=True)

        return response.Response(
            {
                "message": "Succesfully retrieved ratings",
                "body": serializer.data
            },
            status=status.HTTP_200_OK
        )
