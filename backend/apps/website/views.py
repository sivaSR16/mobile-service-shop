from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from .models import WebsiteContent
from .serializers import WebsiteContentSerializer, WebsiteContentWriteSerializer


class IsStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class WebsiteContentViewSet(ModelViewSet):
    queryset = WebsiteContent.objects.all()
    permission_classes = [IsStaffOrReadOnly]
    lookup_field = "section"
    pagination_class = None

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return WebsiteContentSerializer
        return WebsiteContentWriteSerializer
