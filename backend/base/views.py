from rest_framework.views import APIView
from rest_framework.response import Response

from .products import products


class ProductsAPIView(APIView):
    def get(self, request):
        return Response(products)


class ProductAPIView(APIView):
    def get(self, request, pk):
        product = (
            list(filter(lambda p: int(p['_id']) == pk, products)) or
            [{'detail': 'Not found.'}]
        )
        return Response(product[0])
