from django.urls import path
from .views import test_view

urlpatterns = [
    path('<str:payload>/', test_view)
]