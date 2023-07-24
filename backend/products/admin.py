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
        'user.email',
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
        'user.email',
        'comment'
    ]
    date_hierarchy = 'created_at'
    raw_id_fields = [
        'user',
        'product',
    ]
