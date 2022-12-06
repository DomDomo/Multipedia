from django.db import models
from jsonfield import JSONField
from multipedia.models import Search

class TwitterSearch(models.Model):
    search = models.OneToOneField(Search, related_name='twitter_search', on_delete=models.CASCADE, primary_key=True)
    title = models.CharField(max_length=200)
    tweets = JSONField()

    class Meta(object):
        verbose_name_plural = "Twitter Searches"
