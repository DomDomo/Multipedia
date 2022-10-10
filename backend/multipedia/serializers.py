from rest_framework import serializers

from .models import Search

from urban.models import UrbanSearch
from urban.serializers import UrbanSearchSerializer

from wiki.models import WikiSearch
from wiki.serializers import WikiSearchSerializer

class SearchSerializer(serializers.ModelSerializer):
    urban_search = UrbanSearchSerializer(read_only=False)
    wiki_search = WikiSearchSerializer(read_only=False)
    
    class Meta:
        model = Search
        fields = ('term', 'slug', 'urban_search', 'wiki_search')
        lookup_field = 'slug'

    def create(self, validated_data):
        urban_data = validated_data.pop('urban_search')
        wiki_data = validated_data.pop('wiki_search')
        search = Search.objects.create(**validated_data)
        UrbanSearch.objects.create(search=search, **urban_data)
        WikiSearch.objects.create(search=search, **wiki_data)
        return search

