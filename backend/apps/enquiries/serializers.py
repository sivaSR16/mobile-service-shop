from rest_framework import serializers

from .models import Enquiry


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = [
            "id",
            "customer_name",
            "phone",
            "email",
            "brand",
            "model",
            "service_type",
            "problem_description",
            "preferred_contact_method",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "status", "created_at", "updated_at"]

    def validate_customer_name(self, value: str) -> str:
        if not value.strip():
            raise serializers.ValidationError("Name is required.")
        return value.strip()

    def validate_problem_description(self, value: str) -> str:
        if not value.strip():
            raise serializers.ValidationError("Please describe the problem.")
        return value.strip()


class EnquiryStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ["status"]
