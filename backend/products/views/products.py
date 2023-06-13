from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from products.models import Product
from products.serializers import ProductSerializer


class ProductListAPIView(APIView):
    serializer_class = ProductSerializer

    def get(self, request):
        products = Product.objects.all()
        serializer = self.serializer_class(
            products,
            many=True,
            context={'request': request},
        )
        return Response(serializer.data, status.HTTP_200_OK)


class ProductDetailAPIView(APIView):
    serializer_class = ProductSerializer

    def get(self, request, pk):
        product = get_object_or_404(
            Product,
            pk=pk,
        )
        serializer = self.serializer_class(
            product,
            context={'request': request},
        )
        return Response(serializer.data, status.HTTP_200_OK)
