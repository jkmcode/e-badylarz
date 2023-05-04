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

class CitiesDescSerializer(serializers.ModelSerializer):
    class Meta:
        model = CitiesDescriptions
        fields = ["description","language","id"]

class ShopDescSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopsDescriptions
        fields = ["description","language","id"]

class ShopSpotDescSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopsSpotDescriptions
        fields = ["description","language","id"]

class ProductDescSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDescriptions
        fields = ["description","language","id"]

class ProductTypesDescSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTypesDescriptions
        fields = ["description","language","id"]

class ProductSubTypesDescSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSubtypesDescriptions
        fields = ["description","language","id"]

class DistrictsDescSerializer(serializers.ModelSerializer):
    class Meta:
        model = Descriptions
        fields = ["description","language","id"]

class ProductTypeSerializer(serializers.ModelSerializer):
    type_of_instance = serializers.CharField(default='product category')
    class Meta:
        model = ProductTypes
        fields = '__all__'     

class SubproductTypeSerializer(serializers.ModelSerializer):
    id_product_type = ProductTypeSerializer()
    type_of_instance = serializers.CharField(default='product subcategory')
    class Meta:
        model = ProductSubTypes
        fields = '__all__'   

class ProductsSerializer(serializers.ModelSerializer):
    id_product_subtype = SubproductTypeSerializer()
    list_of_data = serializers.CharField(default='list of product')
    class Meta:
        model = Product
        fields = '__all__'            

class ShopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shops
        fields = '__all__'   

class ShopsContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopsContact
        fields = '__all__'   

class AreaContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaContact
        fields = '__all__'



class CitiesNameSerializer(serializers.ModelSerializer):

    id_district = DistrictsSerializer(many=False)

    class Meta:
        model = Citis
        fields = ["name", "id_district"]

class ShopSpotsSerializer(serializers.ModelSerializer):
    # city = CitiesNameSerializer(many=False)

    class Meta:
        model = ShopsSpot
        fields = '__all__' 


class AreaSpotsSerializer(serializers.ModelSerializer):
    city = CitiesNameSerializer(many=False)

    class Meta:
        model = AreasSpot
        fields = [
            "name", 
            "street",
            "no_building",
            "city",
            "id",
            "is_active",
            "post_code",
            "post",
            "latitude",
            "longitude",
            "photo",
            "delivery",
            "range"]

class AreasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Areas
        fields = '__all__' 