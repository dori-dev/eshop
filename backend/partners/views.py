from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from partners.models import PartnerStock
from partners.serializers import CreateProductSerializer, PartnerSerializer, PartnerStockSerializer


class PartnerProductAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        partner = request.user.is_partner()
        if not partner:
            return Response(status.HTTP_404_NOT_FOUND)
        serializer = CreateProductSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors)
        instance = serializer.create(validated_data=request.data, partner=partner)
        if not instance:
            if instance is False:
                return Response('You already have that product', status=status.HTTP_400_BAD_REQUEST)
            return Response('Not Allowed', status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PartnerView(APIView):

    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        partner = request.user.is_partner()
        if not partner:
            return Response("Not Found")
        serializer = PartnerSerializer(partner)
        return Response(serializer.data)


class PartnerStockView(APIView):
    permission_classes = [IsAuthenticated]

    def get_partner_stock(self, pk):
        try:
            partner_stock = PartnerStock.objects.get(pk=pk)
        except PartnerStock.DoesNotExist:
            return None
        return partner_stock

    def get(self, request, pk):
        partner_stock = self.get_partner_stock(pk)
        if not partner_stock:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PartnerStockSerializer(partner_stock)
        return Response(serializer.data)

    def put(self, request, pk):
        partner_stock = self.get_partner_stock(pk)
        if not partner_stock:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PartnerStockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response("Something Goes Wrong")

    def delete(self, request, pk):
        partner_stock = self.get_partner_stock(pk)
        if not partner_stock:
            return Response(status=status.HTTP_404_NOT_FOUND)
        partner_stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

