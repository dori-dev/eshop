from rest_framework import serializers

from partners.serializers import PartnerStockSerializer
from products.models import Product, ProductAttributeValue


from rest_framework import serializers

from products import models


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = models.Product
        fields = '__all__'
        read_only_fields = [
            'user',
            'id',
            'rating',
            'reviews_count',
        ]

    def get_image(self, product: models.Product) -> str:
        request = self.context.get('request')
        if request:
            image_url = product.image.url
            return request.build_absolute_uri(image_url)
        return product.image.url


class ProductSerializer(serializers.ModelSerializer):
    stock = serializers.SerializerMethodField()
    attributes = serializers.SerializerMethodField()
    brand_name = serializers.CharField(source='brand.name')
    category_name = serializers.CharField(source='category.name')
    product_type_name = serializers.CharField(source='product_type.name')

    def get_attributes(self, obj):
        attr = obj.get_attributes()
        serial = AttributesValueSerializer(attr, many=True)
        return serial.data

    def get_stock(self, obj):
        stock = obj.get_stock()
        serial = PartnerStockSerializer(stock, many=True)
        return serial.data

    class Meta:
        model = Product
        fields = ('name', 'brand_name', 'category_name',
                  'product_type_name', 'stock', 'attributes')
        extra_kwargs = {
            'stock': {'read_only': True},
            'attributes': {'read_only': True},
        }


class AttributesValueSerializer(serializers.ModelSerializer):
    attribute_name = serializers.CharField(source='attribute.name')

    class Meta:

        model = ProductAttributeValue
        fields = ('value', 'attribute_name')
