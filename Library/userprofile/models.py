from django.db import models
from django.contrib.auth import get_user_model

User=get_user_model()
# Create your models here.
class UserProfile(models.Model):
    user=models.ManyToManyField(User,related_name='userprofile')
    roll_number=models.CharField(max_length=20)

    def __str__(self):
        return str(self.roll_number)
