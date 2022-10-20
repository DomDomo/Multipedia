from django.urls import path
from .views import googl_api_view, GoogleListAPIView

urlpatterns = [path("", GoogleListAPIView.as_view()), path("", GoogleListAPIView.as_view()), path("<str:payload>/", googl_api_view)]
