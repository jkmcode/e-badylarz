from django.db import models
from django.contrib.auth.models import User

class Districts(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    description =  models.CharField(max_length=250, null=True, blank=True)