from django.contrib.auth import get_user_model
from django.db import models
from django.conf import settings

from products.models import Product
user = get_user_model()


def is_partner(self):
    try:
        partner = Partner.objects.get(user=self)
        return partner
    except Partner.DoesNotExist:
        return False


user.add_to_class('is_partner', is_partner)


class Partner(models.Model):
    name = models.CharField(max_length=32)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class PartnerStock(models.Model):
    partner = models.ForeignKey(Partner, related_name='stock', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='stock', on_delete=models.CASCADE)
    price = models.PositiveBigIntegerField()
    is_active = models.BooleanField(default=True)
    in_stock = models.IntegerField()

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.partner.name}, {self.product.name}, {self.price}"

