from django.urls import path
from .views import SearchDetailAPIView, SearchListAPIhView

urlpatterns = [
    path('', SearchListAPIhView.as_view()),
    path('<int:pk>/', SearchDetailAPIView.as_view()),
]