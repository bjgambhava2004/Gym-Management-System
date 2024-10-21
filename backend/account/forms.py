from django import forms
from django.db import models
from .models import Account

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = [
            'name',
            'address',
            'email',
            'profile_image',
            'linkedin_link',
            'facebook_link',
            'mobile_number',
            'height',  # Add height field
            'weight',  # Add weight field
            'bmi',     # Add bmi field
        ]
