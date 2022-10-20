from django.db import models
from jsonfield import JSONField
from multipedia.models import Search

class GoogleSearch(models.Model):
    search = models.OneToOneField(Search, related_name='google_search', on_delete=models.CASCADE, primary_key=True)
    title = models.CharField(max_length=200)
    phonetic = models.CharField(max_length=200)
    content = JSONField()

    class Meta(object):
        verbose_name_plural = "Google Searches"
