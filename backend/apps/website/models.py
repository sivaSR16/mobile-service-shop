from django.db import models


class WebsiteContent(models.Model):
    """Generic, CMS-lite content block so ordinary content edits (hero copy,
    about text, banner images, etc.) don't require frontend code changes."""

    section = models.SlugField(
        max_length=100,
        unique=True,
        help_text="Unique key identifying the section, e.g. 'hero', 'about'.",
    )
    title = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="website/", blank=True, null=True)
    metadata = models.JSONField(default=dict, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["section"]

    def __str__(self) -> str:
        return self.section
