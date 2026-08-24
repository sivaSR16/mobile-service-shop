from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from .models import GalleryImage
from .serializers import GalleryImageSerializer, GalleryImageWriteSerializer


class IsStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class GalleryImageViewSet(ModelViewSet):
    permission_classes = [IsStaffOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        if self.request.user and self.request.user.is_staff:
            return GalleryImage.objects.all()
        return GalleryImage.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return GalleryImageSerializer
        return GalleryImageWriteSerializer
