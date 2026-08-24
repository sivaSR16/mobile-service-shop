from django.contrib import admin

from .models import WebsiteContent


@admin.register(WebsiteContent)
class WebsiteContentAdmin(admin.ModelAdmin):
    list_display = ["section", "title", "updated_at"]
    search_fields = ["section", "title"]
