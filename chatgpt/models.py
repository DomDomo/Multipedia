from django.db import models
from multipedia.models import Search


class ChatGPTSearch(models.Model):
    search = models.OneToOneField(
        Search, related_name='chatgpt_search', on_delete=models.CASCADE, primary_key=True)
    prompt = models.CharField(max_length=100)
    response = models.TextField()

    class Meta(object):
        verbose_name_plural = "ChatGPT Responses"
