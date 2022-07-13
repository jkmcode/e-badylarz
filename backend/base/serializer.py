from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    IsAdmin = serializers.SerializerMethodField(read_only=True)
    IsSuperUser = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "name", "IsAdmin", "IsSuperUser"]

    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name

    def get_IsAdmin(self, obj):
        return obj.is_staff

    def get_IsSuperUser(self, obj):
        return obj.is_superuser


class UserSeralizerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "name",
            "IsAdmin",
            "IsSuperUser",
            "token",
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class DistrictsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Districts
        fields = '__all__'

class CitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Citis
        fields = '__all__'

class DistrictsDescSerializer(serializers.ModelSerializer):
    class Meta:
        model = Descriptions
        fields = ["description","language","id"]