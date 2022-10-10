from rest_framework import serializers
from .models import UrbanSearch

class UrbanSearchSerializer(serializers.ModelSerializer):
  class Meta:
    model = UrbanSearch
    fields = ('word', 'definition', 'example')