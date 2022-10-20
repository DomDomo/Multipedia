from django.contrib import admin
from .models import GoogleSearch
class GoogleSearchAdmin(admin.ModelAdmin):
    list_display = ('title', 'phonetic', 'content')

admin.site.register(GoogleSearch, GoogleSearchAdmin)