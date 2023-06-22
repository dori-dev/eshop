from random import choices

from django.db import models


class OtpCode(models.Model):
    email = models.EmailField(
        max_length=255,
        unique=True,
    )
    code = models.CharField(
        max_length=4,
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(
        auto_now=True,
    )

    def generate_code(self):
        code = "".join(choices("123456789", k=4))
        self.code = code
        self.save()
        return code

    def __str__(self) -> str:
        return f"{self.email} - {self.code}"
