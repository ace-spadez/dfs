from django.urls import path
from .views import QuadregisterView,QuadContestsView,\
    QuadContestView,QuadContestProblemsView,QuadContestProblemView,\
        QuadSelfContests
urlpatterns=[
    path('quadregister/',QuadregisterView.as_view(),name='quadregister'),
    path('contests/',QuadContestsView.as_view(),name='quadcontests'),
    path('self/contests/',QuadSelfContests.as_view(),name='quadcontests'),
    path('contests/<uuid:contest_uuid>/',QuadContestView.as_view(),name='quadcontest'),
    path('contests/<uuid:contest_uuid>/problems/',QuadContestProblemsView.as_view(),name='quadcontestproblems'),
    path('contests/<uuid:contest_uuid>/problems/<uuid:problem_uuid>/',QuadContestProblemView.as_view(),name='quadcontestproblem'),
    # '/contests/<uuid:contest_uuid>/quadpply ## apply as writers
    # '/self/contests/' ## get your own contests

]