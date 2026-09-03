import logging

import requests
from django.conf import settings
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from .models import Enquiry
from .serializers import EnquirySerializer, EnquiryStatusUpdateSerializer

logger = logging.getLogger(__name__)


class IsAdminOrCreateOnly(permissions.BasePermission):
    """Anyone can create an enquiry; only authenticated staff can read/update."""

    def has_permission(self, request, view):
        if view.action == "create":
            return True
        return bool(request.user and request.user.is_staff)


class EnquiryViewSet(ModelViewSet):
    queryset = Enquiry.objects.all()
    permission_classes = [IsAdminOrCreateOnly]
    http_method_names = ["get", "post", "patch", "head", "options"]

    def get_serializer_class(self):
        if self.action == "partial_update":
            return EnquiryStatusUpdateSerializer
        return EnquirySerializer

    def perform_create(self, serializer):
        enquiry = serializer.save()
        try:
            notify_new_enquiry(enquiry)
        except Exception:
            logger.exception("Failed to send enquiry notification email")


def notify_new_enquiry(enquiry: Enquiry) -> None:
    if not settings.SHOP_NOTIFICATION_EMAIL or not settings.BREVO_API_KEY:
        return

    body = (
        f"New repair enquiry received.\n\n"
        f"Name: {enquiry.customer_name}\n"
        f"Phone: {enquiry.phone}\n"
        f"Email: {enquiry.email or '-'}\n"
        f"Brand: {enquiry.brand or '-'}\n"
        f"Model: {enquiry.model or '-'}\n"
        f"Service Type: {enquiry.service_type or '-'}\n"
        f"Preferred Contact: {enquiry.get_preferred_contact_method_display()}\n\n"
        f"Problem:\n{enquiry.problem_description}\n"
    )

    response = requests.post(
        "https://api.brevo.com/v3/smtp/email",
        headers={
            "api-key": settings.BREVO_API_KEY,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        json={
            "sender": {"email": settings.DEFAULT_FROM_EMAIL},
            "to": [{"email": settings.SHOP_NOTIFICATION_EMAIL}],
            "subject": f"New Enquiry: {enquiry.customer_name}",
            "textContent": body,
        },
        timeout=10,
    )
    response.raise_for_status()
