from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

from account import serializers


class UserProfile(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request):
        user = request.user
        serializer = serializers.UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
