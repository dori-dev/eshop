from django.contrib import admin


class OtpCodeAdmin(admin.ModelAdmin):
    list_display = [
        'email',
        'code',
        'created_at',
    ]
    list_filter = [
        'created_at',
    ]
    search_fields = [
        'email',
        'code',
    ]
    ordering = [
        '-created_at',
    ]
