from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests

URBAN_DICTIONARY_URL = "https://api.urbandictionary.com/v0/define?term="
term = "cheese"

class UrbanSearchAPIView(APIView):
    def get(self, request, format=None):
        resp = requests.get(url=f'{URBAN_DICTIONARY_URL}{term}')
        data = resp.json()

        #first_element = data['list'][0].get("definition")

        return Response(data, status=status.HTTP_200_OK)