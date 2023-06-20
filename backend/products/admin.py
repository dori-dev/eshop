from django.contrib import admin

from products import models


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'category',
        'rating',
        'reviews_count',
        'price',
        'count_in_stock',
        'created_at',
    ]
    list_filter = [
        'category',
        'created_at',
        'updated_at',
    ]
    search_fields = [
        'description',
        'category',
        'brand',
        'name',
        'user.username',
    ]
    date_hierarchy = 'created_at'
    raw_id_fields = [
        'user',
    ]


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'parent',
        'created_at',
        'updated_at',
    ]
    list_filter = [
        'created_at',
        'updated_at',
        'parent',
    ]
    search_fields = [
        'name',
    ]
    date_hierarchy = 'created_at'
    raw_id_fields = [
        'parent',
    ]


@admin.register(models.Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = [
        'product',
        'user',
        'name',
        'rating',
        'created_at',
    ]
    list_filter = [
        'created_at',
    ]
    search_fields = [
        'name',
        'product.id',
        'product.name',
        'user.username',
        'comment'
    ]
    date_hierarchy = 'created_at'
    raw_id_fields = [
        'user',
        'product',
    ]


class OrderItemInline(admin.TabularInline):
    model = models.OrderItem
    extra = 2


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'shipping_address',
        'payment_method',
        'tax_price',
        'shipping_price',
        'total_price',
        'is_paid',
        'is_delivered',
        'created_at',
    ]
    list_filter = [
        'is_delivered',
        'delivered_at',
        'is_paid',
        'paid_at',
        'created_at',
    ]
    search_fields = [
        'shipping_address.address',
        'user.username',
    ]
    date_hierarchy = 'created_at'
    raw_id_fields = [
        'user',
    ]
    inlines = [
        OrderItemInline,
    ]


@admin.register(models.ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'address',
        'city',
        'zip_code',
        'country',
        'shipping_price',
    ]
    search_fields = [
        'country',
        'user.username',
        'address',
        'city',
        'zip_code',
        'country',
    ]
    raw_id_fields = [
        'user',
    ]
