from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from django.contrib.auth import get_user_model

from accounts import serializers


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


class UpdateProfileAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = serializers.RegisterSerializer

    def put(self, request):
        serializer = self.serializer_class(
            instance=request.user,
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.update()
        result = serializers.UserTokenSerializer(user, many=False)
        return Response(result.data, status=status.HTTP_200_OK)
