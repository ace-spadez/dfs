from django.contrib import admin
from .models import User, Rating, Watchfriend
# Register your models here.
admin.site.register(User)
admin.site.register(Rating)
admin.site.register(Watchfriend)
