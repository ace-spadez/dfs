from django.urls import path
from .views import QuadregisterView,QuadContestsView
urlpatterns=[
    path('quadregister/',QuadregisterView.as_view(),name='quadregister'),
    path('contests/',QuadContestsView.as_view(),name='quadcontests')
    # '/contests/<uuid:contest_uuid>/quadpply ## apply as writers
    # '/contests/' ## get list of all the open contests and post to propose a contest
    # '/contests/<uuid:contest_uuid>/problems/' ## get all the problems and post to add a problem(only if you are accepted as a writer)
    # '/contests/<uuid:contest_uuid>/problems/<uuid:problem_uuid>/' ##get, patch, delete the problems
    # '/self/contests/' ## get your own contests

]