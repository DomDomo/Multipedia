from django.urls import path
from .views import SearchDetailAPIView, SearchListAPIhView

urlpatterns = [
    path('', SearchListAPIhView.as_view()),
    path('<slug:slug>/', SearchDetailAPIView.as_view()),
]