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

    def get(self, request, pk):
        user = request.user
        orders = user.orders.all()
        serializer = OrderDetailSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
