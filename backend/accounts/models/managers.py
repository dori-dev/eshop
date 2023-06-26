from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password, name=None):
        if name is None:
            name = 'Guest User'
        if not email:
            raise ValueError('User should have a email address.')
        user = self.model(
            email=self.normalize_email(email),
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, name=None):
        if name is None:
            name = 'Guest User'
        user = self.create_user(email, password, name)
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
