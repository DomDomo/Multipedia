from django.http import JsonResponse
import requests


GOOGLE_DICT_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"


def google_dict_request(payload):
    google_response = requests.get(GOOGLE_DICT_URL + payload)
    if google_response.status_code == 404:
        return -1
    return google_response.json()[0]


def get_meanings(payload):
    filtered_response = {
        "title": "Sorry :(",
        "phonetic": "",
        "synonyms": [],
        "meanings": [],
    }

    try:
        full_definition = google_dict_request(payload)
        if full_definition == -1:
            return filtered_response

        filtered_response["title"] = full_definition["word"]

        if "phonetic" in full_definition:
            filtered_response["phonetic"] = full_definition["phonetic"]

        for meaning in full_definition["meanings"]:
            meaning_obj = {}

            definition_data = meaning["definitions"][0]

            meaning_obj["definition"] = meaning["definitions"][0]["definition"]
            meaning_obj["partOfSpeech"] = meaning["partOfSpeech"]

            if "example" in definition_data:
                meaning_obj["example"] = definition_data["example"]

            if "synonyms" in meaning:
                filtered_response["synonyms"] = (
                    filtered_response["synonyms"] + meaning["synonyms"][:3]
                )

            filtered_response["meanings"].append(meaning_obj)

    except Exception as e:
        print("Google API exception: ", e)

    return filtered_response


def googl_api_view(request, payload):
    google_meanings = get_meanings(payload)
    return JsonResponse({"definition": google_meanings})
