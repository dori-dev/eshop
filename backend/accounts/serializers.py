from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'password',
        ]
        read_only_fields = [
            'id',
        ]
        write_only_fields = [
            'password',
        ]
        extra_kwargs = {
            'email': {
                'required': True,
                'allow_blank': False,
            },
        }

    def update(self):
        data = self.validated_data
        data['username'] = data['email']
        data['password'] = make_password(data['password'])
        user = User.objects.filter(pk=self.instance.pk)
        user.update(**data)
        return user.first()

    def save(self, **kwargs):
        data = self.validated_data
        data['username'] = data['email']
        user = User.objects.create_user(**data)
        return user


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'name',
            'is_admin',
        ]
        read_only_fields = [
            'id',
        ]

    def get_name(self, obj) -> str:
        name = f"{obj.first_name} {obj.last_name}".strip()
        return name or 'Guest User'

    def get_is_admin(self, obj) -> bool:
        return obj.is_staff


class UserTokenSerializer(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'name',
            'is_admin',
            'token',
        ]

    def get_token(self, obj) -> dict:
        token = RefreshToken.for_user(obj)
        return {
            'refresh': str(token),
            'access': str(token.access_token),
        }


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.get_username()
        return data
