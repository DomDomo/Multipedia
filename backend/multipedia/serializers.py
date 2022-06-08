from rest_framework import serializers
from .models import Search
from urban.serializers import UrbanSearchSerializer

class SearchSerializer(serializers.ModelSerializer):
    urban_search = UrbanSearchSerializer(read_only=True, source='urbansearch')
    
    class Meta:
        model = Search
        fields = ('term', 'urban_search')