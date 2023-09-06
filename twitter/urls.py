from django.urls import path
from .views import twitter_api_view, TwitterListAPIView

urlpatterns = [path("", TwitterListAPIView.as_view()), path("<str:payload>/", twitter_api_view)]

