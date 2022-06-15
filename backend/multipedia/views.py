from django.http import HttpResponse
from rest_framework import generics
from .serializers import SearchSerializer
from .models import Search

# Create your views here.

class SearchListAPIhView(generics.ListAPIView):
    queryset = Search.objects.all()
    serializer_class = SearchSerializer
    lookup_field = 'slug'

class SearchDetailAPIView(generics.RetrieveAPIView):
    queryset = Search.objects.all()
    serializer_class = SearchSerializer
    lookup_field = 'slug'