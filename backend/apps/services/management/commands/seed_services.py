from django.core.management.base import BaseCommand

from apps.services.models import Service

SEED_SERVICES = [
    ("Screen Replacement", "Cracked or unresponsive screen replacement for all major brands.", "From ₹1,499"),
    ("Battery Replacement", "Restore battery life and fix rapid draining or swelling issues.", "From ₹999"),
    ("Charging Port Repair", "Fix loose, damaged or non-functional charging ports.", "From ₹699"),
    ("Speaker & Microphone Repair", "Resolve call, speaker, and microphone audio issues.", "From ₹599"),
    ("Software Issues", "Diagnose and fix boot loops, freezing, and OS-level problems.", "From ₹399"),
    ("Water Damage", "Cleaning, drying, and component-level water damage recovery.", "Estimate on inspection"),
    ("Camera Repair", "Front and rear camera module repair and replacement.", "From ₹899"),
    ("Other Mobile Repairs", "Other hardware or software issues not listed above.", "Estimate on inspection"),
]


class Command(BaseCommand):
    help = "Seed development sample data for services."

    def handle(self, *args, **options):
        created = 0
        for name, description, price in SEED_SERVICES:
            _, was_created = Service.objects.get_or_create(
                name=name,
                defaults={"description": description, "price": price, "is_active": True},
            )
            created += int(was_created)
        self.stdout.write(self.style.SUCCESS(f"Seeded services ({created} created)."))
