from django.http import JsonResponse
import requests

from dotenv import dotenv_values
from rest_framework import generics

from urban.models import UrbanSearch
from urban.serializers import UrbanSearchSerializer

config = dotenv_values(".env")


DEFINITION_NUM = 3

URBAN_URL = "https://mashape-community-urban-dictionary.p.rapidapi.com/define"

HEADERS = {
    "X-RapidAPI-Key": config["RAPID_API_KEY"],
    "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
}


def urban_request(payload):
    urban_response = requests.get(URBAN_URL, headers=HEADERS, params={"term": payload})
    return urban_response.json()["list"]


def get_definitions(payload):
    formatted_definitions = []

    try:
        full_definitions = urban_request(payload)

        for definition in full_definitions:
            formatted_definitions.append(
                {
                    "word": definition["word"],
                    "definition": definition["definition"],
                    "example": definition["example"],
                    "likes": definition["thumbs_up"],
                }
            )

        # !!! Unused due to relevance being more imporant
        # Sort urban definitions by like count
        # sorted_definitions = sorted(
        #     formatted_definitions, key=lambda d: d["likes"], reverse=True
        # )
    except Exception as e:
        print("Wikipedia API exception: ", e)

    return formatted_definitions[:DEFINITION_NUM]


def urban_api_view(request, payload):
    urban_definitions = get_definitions(payload)
    return JsonResponse({"definitions": urban_definitions})

class UrbanListAPIView(generics.ListAPIView):
    queryset = UrbanSearch.objects.all()
    serializer_class = UrbanSearchSerializer
