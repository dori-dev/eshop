from rest_framework import serializers

from products import models


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name')

    class Meta:
        model = models.Product
        fields = [
            'user',
            'name',
            'image',
            'brand',
            'category_name',
            'description',
            'rating',
            'reviews_count',
            'price',
            'count_in_stock',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'user',
            'id',
            'rating',
            'reviews_count',
            'stock',
        ]

    def get_image(self, product: models.Product) -> str:
        request = self.context.get('request')
        if request:
            image_url = product.image.url
            return request.build_absolute_uri(image_url)
        return product.image.url
