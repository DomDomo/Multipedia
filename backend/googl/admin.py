from django.contrib import admin
from .models import GoogleSearch
class GoogleSearchAdmin(admin.ModelAdmin):
    list_display = ('title', 'content')

admin.site.register(GoogleSearch, GoogleSearchAdmin)