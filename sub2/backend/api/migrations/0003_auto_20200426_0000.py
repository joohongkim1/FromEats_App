# Generated by Django 2.1 on 2020-04-25 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20200425_2352'),
    ]

    operations = [
        migrations.AddField(
            model_name='lifestyle',
            name='img_url',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='lifestyle',
            name='sub_lifestyle',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
