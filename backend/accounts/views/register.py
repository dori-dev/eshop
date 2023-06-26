from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

from accounts import serializers
from utils import utils
from accounts.models import OtpCode


User = get_user_model()


class RegisterAPIView(APIView):
    serializer_class = serializers.RegisterSerializer

    def send_otp(self, user):
        name = user.name.title()
        email = user.email
        otp = OtpCode.objects.create(email=email)
        code = otp.generate_code()
        return utils.send_email(
            subject=f'{name} Verification Code',
            body=(
                f'Hi {name} welcome to E-Shop.\n'
                f'You verification code is {code}'
            ),
            to=email,
        )

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
        if self.send_otp(user):
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VerifyOtpAPIView(APIView):
    throttle_scope = 'otp_verify'
    serializer_class = serializers.OtpSerializer

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            None

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)
        data = serializer.data
        user = self.get_user(email=data.get('email'))
        if user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if utils.validate_otp(user, data.get('code')):
            result = serializers.UserTokenSerializer(user, many=False)
            return Response(result.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
