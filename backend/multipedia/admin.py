from django.contrib import admin
from .models import Search
class SearchAdmin(admin.ModelAdmin):
    list_display = ('term', 'slug', 'created_at', 'updated_at')

admin.site.register(Search, SearchAdmin)