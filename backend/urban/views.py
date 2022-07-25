from django.http import JsonResponse
import requests

from dotenv import dotenv_values

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
    full_definitions = urban_request(payload)

    formatted_definitions = []

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

    return formatted_definitions[:DEFINITION_NUM]


def urban_api_view(request, payload):
    urban_definitions = get_definitions(payload)
    return JsonResponse({"definitions": urban_definitions})
