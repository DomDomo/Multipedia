from rest_framework import serializers
from .models import UrbanSearch

class UrbanSearchSerializer(serializers.ModelSerializer):
  class Meta:
    model = UrbanSearch
    fields = ('search', 'word', 'definition', 'example')