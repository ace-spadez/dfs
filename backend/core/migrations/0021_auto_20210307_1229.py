# Generated by Django 3.1.6 on 2021-03-07 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0020_auto_20210214_0511'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contestprocess',
            name='rated_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='score',
            name='score_all',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='score',
            name='score_c',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='score',
            name='score_m',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='score',
            name='score_p',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]