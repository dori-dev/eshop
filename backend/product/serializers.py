from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from product import models


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = models.Product
        fields = '__all__'
        read_only_fields = [
            'user',
            'id',
            'rating',
            'reviews_count',
        ]

    def get_image(self, product: models.Product):
        request = self.context.get('request')
        if request:
            image_url = product.image.url
            return request.build_absolute_uri(image_url)
        return product.image.url


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
