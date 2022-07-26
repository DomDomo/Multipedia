from django.urls import path
from .views import googl_api_view

urlpatterns = [path("<str:payload>/", googl_api_view)]
