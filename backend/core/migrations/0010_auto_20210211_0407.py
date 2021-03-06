# Generated by Django 3.1.6 on 2021-02-11 04:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_auto_20210210_1827'),
    ]

    operations = [
        migrations.AddField(
            model_name='option',
            name='content',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='problem',
            name='contest',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='problems', to='core.contest'),
        ),
    ]
