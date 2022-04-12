from django.urls import path
from .views import QuadregisterView,QuadContestsView,\
    QuadContestView,QuadContestProblemsView,QuadContestProblemView,\
        QuadSelfContests,QuadContestApply
urlpatterns=[
    path('quadregister/',QuadregisterView.as_view(),name='quadregister'),
    path('contests/',QuadContestsView.as_view(),name='quadcontests'),
    path('self/contests/',QuadSelfContests.as_view(),name='quadcontests'),
    path('contests/<uuid:contest_uuid>/',QuadContestView.as_view(),name='quadcontest'),
    path('contests/<uuid:contest_uuid>/problems/',QuadContestProblemsView.as_view(),name='quadcontestproblems'),
    path('contests/<uuid:contest_uuid>/problems/<uuid:problem_uuid>/',QuadContestProblemView.as_view(),name='quadcontestproblem'),
    path('contests/<uuid:contest_uuid>/apply/',QuadContestApply.as_view(),name='quadcontestapply'),
    # '/self/contests/' ## get your own contests

]