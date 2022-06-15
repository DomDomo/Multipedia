from django.urls import path
from .views import UrbanSearchAPIView

urlpatterns = [
    path('', UrbanSearchAPIView.as_view()),
]