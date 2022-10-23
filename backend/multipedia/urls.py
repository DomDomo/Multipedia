from django.urls import path
from .views import SearchDetailAPIView, SearchListCreateAPIView, SearchExistsAndIsRecent
urlpatterns = [
    path('', SearchListCreateAPIView.as_view()),
    path('<slug:slug>/', SearchExistsAndIsRecent.as_view()),
]