from rest_framework import permissions
from appauth.models import User

class IsPostGeneral (permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        
        if user.is_quadrant:
            return True
        return False
