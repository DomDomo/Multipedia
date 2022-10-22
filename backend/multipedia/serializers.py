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
    urban_search = UrbanSearchSerializer(read_only=False)
    wiki_search = WikiSearchSerializer(read_only=False)
    google_search = GoogleSearchSerializer(read_only=False)
    twitter_search = TwitterSearchSerializer(read_only=False)
    
    class Meta:
        model = Search
        fields = ('term', 'slug', 'google_search', 'urban_search', 'wiki_search', 'twitter_search')
        lookup_field = 'slug'

    def create(self, validated_data):
        urban_data = validated_data.pop('urban_search')
        wiki_data = validated_data.pop('wiki_search')
        google_data = validated_data.pop('google_search')
        twitter_data = validated_data.pop('twitter_search')

        search = Search.objects.create(**validated_data)

        UrbanSearch.objects.create(search=search, **urban_data)
        WikiSearch.objects.create(search=search, **wiki_data)
        GoogleSearch.objects.create(search=search, **google_data)
        TwitterSearch.objects.create(search=search, **twitter_data)

        return search

