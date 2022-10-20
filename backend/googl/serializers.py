from rest_framework import serializers

from .models import GoogleSearch

import json

class GoogleSearchSerializer(serializers.ModelSerializer):
  content = serializers.JSONField(binary=True)
  class Meta:
    model = GoogleSearch
    fields = ('title', 'phonetic', 'content')

  def to_representation(self, instance):
    google_rep = super(GoogleSearchSerializer, self).to_representation(instance)
    google_rep['content'] = json.loads(google_rep['content'])
    return google_rep