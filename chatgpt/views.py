from django.http import JsonResponse
import requests
import copy
import ast

from rest_framework import generics

from chatgpt.models import ChatGPTSearch
from chatgpt.serializers import ChatGPTSearchSerializer

from multipedia.secrets import get_secret


CHATGPT_URL = "https://open-ai21.p.rapidapi.com/conversationgpt"

DEFAULT_PAYLOAD = {
    "messages": [
        {
            "role": "user",
            "content": "What does INPUT_HERE mean?"
        }
    ]
}

HEADERS = {
    "content-type": "application/json",
    "X-RapidAPI-Key": get_secret("RAPID_API_KEY"),
    "X-RapidAPI-Host": "open-ai21.p.rapidapi.com"
}


def chatgpt_request(payload):
    rapid_api_payload = copy.deepcopy(DEFAULT_PAYLOAD)
    rapid_api_payload["messages"][0]["content"] = f"What does \"{payload}\" mean?"

    try:
        rapid_api_response = requests.post(
            CHATGPT_URL, json=rapid_api_payload, headers=HEADERS
        )
    except Exception as e:
        print("ChatGPT API exception: ", e)
        return -1

    chatgpt_response = rapid_api_response.json()["GPT"]

    # The GPT property is a string in a string - this extracts the inner string
    inner_string = ast.literal_eval(chatgpt_response)

    formatted_response = {
        "prompt": rapid_api_payload["messages"][0]["content"],
        "response": inner_string
    }

    return formatted_response


def chatgpt_api_view(request, payload):
    chatgpt_response = chatgpt_request(payload)
    return JsonResponse({"reply": chatgpt_response})


class ChatGPTListAPIView(generics.ListAPIView):
    queryset = ChatGPTSearch.objects.all()
    serializer_class = ChatGPTSearchSerializer
