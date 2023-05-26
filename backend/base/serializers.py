from rest_framework import serializers

from base import models


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = '__all__'
        read_only_fields = [
            'user',
            'id',
            'rating',
            'reviews_count',
        ]
