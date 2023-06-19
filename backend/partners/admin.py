from django.contrib import admin
from django.contrib.admin import register
from partners.models import Partner, PartnerStock


@register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    pass


@register(PartnerStock)
class PartnerStockAdmin(admin.ModelAdmin):
    pass
