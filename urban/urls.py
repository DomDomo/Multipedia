from django.urls import path
from .views import urban_api_view, UrbanListAPIView

urlpatterns = [
    path("", UrbanListAPIView.as_view()),
    path("<str:payload>/", urban_api_view)
]
