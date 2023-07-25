from rest_framework import serializers
from accounts.serializers import UserSerializer
from orders.models import Order, OrderItem, ShippingAddress


class ShippingSerializer(serializers.Serializer):
    address = serializers.CharField()
    city = serializers.CharField()
    zip_code = serializers.CharField()
    country = serializers.CharField()

    def validate(self, data):
        exists_data = bool(
            'address' not in data or
            'city' not in data or
            'zip_code' not in data or
            'country' not in data
        )
        if exists_data:
            raise serializers.ValidationError(
                'All fields must be filled!',
            )
        return data


class CheckOrderItemSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    quantity = serializers.IntegerField()
    price = serializers.DecimalField(
        max_digits=8,
        decimal_places=2,
    )

    def validate(self, data):
        exists_data = bool(
            'quantity' not in data or
            'price' not in data
        )
        if exists_data:
            raise serializers.ValidationError(
                'All fields must be filled!',
            )
        return data


class OrderSerializer(serializers.Serializer):
    order_items = CheckOrderItemSerializer(many=True)
    shipping_address = ShippingSerializer()
    payment_method = serializers.CharField(required=True)
    items_cost = serializers.DecimalField(
        required=True,
        max_digits=7,
        decimal_places=2,
    )
    tax_price = serializers.DecimalField(
        required=True,
        max_digits=7,
        decimal_places=2,
    )
    shipping_price = serializers.DecimalField(
        required=True,
        max_digits=7,
        decimal_places=2,
    )
    total_price = serializers.DecimalField(
        required=True,
        max_digits=7,
        decimal_places=2,
    )

    def validate(self, data):
        if data['total_price'] <= 0:
            raise serializers.ValidationError(
                'The total price must be greater than 0!',
            )
        exists_data = bool(
            'shipping_address' not in data or
            'payment_method' not in data or
            'tax_price' not in data or
            'shipping_price' not in data or
            'order_items' not in data or
            'total_price' not in data
        )
        if exists_data:
            raise serializers.ValidationError(
                'All fields must be filled!',
            )
        return data


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all'


class OrderDetailSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_order_items(self, obj):
        items = obj.orderitem_set.all()
        return OrderItemSerializer(items, many=True).data

    def get_shipping_address(self, obj):
        return ShippingAddressSerializer(obj.shipping_address).data

    def get_user(self, obj):
        return UserSerializer(obj.user, many=False).data
