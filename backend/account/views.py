from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from django.contrib.auth import get_user_model

from account import serializers


User = get_user_model()


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
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterAPIView(APIView):
    serializer_class = serializers.RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        if User.objects.filter(email=email).exists():
            message = {
                'email': [
                    'A user with that email already exists.'
                ]
            }
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.save()
        result = serializers.UserTokenSerializer(user, many=False)
        return Response(result.data, status=status.HTTP_201_CREATED)
