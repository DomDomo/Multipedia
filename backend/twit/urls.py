from django.urls import path
from .views import twitter_api_view

urlpatterns = [path("<str:payload>/", twitter_api_view)]
