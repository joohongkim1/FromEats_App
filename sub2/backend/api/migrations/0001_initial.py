# Generated by Django 2.1 on 2020-04-23 05:03

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hour',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('oper_type', models.IntegerField(null=True)),
                ('week_type', models.IntegerField(null=True)),
                ('mon', models.BooleanField(default=False)),
                ('tue', models.BooleanField(default=False)),
                ('wed', models.BooleanField(default=False)),
                ('thu', models.BooleanField(default=False)),
                ('fri', models.BooleanField(default=False)),
                ('sat', models.BooleanField(default=False)),
                ('sun', models.BooleanField(default=False)),
                ('start_time', models.CharField(max_length=10, null=True)),
                ('end_time', models.CharField(max_length=10, null=True)),
                ('etc', models.CharField(max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='LifeStyle',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('store_name', models.CharField(max_length=50)),
                ('branch', models.CharField(max_length=20, null=True)),
                ('area', models.CharField(max_length=50, null=True)),
                ('tel', models.CharField(max_length=20, null=True)),
                ('address', models.CharField(max_length=200, null=True)),
                ('latitude', models.FloatField(max_length=10, null=True)),
                ('longitude', models.FloatField(max_length=10, null=True)),
                ('category', models.CharField(max_length=200, null=True)),
                ('review_cnt', models.FloatField(null=True)),
                ('big_cate', models.CharField(max_length=200, null=True)),
                ('mean_score', models.FloatField(null=True)),
                ('lifestyle', models.CharField(max_length=200, null=True)),
                ('ratio', models.FloatField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('menu_name', models.CharField(max_length=100, null=True)),
                ('price', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('num', models.IntegerField(null=True)),
                ('score', models.IntegerField(null=True)),
                ('content', models.TextField(null=True)),
                ('reg_time', models.DateTimeField(default=datetime.datetime.now, verbose_name='date published')),
            ],
        ),
        migrations.CreateModel(
            name='Review_user',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('gender', models.CharField(max_length=10, null=True)),
                ('born_year', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Store',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('store_name', models.CharField(max_length=50)),
                ('branch', models.CharField(max_length=20, null=True)),
                ('area', models.CharField(max_length=50, null=True)),
                ('tel', models.CharField(max_length=20, null=True)),
                ('address', models.CharField(max_length=200, null=True)),
                ('latitude', models.FloatField(max_length=10, null=True)),
                ('longitude', models.FloatField(max_length=10, null=True)),
                ('category', models.CharField(max_length=200, null=True)),
                ('review_cnt', models.FloatField(null=True)),
            ],
        ),
        migrations.AddField(
            model_name='review',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='api.Store'),
        ),
        migrations.AddField(
            model_name='review',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='api.Review_user'),
        ),
        migrations.AddField(
            model_name='menu',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='menus', to='api.Store'),
        ),
        migrations.AddField(
            model_name='lifestyle',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lifestyles', to='api.Store'),
        ),
        migrations.AddField(
            model_name='hour',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Store'),
        ),
    ]
