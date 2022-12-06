from rest_framework import serializers

from .models import TwitterSearch

import json

class TwitterSearchSerializer(serializers.ModelSerializer):
  tweets = serializers.JSONField(binary=True)
  class Meta:
    model = TwitterSearch
    fields = ('title', 'tweets')

  def to_representation(self, instance):
    google_rep = super(TwitterSearchSerializer, self).to_representation(instance)
    google_rep['tweets'] = json.loads(google_rep['tweets'])
    return google_rep