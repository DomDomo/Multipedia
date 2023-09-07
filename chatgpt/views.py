from django.http import JsonResponse
import requests
import copy

from rest_framework import generics

from chatgpt.models import ChatGPTSearch
from chatgpt.serializers import ChatGPTSearchSerializer


CHATGPT_URL = "https://chat.acytoo.com/api/completions"

DEFAULT_PAYLOAD = {
    "messages": [
        {
            "role": "user",
            "content": "What does INPUT_HERE mean?"
        }
    ]
}

HEADERS = {
    "content-type": "text/plain; charset=utf-8",
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

    chatgpt_response = rapid_api_response.text

    # Remove the ending message and any text after it
    annoying_ending_message = "You can try our new always-free website:"
    if annoying_ending_message in chatgpt_response:
        chatgpt_response = chatgpt_response.split(
            annoying_ending_message)[0].strip()

    formatted_response = {
        "prompt": rapid_api_payload["messages"][0]["content"],
        "response": chatgpt_response
    }

    return formatted_response


def chatgpt_api_view(request, payload):
    chatgpt_response = chatgpt_request(payload)
    return JsonResponse({"reply": chatgpt_response})


class ChatGPTListAPIView(generics.ListAPIView):
    queryset = ChatGPTSearch.objects.all()
    serializer_class = ChatGPTSearchSerializer
