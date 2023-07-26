from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from orders.serializers import OrderDetailSerializer


class OrderListAPIView(APIView):
    serializer_class = OrderDetailSerializer
    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):
        user = request.user
        orders = user.orders.order_by('-created_at')
        serializer = OrderDetailSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
