from django.urls import path
from .views import wiki_api_view

urlpatterns = [path("<str:payload>/", wiki_api_view)]
