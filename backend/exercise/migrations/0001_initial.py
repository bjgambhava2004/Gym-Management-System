# Generated by Django 5.1.1 on 2024-09-23 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('uses', models.TextField(blank=True, null=True)),
                ('category', models.CharField(blank=True, max_length=100, null=True)),
                ('sets', models.IntegerField()),
                ('count', models.IntegerField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='exercises/')),
            ],
        ),
    ]
