from rest_framework import serializers

from .models import WebsiteContent


class WebsiteContentSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = WebsiteContent
        fields = [
            "id",
            "section",
            "title",
            "description",
            "image_url",
            "metadata",
            "updated_at",
        ]

    def get_image_url(self, obj: WebsiteContent) -> str | None:
        if not obj.image:
            return None
        request = self.context.get("request")
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url


class WebsiteContentWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteContent
        fields = ["id", "section", "title", "description", "image", "metadata"]
