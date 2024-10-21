from django.contrib.auth.hashers import check_password
from django.db import models

Plan_CHOICES = [
    ('1 Month', '1 Month'),
    ('6 Month', '6 Month'),
    ('12 Month', '12 Month'),
]
package_CHOICES=[
    ('weight lifting','weight lifting'),
    ('weight loss','weight loss'),
    ('weight gain','weight gain'),
    ('boxing','boxing'),

]
class Account(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)  # Added email field with unique constraint
    password = models.CharField(max_length=255)  # Consider hashing passwords
    address=models.CharField(max_length=355,blank=True,null=True)
    height=models.FloatField(null=True,blank=True)
    weight=models.IntegerField(null=True,blank=True)
    bmi=models.FloatField(null=True,blank=True)
    plan_name=models.CharField(max_length=20, choices=Plan_CHOICES,blank=True, null=True)
    plan_start_date=models.DateField(null=True,blank=True)
    plan_end_date=models.DateField(null=True,blank=True)
    package=models.CharField(max_length=255, choices=package_CHOICES,blank=True,null=True)
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    facebook_link = models.URLField(max_length=200, blank=True, null=True)
    linkedin_link = models.URLField(max_length=200, blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    def __str__(self):
        return self.name

from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
