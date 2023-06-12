from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from django.contrib.auth import get_user_model

from account import serializers


class UserProfileAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.UserSerializer

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserListAPIView(APIView):
    permission_classes = [
        permissions.IsAdminUser
    ]
    serializer_class = serializers.UserSerializer

    def get(self, request):
        users = get_user_model().objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
