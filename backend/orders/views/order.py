from django.db import transaction
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from products.models import Product
from orders.models import Order, OrderItem, ShippingAddress
from orders.serializers import (
    OrderSerializer, ShippingAddressSerializer, OrderDetailSerializer
)


class AddOrderItemAPIView(APIView):
    serializer_class = OrderSerializer
    permission_classes = [
        IsAuthenticated
    ]

    def get_product(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise NotFound(
                detail='Product not found!'
            )

    def calculate_stock_count(self, product: Product, quantity):
        if product.count_in_stock < quantity:
            message = f'The quantity of product "{product.name}" is not enough!'
            raise ValidationError(message)
        product.count_in_stock -= quantity
        product.save()
        return True

    def create_order(self, data: dict, user):
        return Order.objects.create(
            user=user,
            payment_method=data.get('payment_method'),
            tax_price=data.get('tax_price'),
            shipping_price=data.get('shipping_price'),
            total_price=data.get('total_price'),
        )

    def create_shipping_address(self, data: dict, user):
        shipping_address = data.get('shipping_address')
        serializer = ShippingAddressSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        if len(shipping_address) != 4:
            message = 'Shipping address must just have country, city, address, and zip_code.'
            raise ValidationError(message)
        return ShippingAddress.objects.create(
            user=user,
            **shipping_address,
        )

    def create_order_item(self, order_item: dict, product: Product, order):
        return OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            quantity=order_item.get('quantity', 1),
            price=order_item.get('price', 10.0),
            image=product.image.url,
        )

    def post(self, request):
        data: dict = request.data
        serializer = OrderSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        order_items = data.get('order_items')
        if len(order_items) == 0:
            return Response(
                {'detail': 'Order items is empty!'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        with transaction.atomic():
            pass
        order = self.create_order(data, request.user)
        self.create_shipping_address(data, request.user)
        for order_item in order_items:
            product = self.get_product(pk=order_item.get('product'))
            quantity = order_item.get('quantity')
            self.create_order_item(order_item, product, order)
            self.calculate_stock_count(product, quantity)
        serializer = OrderDetailSerializer(order, many=False)
        return Response(serializer.data)
