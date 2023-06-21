from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError

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
    serializer_class = serializers.UpdateUserSerializer

    def put(self, request):
        serializer = self.serializer_class(
            instance=request.user,
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)
        try:
            user = serializer.update()
        except IntegrityError:
            result = {
                'details': 'This email address already exists!',
            }
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        result = serializers.UserTokenSerializer(user, many=False)
        return Response(result.data, status=status.HTTP_200_OK)
