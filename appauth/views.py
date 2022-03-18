from django.shortcuts import render, get_object_or_404
from rest_framework import views, status, response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth import get_user_model, authenticate
from rest_framework.pagination import PageNumberPagination
from rest_framework.authtoken.models import Token
from django.db import transaction
from .serializers import RegisterInfoCheckSerializer,\
     LoginInfoCheckSerializer, UserSerializer,\
          UserPreviewSerializer, BooleanSerializer,\
               SelfInfoCheckSerializer, SelfSerializer, RatingHistorySerializer
# Create your views here.
from .models import User, Rating, Watchfriend
from core.models import Contest, Contestprocess
from django.core.management.utils import get_random_secret_key
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from rankr_server.settings import EMAIL_HOST_USER
from appauth.tasks import send_verification_email

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
            username=username, email=email, password=password, rating=rating,secret_key=get_random_string(length=64))

        new_user.save()
        send_verification_email.delay(new_user.pk)

        # token, _ = Token.objects.get_or_create(user=new_user)

        return response.Response(
            {
                'message':'Registered. Check your email to verify',
                'username': new_user.username
            },
            status=status.HTTP_201_CREATED)

    # def get(self, request):
    #     key = data['check']

    #     User = get_user_model()
    #     user = User.objects.filter(secret_key=key).first()
    #     if user is None:
    #         return response.Response({'message': 'Wrong link'}, status=status.HTTP_400_BAD_REQUEST)
    #     user.isVerified = True
    #     user.save()

    #     # token, _ = Token.objects.get_or_create(user=new_user)

    #     return response.Response(
    #         {
    #             'message':'Verified. Please login',
    #             'username': new_user.username
    #         },
    #         status=status.HTTP_201_CREATED)



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
            if user.isVerified==False:
                return response.Response({'message':'verify your email'},status=status.HTTP_403_FORBIDDEN)
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
    permission_classes = [IsAuthenticated, ]

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
        
class UsersPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    max_page_size = 20
    page_size = 15

    #limit and page

class UsersView(views.APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        search = request.GET.get('search','')
        
        queryset = User.objects.filter(username__contains=search)
        paginator = UsersPagination()
        page = paginator.paginate_queryset(queryset, request)
        serializer = UserPreviewSerializer(
            page, many=True, context={'request': request})

        return response.Response(
            {
                "message": "All the users",
                "body": serializer.data,
                "pages": paginator.page.paginator.num_pages,
                "page": paginator.page.number
            },
            status=status.HTTP_200_OK
        )

class VerifyEmail(views.APIView):
    def get(self,request,secret_key):
        user = User.objects.get(secret_key=secret_key)
        user.isVerified = True
        user.save()

        token, _ = Token.objects.get_or_create(user=user)

        return response.Response(
            {
                "message": "Verified User",
                'token':token.key,
                'username':user.username
            },
            status=status.HTTP_200_OK
        )
class GeneralStandingsPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    max_page_size = 20
    page_size = 15
class GeneralStandingsView(views.APIView):
    permission_classes = [IsAuthenticated, ]
    def get(self,request):
        subject = request.GET.get('subject',None)
        users = None
        if subject==None:
            users = User.objects.all().order_by('-rating__r_all')
        else:
            if subject=='p':
                users = User.objects.all().order_by('-rating__r_p')
            elif subject=='m':
                users = User.objects.all().order_by('-rating__r_m')
            elif subject=='c':
                users = User.objects.all().order_by('-rating__r_c')
            else:
                users = users.objects.all().order_by('-rating__r_all')

        
        paginator =GeneralStandingsPagination()
        page = paginator.paginate_queryset(users, request)
        serializer =UserPreviewSerializer(page,many=True,context={'request':request})
        print(serializer.data)
        return response.Response(
            {
                "message": "All the standings",
                "body": serializer.data,
                "pages": paginator.page.paginator.num_pages,
                "page": paginator.page.number
            },
            status=status.HTTP_200_OK
        )
       
        

