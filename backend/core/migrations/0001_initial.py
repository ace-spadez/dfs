# Generated by Django 3.1.6 on 2021-02-10 08:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Contest',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=30)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('target_date', models.DateTimeField()),
                ('duration', models.IntegerField()),
                ('contest_type', models.CharField(choices=[('F', 'Full Course'), ('P', 'Physics'), ('C', 'Chemistry'), ('M', 'Maths')], max_length=30)),
                ('contest_difficulty', models.CharField(choices=[('MX', 'Mixed difficulty'), ('MN', 'Mains level'), ('AV', 'Advanced level'), ('XA', 'Extra advanced level')], max_length=30)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Contestchips',
            fields=[
                ('name', models.CharField(max_length=20, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Contestprocess',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
                ('status', models.CharField(choices=[('P', 'Applied'), ('C', 'Contest going on'), ('X', 'Contest over')], default='P', max_length=20)),
                ('contest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contest_processes', to='core.contest')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contest_processes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Option',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
                ('is_correct', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
                ('content', models.TextField()),
                ('content_image', models.ImageField(upload_to='')),
                ('problm_type', models.CharField(max_length=20)),
                ('subject', models.CharField(choices=[('P', 'Physics'), ('C', 'Chemistry'), ('M', 'Maths')], max_length=30)),
                ('correct_integer', models.IntegerField(blank=True, null=True)),
                ('tags', models.ManyToManyField(related_name='problems', to='core.Contestchips')),
                ('writer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='written_problems', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Submission',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
                ('integer_content', models.IntegerField()),
                ('contestprocess', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.contestprocess')),
                ('options', models.ManyToManyField(to='core.Option')),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.problem')),
            ],
        ),
        migrations.AddField(
            model_name='option',
            name='problem',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='options', to='core.problem'),
        ),
        migrations.AddField(
            model_name='contest',
            name='contest_chips',
            field=models.ManyToManyField(related_name='contests', to='core.Contestchips'),
        ),
        migrations.AddField(
            model_name='contest',
            name='writers',
            field=models.ManyToManyField(related_name='written_contests', to=settings.AUTH_USER_MODEL),
        ),
    ]
