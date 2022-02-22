
from django.urls import path
from .views  import ContestsView,ApplyContest,ContestView,AttemptContest  
urlpatterns = [
    path('contests/',ContestsView.as_view(), name='contests'), #send constests with details like if user has appplied/given exam or not, sorted  by date
    path('contests/<uuid:contest_uuid>/',ContestView.as_view(), name='contest'),
    # path('contests/<uuid:contest_uuid>/problems/',)
    # path('contests/<uuid:contest_uuid>/problems/<uuid:problem_uuid>',)
    # path('contests/<uuid:contest_uuid>/problems/<uuid:problem_uuid>/answer',)
    # path('contests/<uuid:contest_uuid>/submissions/')
    # path('contests/<uuid:contest_uuid>/standings') #depending on the score in contestproceess
    path('contests/<uuid:contest_uuid>/apply/',ApplyContest.as_view(),name='applycontest'), #create a  conteestprocess with status=Pending
    path('contests/<uuid:contest_uuid>/attempt/',AttemptContest.as_view(),name='attemptcontest'), #create a  conteestprocess with status=Pending
    # path()
    #   
]
