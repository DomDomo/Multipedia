from django.urls import path
from .views import chatgpt_api_view, ChatGPTListAPIView

urlpatterns = [
    path("", ChatGPTListAPIView.as_view()),
    path("<str:payload>/", chatgpt_api_view)
]
