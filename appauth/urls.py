from .views import RegisterView, LoginView,LogOutView,\
    UserView,FriendsView,FriendView, SelfView,\
         RatingsHistoryView, UsersView, VerifyEmail,GeneralStandingsView
from django.urls import path

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/',LogOutView.as_view(), name='logout'),
    path('users/',UsersView.as_view(), name='users'),
    path('users/<str:username>/',UserView.as_view(), name='user'),
    path('self/',SelfView.as_view(), name='self'),
    path('users/<str:username>/ratings/',RatingsHistoryView.as_view(), name='self'),
    path('friends/',FriendsView.as_view(), name='friends'),
    path('friends/<str:username>/',FriendView.as_view(), name='friend'),
    path('verify/<str:secret_key>',VerifyEmail.as_view(),name='verify'),
    path('standings/',GeneralStandingsView.as_view(),name='general_standings')
    
]
