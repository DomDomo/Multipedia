from rest_framework import serializers

from urban.models import UrbanSearch
from .models import Search
from urban.serializers import UrbanSearchSerializer

class SearchSerializer(serializers.ModelSerializer):
    urban_search = UrbanSearchSerializer(read_only=False)
    
    class Meta:
        model = Search
        fields = ('term', 'slug', 'urban_search')
        lookup_field = 'slug'

    def create(self, validated_data):
        urban_data = validated_data.pop('urban_search')
        search = Search.objects.create(**validated_data)
        UrbanSearch.objects.create(search=search, **urban_data)
        return search

