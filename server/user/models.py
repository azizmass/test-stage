from django.db import models

# Create your models here.

class User(models.Model):
    email=models.CharField(max_length=255)
    username=models.CharField(max_length=255)
    matricul=models.CharField(max_length=255)