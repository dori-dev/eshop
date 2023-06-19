from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

from accounts import serializers


User = get_user_model()


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
