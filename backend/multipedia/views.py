from django.http import HttpResponse
from rest_framework import generics
from .serializers import SearchSerializer
from .models import Search

# Create your views here.

class SearchView(generics.ListAPIView):
    serializer_class = SearchSerializer
    queryset = Search.objects.all()