from collections import OrderedDict
from rest_framework import serializers

from .models import Search

from urban.models import UrbanSearch
from urban.serializers import UrbanSearchSerializer

from wiki.models import WikiSearch
from wiki.serializers import WikiSearchSerializer

from googl.models import GoogleSearch
from googl.serializers import GoogleSearchSerializer

from twit.models import TwitterSearch
from twit.serializers import TwitterSearchSerializer

class SearchSerializer(serializers.ModelSerializer):
    urban_search = UrbanSearchSerializer(read_only=False, required=False)
    wiki_search = WikiSearchSerializer(read_only=False, required=False)
    google_search = GoogleSearchSerializer(read_only=False, required=False)
    twitter_search = TwitterSearchSerializer(read_only=False, required=False)

    def to_representation(self, instance):
        result = super(SearchSerializer, self).to_representation(instance)
        return OrderedDict([(key, result[key]) for key in result if result[key] is not None])
    
    class Meta:
        model = Search
        fields = ('term', 'slug', 'google_search', 'urban_search', 'wiki_search', 'twitter_search')
        optional_fields = ['google_search', 'urban_search', 'wiki_search', 'twitter_search']
        lookup_field = 'slug'

    def create(self, validated_data):
        urban_data = validated_data.pop('urban_search', None)
        wiki_data = validated_data.pop('wiki_search', None)
        google_data = validated_data.pop('google_search', None)
        twitter_data = validated_data.pop('twitter_search', None)

        search = Search.objects.create(**validated_data)

        if(urban_data): UrbanSearch.objects.create(search=search, **urban_data)
        if(wiki_data): WikiSearch.objects.create(search=search, **wiki_data)
        if(google_data): GoogleSearch.objects.create(search=search, **google_data)
        if(twitter_data): TwitterSearch.objects.create(search=search, **twitter_data)

        return search

