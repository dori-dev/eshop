from django.contrib import admin

from backend.orders import models


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
        'user.email',
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
        'user.email',
        'address',
        'city',
        'zip_code',
        'country',
    ]
    raw_id_fields = [
        'user',
    ]
