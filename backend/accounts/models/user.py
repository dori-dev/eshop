from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from accounts.models.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        max_length=255,
        unique=True,
    )
    name = models.CharField(
        max_length=64,
        default='Guest User',
    )
    is_active = models.BooleanField(
        default=True,
    )
    is_admin = models.BooleanField(
        default=False,
    )
    objects = UserManager()
    USERNAME_FIELD = 'email'

    def __str__(self) -> str:
        return self.email

    @property
    def is_staff(self):
        return self.is_admin
