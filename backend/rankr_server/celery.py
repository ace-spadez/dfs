import os
from celery import Celery
 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rankr_server.settings')
 
app = Celery('rankr_server')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
