from rest_framework import serializers

from partners.models import PartnerStock, Partner
from products.models import Product, Brand, Category, ProductType


class CreateProductSerializer(serializers.Serializer):
    brand = serializers.CharField()
    category = serializers.CharField()
    name = serializers.CharField()
    product_type = serializers.CharField()
    quantity = serializers.IntegerField()
    price = serializers.IntegerField()

    def create(self, validated_data, partner):
        name = validated_data['name']
        if not Product.objects.filter(name=name):
            try:
                brand = Brand.objects.get(name=validated_data['brand'])
                category = Category.objects.get(name=validated_data['category'])
                product_type = ProductType.objects.get(name=validated_data['product_type'])
                price = validated_data['price']
                quantity = validated_data['quantity']
                if name in product_type.allowed_model[product_type.name]:
                    instance_2 = Product.objects.create(name=name, brand=brand, category=category, product_type=product_type)
                    instances_1 = PartnerStock.objects.create(partner=partner, in_stock=quantity, price=price, product=instance_2)
                    return instance_2
            except:
                return None
        product = Product.objects.get(name=name)
        price = validated_data['price']
        quantity = validated_data['quantity']
        if PartnerStock.objects.filter(partner=partner, product=product):
            return False
        instances_1 = PartnerStock.objects.create(partner=partner, in_stock=quantity, price=price, product=product)
        return product


class PartnerSerializer(serializers.ModelSerializer):
    stock = serializers.SerializerMethodField()

    def get_stock(self, obj):
        data = obj.stock.filter(is_active=True)
        if not data:
            return {'error': 'no data has found'}
        serial = PartnerStockSerializer(data, many=True)
        return serial.data

    class Meta:
        model = Partner
        fields = ('user', 'name', 'stock')


class PartnerStockSerializer(serializers.ModelSerializer):

    class Meta:
        model = PartnerStock
        fields = "__all__"
