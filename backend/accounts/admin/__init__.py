from django.contrib import admin

from accounts import models
from accounts.admin import user, otp

admin.site.register(models.User, user.UserAdmin)
admin.site.register(models.OtpCode, otp.OtpCodeAdmin)
