from django.contrib import admin
from django.contrib.admin import register

from products.models import Product, Category, Brand, ProductAttributeValue, ProductType, ProductAttribute


class ProductAttributeValueInline(admin.TabularInline):
    model = ProductAttributeValue
    extra = 1


class ProductAttributeInline(admin.TabularInline):
    model = ProductAttribute
    extra = 3


# Register your models here.
@register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = (ProductAttributeValueInline, )


@register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@register(Brand)
class BrandAdmin(admin.ModelAdmin):
    pass


@register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    inlines = (ProductAttributeInline, )





