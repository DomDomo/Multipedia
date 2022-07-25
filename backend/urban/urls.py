from django.urls import path
from .views import urban_api_view

urlpatterns = [path("<str:payload>/", urban_api_view)]
