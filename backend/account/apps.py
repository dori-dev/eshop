from django.apps import AppConfig
from django.core.signals import setting_changed


class AccountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'account'

    def ready(self):
        from . import signals
        setting_changed.connect(signals.update_user)
