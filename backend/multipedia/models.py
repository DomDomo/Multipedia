from django.db import models

class Search(models.Model):
    term = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.term
    class Meta(object):
        verbose_name_plural = "Searches"
