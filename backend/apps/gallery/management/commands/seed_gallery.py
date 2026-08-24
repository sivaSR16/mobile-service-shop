import io

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from PIL import Image, ImageDraw

from apps.gallery.models import GalleryImage

PLACEHOLDER_TITLES = [
    "Screen repair in progress",
    "Battery replacement",
    "Workshop bench",
    "Quality check",
    "Finished repair",
    "Customer device intake",
]

# Simple generated placeholder graphics (no external/copyrighted downloads
# required) — replace with real shop photos via the admin in Phase 2.
COLORS = ["#f97316", "#1e293b", "#fdba74", "#334155", "#ea580c", "#0f172a"]


def make_placeholder_image(color: str, label: str) -> ContentFile:
    img = Image.new("RGB", (800, 800), color=color)
    draw = ImageDraw.Draw(img)
    draw.rectangle([40, 40, 760, 760], outline="#ffffff", width=6)
    draw.text((60, 700), label, fill="#ffffff")
    buffer = io.BytesIO()
    img.save(buffer, format="JPEG", quality=85)
    return ContentFile(buffer.getvalue())


class Command(BaseCommand):
    help = "Seed development sample data for the gallery (generated placeholder images)."

    def handle(self, *args, **options):
        created = 0
        for index, title in enumerate(PLACEHOLDER_TITLES):
            if GalleryImage.objects.filter(title=title).exists():
                continue
            image = GalleryImage(title=title, description="Sample placeholder photo.", is_active=True)
            file = make_placeholder_image(COLORS[index % len(COLORS)], title)
            image.image.save(f"placeholder-{index + 1}.jpg", file, save=True)
            created += 1
        self.stdout.write(self.style.SUCCESS(f"Seeded gallery images ({created} created)."))
