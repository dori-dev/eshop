from django.db import models
from django.contrib.auth import get_user_model

from products.models.category import Category


class Product(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        null=True,
    )
    name = models.CharField(
        max_length=256,
        null=True,
    )
    image = models.ImageField(
        default='default.png',
        upload_to='images/',
    )
    brand = models.CharField(
        max_length=128,
        blank=True,
        null=True,
    )
    category = models.ForeignKey(
        Category,
        related_name='products',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    description = models.TextField(
        null=True,
        blank=True,
    )
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=5,
    )
    reviews_count = models.PositiveIntegerField(
        default=0,
    )
    price = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
    )
    count_in_stock = models.PositiveIntegerField(
        default=1,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self) -> str:
        return self.name

    def get_stock(self):
        return self.stock.filter(is_active=True).order_by('price')
