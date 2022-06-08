from django.contrib import admin
from .models import UrbanSearch
class UrbanSearchAdmin(admin.ModelAdmin):
    list_display = ('search', 'word', 'definition', 'example')

# Register your models here.
admin.site.register(UrbanSearch, UrbanSearchAdmin)
