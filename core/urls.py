
from django.urls import path
from .views  import ContestsView,ApplyContest,ContestView,AttemptContest,ProblemsView,\
    ProblemView,AnswerView, SubmissionsView,StandingsView
urlpatterns = [
    path('contests/',ContestsView.as_view(), name='contests'), #send constests with details like if user has appplied/given exam or not, sorted  by date
    path('contests/<uuid:contest_uuid>/',ContestView.as_view(), name='contest'),
    path('contests/<uuid:contest_uuid>/problems/',ProblemsView.as_view(),name='problems'), ## Problems with options
    path('contests/<uuid:contest_uuid>/problems/<uuid:problem_uuid>/',ProblemView.as_view(),name='problems'), ## Problems with options
    path('contests/<uuid:contest_uuid>/problems/<uuid:problem_uuid>/answer/',AnswerView.as_view(),name='answer'), ## Post endpoint for submitting answer.
    path('contests/<uuid:contest_uuid>/submissions/',SubmissionsView.as_view(),name='submissions'),
    path('contests/<uuid:contest_uuid>/standings/',StandingsView.as_view(),name='contest_standings'), #depending on the score in contestproceess
    path('contests/<uuid:contest_uuid>/apply/',ApplyContest.as_view(),name='applycontest'), #create a  conteestprocess with status=Pending
    path('contests/<uuid:contest_uuid>/attempt/',AttemptContest.as_view(),name='attemptcontest'), #create a  conteestprocess with status=Pending
    
]
