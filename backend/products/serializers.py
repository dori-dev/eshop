from rest_framework import serializers

from partners.serializers import PartnerStockSerializer
from products.models import Product, ProductAttributeValue


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
        fields = ('name', 'brand_name', 'category_name', 'product_type_name', 'stock', 'attributes')
        extra_kwargs = {
            'stock': {'read_only': True},
            'attributes': {'read_only': True},
        }


class AttributesValueSerializer(serializers.ModelSerializer):
    attribute_name = serializers.CharField(source='attribute.name')

    class Meta:

        model = ProductAttributeValue
        fields = ('value', 'attribute_name')

