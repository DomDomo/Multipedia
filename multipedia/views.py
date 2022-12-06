from rest_framework import generics
from .serializers import SearchSerializer
from .models import Search

from rest_framework.views import APIView
from rest_framework.response import Response

from datetime import datetime, timedelta, timezone

class SearchListCreateAPIView(generics.ListCreateAPIView):
    queryset = Search.objects.all()
    serializer_class = SearchSerializer
    lookup_field = 'slug'

class SearchDetailAPIView(generics.RetrieveAPIView):
    queryset = Search.objects.all()
    serializer_class = SearchSerializer
    lookup_field = 'slug'

class SearchExistsAndIsRecent(APIView):
    
    def get(self, request, *args, **kwargs):
        search = Search.objects.filter(slug=kwargs["slug"])

        if not search.exists():
            return Response({})

        search = search.first()
        serializer = SearchSerializer(search)

        updated_at = getattr(search, "updated_at")
        recent = (datetime.now(timezone.utc) - updated_at) < timedelta(days=1)

        if not recent:
            search.delete()
            return Response({})

        # print(serializer.data)
        return Response(serializer.data)
