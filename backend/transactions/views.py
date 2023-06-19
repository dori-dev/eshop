from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from transactions.models import Transaction
from transactions.serializers import TransactionSerializer, TransferSerializer


class TransactionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        transactions = Transaction.objects.filter(user=request.user)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)


class TransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, transaction_number):
        try:
            transaction = Transaction.objects.get(transaction_number=transaction_number)
        except Transaction.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if transaction.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)


class TransferView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TransferSerializer()
        instance = serializer.create(validated_data=request.data, user=request.user)
        if not instance:
            if instance is False:
                return Response('Mojodi kafi nis')
            return Response(status=status.HTTP_400_BAD_REQUEST)
        transaction_serializer = TransactionSerializer(instance.sent_transaction)
        return Response(transaction_serializer.data,status=status.HTTP_200_OK)