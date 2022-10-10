from django.db import models
from multipedia.models import Search

class WikiSearch(models.Model):
    search = models.OneToOneField(Search, related_name='wiki_search', on_delete=models.CASCADE, primary_key=True)
    title = models.CharField(max_length=200)
    content = models.TextField()

    class Meta(object):
        verbose_name_plural = "Wiki Searches"
