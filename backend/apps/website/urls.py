from rest_framework.routers import DefaultRouter

from .views import WebsiteContentViewSet

router = DefaultRouter()
router.register("", WebsiteContentViewSet, basename="websitecontent")

urlpatterns = router.urls
