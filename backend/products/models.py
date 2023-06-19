from django.db import models


class ProductType(models.Model):
    allowed_model = {
        'Phone': ['A13', 'S23', 'F4 Pro', '11 Pro Max']
    }

    name = models.CharField(max_length=32)

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=32)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=32)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=32)
    brand = models.ForeignKey(Brand, related_name='products', on_delete=models.CASCADE)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    product_type = models.ForeignKey(ProductType, related_name='products', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_stock(self):
        return self.stock.filter(is_active=True).order_by('price')

    def get_attributes(self):
        return self.attributes.all()


class ProductAttribute(models.Model):
    name = models.CharField(max_length=32)
    product_type = models.ForeignKey(ProductType, related_name='attributes', on_delete=models.CASCADE)

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ProductAttributeValue(models.Model):
    attribute = models.ForeignKey(ProductAttribute, related_name='values', on_delete=models.CASCADE)
    value = models.CharField(max_length=64)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='attributes')

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
