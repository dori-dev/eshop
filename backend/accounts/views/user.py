from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from django.contrib.auth import get_user_model

from accounts import serializers


User = get_user_model()


class UserListAPIView(APIView):
    permission_classes = [
        permissions.IsAdminUser
    ]
    serializer_class = serializers.UserSerializer

    def get(self, request):
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
