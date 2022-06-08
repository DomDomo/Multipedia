from django.contrib import admin
from .models import Search
class SearchAdmin(admin.ModelAdmin):
    list_display = ('term', 'created_at', 'updated_at')

# Register your models here.

admin.site.register(Search, SearchAdmin)