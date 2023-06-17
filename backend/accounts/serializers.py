from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

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


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)
    is_partner = serializers.SerializerMethodField(read_only=True)

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

    def get_is_partner(self, obj):
        return obj.is_partner


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
