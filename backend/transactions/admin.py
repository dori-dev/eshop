from django.contrib import admin
from django.contrib.admin import register

from transactions.models import Transaction


# Register your models here.
@register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    pass
