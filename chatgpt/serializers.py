from rest_framework import serializers
from .models import ChatGPTSearch


class ChatGPTSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGPTSearch
        fields = ('prompt', 'response')
