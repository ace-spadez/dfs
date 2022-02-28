from rest_framework import permissions
from appauth.models import User
from core.models import Contest
class IsQuadrant (permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        
        if user.is_quadrant:
            return True
        return False

class IsWriter(permissions.BasePermission):
    def has_permission(self,request,view):
        user = request.user
        contest_uuid = view.kwargs['contest_uuid']
        contest = Contest.objects.get(uuid=contest_uuid)
        if user in contest.writers.all():
            return True
        return False