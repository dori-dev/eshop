from rest_framework import serializers
from django.contrib.auth import get_user_model
from transactions.models import Transaction, TransactionTransfer, UserBalance

User = get_user_model()


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('user', 'transaction_type', 'amount', 'transaction_number')


class TransferSerializer(serializers.Serializer):
    send_to = serializers.CharField()
    amount = serializers.IntegerField()

    def create(self, validated_data, user):
        receiver = validated_data['send_to']
        amount = int(validated_data['amount'])
        receiver = User.objects.filter(username=receiver).first()
        if not receiver:
            return None
        instance = TransactionTransfer.send_to(sender=user, receiver=receiver, amount=amount)
        return instance


class UserBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBalance
        fields = ('balance', 'user', 'created_time')
