from django.db.models.signals import post_save
from django.dispatch import receiver
from core.models import Contest
from core.tasks import change_ratings
from datetime import datetime, timedelta
from elo.elo_calc import update_ratings
@receiver(post_save, sender=Contest)
def contest(sender, instance, **kwargs):
    print("Detected signal")
    if instance.status()  != "Pending":
        return
    print("In da thank")
    #change_ratings.apply_async((instance.pk, instance.end_date.timestamp()),eta=instance.end_date)

