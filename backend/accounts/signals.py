from django.db.models.signals import pre_save
from django.contrib.auth import get_user_model
from django.dispatch import receiver


User = get_user_model()


@receiver(pre_save, sender=User)
def update_user(sender: User, instance: User, **kwargs):
    if instance.email:
        instance.username = instance.email
