# Generated by Django 5.1.1 on 2024-09-20 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='is_seller',
            field=models.BooleanField(default=False),
        ),
    ]