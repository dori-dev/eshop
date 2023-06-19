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

    def get_product(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return None

    def get(self, request, pk):
        product = self.get_product(pk)
        if product is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(
            product,
            context={'request': request},
        )
        return Response(serializer.data, status.HTTP_200_OK)
