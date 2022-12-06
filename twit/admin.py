from django.contrib import admin
from .models import TwitterSearch
class TwitterSearchAdmin(admin.ModelAdmin):
    list_display = ('title', 'tweets')

admin.site.register(TwitterSearch, TwitterSearchAdmin)