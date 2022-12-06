from django.urls import path
from .views import wiki_api_view, WikiListAPIView

urlpatterns = [path("", WikiListAPIView.as_view()), path("<str:payload>/", wiki_api_view)]

