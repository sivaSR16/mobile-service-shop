from django.contrib import admin

from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ["customer_name", "phone", "service_type", "status", "created_at"]
    list_filter = ["status", "preferred_contact_method", "created_at"]
    search_fields = ["customer_name", "phone", "email", "brand", "model"]
