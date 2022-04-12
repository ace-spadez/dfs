# Generated by Django 3.1.6 on 2021-02-10 16:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20210210_1600'),
    ]

    operations = [
        migrations.AddField(
            model_name='contest',
            name='end_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 2, 10, 16, 54, 1, 861343)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='contestprocess',
            name='attempt',
            field=models.BooleanField(default=False),
        ),
    ]
