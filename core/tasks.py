import logging

from django.urls import reverse
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from rankr_server.celery import app
from rankr_server.settings import EMAIL_HOST_USER
from core.models import Contestprocess, Contest, Submission
from elo.elo_calc import update_ratings
from datetime import datetime
@app.task
def change_ratings(contest_id):
    contest = Contest.objects.get(pk=contest_id)
    contestprocesses = Contestprocess.objects.filter(contest=contest)
    diffInSeconds = (datetime.now() - contest.end_date).total_seconds
    if(abs(diffInSeconds)>100):
        return
    tot = []
    p = []
    c = []
    m = []
    for contestprocess in contestprocesses:
        tot_marks = contestprocess.get_total_marks()
        user_id = contestprocess.user.pk
        tot.append((contestprocess.user.pk,tot_marks,contestprocess.user.rating.r_all))
        p.append((contestprocess.user.pk,contestprocess.score.score_p,contestprocess.user.rating.r_p))
        c.append((contestprocess.user.pk,contestprocess.score.score_c,contestprocess.user.rating.r_c))
        m.append((contestprocess.user.pk,contestprocess.score.score_m,contestprocess.user.rating.r_m))
    tot_ans = update_ratings(tot)
    for entry in tot_ans:
        new_r = entry[1]
        user = user.objects.get(pk=entry[0]).first()
        user.r_all = new_r
        rating_change = new_r - user.rating.r_all
        contestprocess = Contestprocess.objects.get(user=user, contest=contest).first()
        contestprocess.rating_change.r_all = rating_change
        contestprocess.rating.r_all = new_r
        user.save()
        contestprocess.save()
    tot_ans = update_ratings(p)
    for entry in tot_ans:
        new_r = entry[1]
        user = user.objects.get(pk=entry[0]).first()
        user.r_p = new_r
        rating_change = new_r - user.rating.r_p
        contestprocess = Contestprocess.objects.get(user=user, contest=contest).first()
        contestprocess.rating_change.r_p = rating_change
        contestprocess.rating.r_p = new_r
        user.save()
        contestprocess.save()

    tot_ans = update_ratings(c)
    for entry in tot_ans:
        new_r = entry[1]
        user = user.objects.get(pk=entry[0]).first()
        user.r_c = new_r
        rating_change = new_r - user.rating.r_c
        contestprocess = Contestprocess.objects.get(user=user, contest=contest).first()
        contestprocess.rating_change.r_c = rating_change
        contestprocess.rating.r_c = new_r
        user.save()
        contestprocess.save()

    tot_ans = update_ratings(m)
    for entry in tot_ans:
        new_r = entry[1]
        user = user.objects.get(pk=entry[0]).first()
        user.r_m = new_r
        rating_change = new_r - user.rating.r_m
        contestprocess = Contestprocess.objects.get(user=user, contest=contest).first()
        contestprocess.rating_change.r_m = rating_change
        contestprocess.rating.r_m = new_r
        user.save()
        contestprocess.save()


     
