from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product
from products.serializers import ProductSerializer


# Create your views here.

class ProductView(APIView):

    def get_product(self, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return None
        return product

    def get(self, request, pk):
        product = self.get_product(pk)
        if not product:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(product)
        return Response(serializer.data)



