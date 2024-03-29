from django.db import models
from multipedia.models import Search

class UrbanSearch(models.Model):
    search = models.OneToOneField(Search, related_name='urban_search', on_delete=models.CASCADE, primary_key=True)
    word = models.CharField(max_length=50)
    definition = models.TextField()
    example = models.TextField()

    class Meta(object):
        verbose_name_plural = "Urban Searches"
