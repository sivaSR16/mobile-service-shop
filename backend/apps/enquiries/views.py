from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from .models import Enquiry
from .serializers import EnquirySerializer, EnquiryStatusUpdateSerializer


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
