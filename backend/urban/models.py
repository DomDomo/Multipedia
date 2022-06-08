from doctest import Example
from statistics import mode
from django.db import models
from multipedia.models import Search

class UrbanSearch(models.Model):
    search = models.OneToOneField(Search, on_delete=models.CASCADE, primary_key=True)
    word = models.CharField(max_length=50)
    definition = models.TextField()
    example = models.TextField()
    