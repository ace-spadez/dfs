from django.contrib import admin
from django.db import models
from .models import  Contest,Problem,Contestprocess,Contestchip,Option,Submission,Score
# Register your models here.


admin.site.register(Contest)
admin.site.register(Problem)
admin.site.register(Contestprocess )
admin.site.register(Contestchip)
admin.site.register(Option)
admin.site.register(Submission)
admin.site.register(Score)
