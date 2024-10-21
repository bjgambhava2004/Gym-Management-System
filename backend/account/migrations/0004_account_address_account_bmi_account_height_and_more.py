# Generated by Django 5.1.1 on 2024-09-22 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_remove_account_is_seller'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='address',
            field=models.CharField(max_length=355, null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='bmi',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='height',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='package',
            field=models.CharField(blank=True, choices=[('weight lifting', 'weight lifting'), ('weight loss', 'weight loss'), ('weight gain', 'weight gain'), ('boxing', 'boxing')], max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='plan_end_date',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='plan_name',
            field=models.CharField(blank=True, choices=[('1 Month', '1 Month'), ('6 Month', '6 Month'), ('12 Month', '12 Month')], max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='plan_start_date',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='weight',
            field=models.IntegerField(null=True),
        ),
    ]