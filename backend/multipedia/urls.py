from django.urls import path
from .views import SearchDetailAPIView
from .views import SearchListCreateAPIView
urlpatterns = [
    path('', SearchListCreateAPIView.as_view()),
    path('<slug:slug>/', SearchDetailAPIView.as_view()),
]