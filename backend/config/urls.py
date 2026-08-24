from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/enquiries/", include("apps.enquiries.urls")),
    path("api/services/", include("apps.services.urls")),
    path("api/gallery/", include("apps.gallery.urls")),
    path("api/website-content/", include("apps.website.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
