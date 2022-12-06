from rest_framework import serializers
from .models import WikiSearch

class WikiSearchSerializer(serializers.ModelSerializer):
  class Meta:
    model = WikiSearch
    fields = ('title', 'content')