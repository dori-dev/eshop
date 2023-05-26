from django.db import models
from django.contrib.auth import get_user_model

from .products import Product


class Review(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        null=True,
    )
    name = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )
    rating = models.IntegerField(
        default=5,
    )
    comment = models.TextField(
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self) -> str:
        return f'{self.product.name} - {self.name}'
