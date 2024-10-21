from django.db import models

# Create your models here.
from django.db import models

class Exercise(models.Model):
    name = models.CharField(max_length=100)  # Required
    description = models.TextField(null=True, blank=True)  # Optional
    uses = models.TextField(null=True, blank=True)  # Optional
    category = models.CharField(max_length=100, null=True, blank=True)  # Optional
    sets = models.IntegerField()  # Required
    count = models.IntegerField()  # Required
    image = models.ImageField(upload_to='exercises/', null=True, blank=True)  # Optional

    def __str__(self):
        return self.name
