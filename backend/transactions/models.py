import uuid
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models, transaction
from django.db.models import Q, Sum
from django.db.models.functions import Coalesce

User = get_user_model()

def r():
    x = str(hash(uuid.uuid4()))[:16]
    return x


class Transaction(models.Model):
    DIRECT_PURCHASE = 1
    WALLET_CHARGE = 2
    WALLET_PURCHASE = 3
    RECEIVED_TRANSACTION = 4
    SENT_TRANSACTION = 5
    REDEEM_GIFT_CARD = 6
    CREATE_GIFT_CARD = 7

    TRANSACTION_TYPE_CHOICES = (
        (DIRECT_PURCHASE, 'Direct Purchase'),
        (WALLET_CHARGE, 'Wallet Charge'),
        (WALLET_PURCHASE, 'Wallet Purchase'),
        (RECEIVED_TRANSACTION, 'Received Transaction'),
        (SENT_TRANSACTION, 'Sent Transaction'),
        (REDEEM_GIFT_CARD, "Redeem Card"),
        (CREATE_GIFT_CARD, 'Create Card')
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='transactions', on_delete=models.SET_NULL, null=True)
    transaction_type = models.PositiveSmallIntegerField(choices=TRANSACTION_TYPE_CHOICES, default=DIRECT_PURCHASE)
    amount = models.PositiveBigIntegerField()
    transaction_number = models.CharField(max_length=16, default=r, unique=True)

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    @classmethod
    def get_user_balance(cls, user):
        positive_transactions = Sum('amount', filter=Q(transaction_type__in=[2]))
        negative_transactions = Sum('amount', filter=Q(transaction_type__in=[1]))
        balance = user.transactions.all().aggregate(balance=Coalesce(positive_transactions, 0)-Coalesce(negative_transactions, 0))
        return balance.get('balance', None)


class TransactionTransfer(models.Model):
    sent_transaction = models.ForeignKey(Transaction, related_name='sent', on_delete=models.PROTECT)
    received_transaction = models.ForeignKey(Transaction, related_name='received', on_delete=models.PROTECT)
    amount = models.PositiveBigIntegerField()

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    @classmethod
    def send_to(cls, sender, receiver, amount):
        if Transaction.get_user_balance(sender) < amount:
            return None
        with transaction.atomic():
            transaction_sent = Transaction.objects.create(user=sender, amount=amount,
                                                          transaction_type=Transaction.SENT_TRANSACTION)
            transaction_received = Transaction.objects.create(user=receiver, amount=amount,
                                                              transaction_type=Transaction.RECEIVED_TRANSACTION)

            instance = cls.objects.create(sent_transaction=transaction_sent,
                                          received_transaction=transaction_received, amount=amount)
        if instance:
            return instance
        return False



class UserBalance(models.Model):
    balance = models.PositiveBigIntegerField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='balance', on_delete=models.SET_NULL, null=True)

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    @classmethod
    def create_user_balance(cls, user):
        balance = Transaction.get_user_balance(user)
        if cls.objects.filter(user=user):
            cls.objects.get(user=user).delete()
        instance = UserBalance.objects.create(balance=balance, user=user)
        return instance

    @classmethod
    def update_users_balance(cls):
        for user in User.objects.all():
            cls.create_user_balance(user)
        return True
