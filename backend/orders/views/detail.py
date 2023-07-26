from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from orders.models import Order
from orders.serializers import OrderDetailSerializer


class OrderDetailAPIView(APIView):
    serializer_class = OrderDetailSerializer
    permission_classes = [
        IsAuthenticated
    ]

    def get_order(self, pk):
        try:
            return Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return None

    def get(self, request, pk):
        user = request.user
        order = self.get_order(pk)
        if order is None:
            return Response(
                {'detail': 'Order does not exists.'},
                status=status.HTTP_404_NOT_FOUND,
            )
        if user.is_admin or order.user == user:
            serializer = OrderDetailSerializer(order, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {'detail': 'You are not authorized to view this order.'},
            status=status.HTTP_403_FORBIDDEN,
        )
