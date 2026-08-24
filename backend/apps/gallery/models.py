from django.db import models


class GalleryImage(models.Model):
    image = models.ImageField(upload_to="gallery/")
    title = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title or f"Gallery image #{self.pk}"
