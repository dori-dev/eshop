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

    def save(self, **kwargs):
        data = self.validated_data
        data['username'] = data['email']
        user = User.objects.create_user(**data)
        return user


class UpdateUserSerializer(serializers.ModelSerializer):
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
            'password': {
                'required': False,
                'allow_blank': True,
            },
        }

    def update(self):
        data = self.validated_data
        data['username'] = data['email']
        password = data.get('password')
        if password:
            data['password'] = make_password(password)
        user = User.objects.filter(pk=self.instance.pk)
        user.update(**data)
        return user.first()


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
    def validate(self, attrs):
        result = {
            'token': super().validate(attrs)
        }
        user = self.user
        result['id'] = user.pk
        result['username'] = user.get_username()
        result['email'] = user.email
        name = f"{user.first_name} {user.last_name}".strip()
        result['name'] = name or 'Guest User'
        result['is_admin'] = user.is_staff
        return result
