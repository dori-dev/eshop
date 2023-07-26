from django.db import models
from django.contrib.auth import get_user_model

from products.models import Product


class ShippingAddress(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
    )
    address = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )
    city = models.CharField(
        max_length=128,
        null=True,
        blank=True,
    )
    zip_code = models.CharField(
        max_length=32,
        null=True,
        blank=True,
    )
    country = models.CharField(
        max_length=128,
        null=True,
        blank=True,
    )
    shipping_price = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
    )

    def __str__(self) -> str:
        return f"{self.user.email} - {self.address}"


class Order(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        null=True,
    )
    shipping_address = models.ForeignKey(
        ShippingAddress,
        on_delete=models.SET_NULL,
        null=True,
    )
    payment_method = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )
    items_cost = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        null=True,
        blank=True,
    )
    tax_price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        null=True,
        blank=True,
    )
    shipping_price = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
    )
    total_price = models.DecimalField(
        max_digits=9,
        decimal_places=2,
        null=True,
        blank=True,
    )
    is_paid = models.BooleanField(
        default=False,
    )
    paid_at = models.DateTimeField(
        null=True,
        blank=True,
    )
    is_delivered = models.BooleanField(
        default=False,
    )
    delivered_at = models.DateTimeField(
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self) -> str:
        return f"{self.user.email} order({self.pk})"


class OrderItem(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
    )
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items',
    )
    name = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )
    quantity = models.IntegerField(
        default=1,
    )
    price = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
    )
    image = models.URLField()

    def __str__(self) -> str:
        return f"{self.quantity} - {self.name}"
