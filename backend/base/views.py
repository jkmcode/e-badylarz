
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView

from datetime import datetime

import imp
from django.shortcuts import render
from django.http import HttpResponse


from .models import Districts
from .books import books
from base.serializer import *

from rest_framework import status


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# testowanie GIT-a repository

#create user
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSeralizerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#uploading image
@api_view(["PUT"])
def uploadMultiImages(request):

    data = request.data
    taxNo = data["taxNo"]
    images_upload = request.FILES.get("image")

    shop = Shops.objects.get(nip=taxNo)

    shop.photo = request.FILES.get('image')
    shop.save()

    return Response("Image was uploaded")



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAreas(request):


    ## we need to create Area model

    # area = Shops.objects.all().order_by('name') 

    # seriaziler = ShopsSerializer(shops, many=True)

    # return Response(seriaziler.data)
    return Response("okey")


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateShop(request, Id):
    data = request.data
    shop = Shops.objects.get(id=Id)

    print('data', data)
    print("POST", len(data['post']))
    print("latitude", len(data['latitude']))
    print("longitude", len(data['longitude']))
    print("nip", len(data['nip']))

    ShopsARC.objects.create(
        id_shops=Id,
        name=shop.name,
        nip=shop.nip,
        city=shop.city,
        street=shop.street,
        no_building=shop.no_building,
        post_code=shop.post_code,
        post=shop.post,
        latitude=shop.latitude,
        longitude=shop.longitude,
        date_of_change = shop.date_of_entry,
        modifier = shop.creator,
        creator = data['creator'],
        is_active = shop.is_active,
        bank_account = shop.bank_account,
        type_of_change = data['typeOfChnage']        
    )

    shop.name=data['name'],
    shop.nip = data['nip'],
    shop.city = data['city'],
    shop.street = data['street'],
    shop.no_building = data['number'],
    shop.post_code = data['postCode'],
    shop.post = data['post'],
    shop.latitude = data['latitude'],
    shop.longitude = data['longitude'],
    shop.creator = str(data['creator']),
    shop.bank_account = data['bankAccount']

    shop.save()

    serializer = ShopsSerializer(shop, many=False)

    return Response(serializer.data)

    # try:
    #     shop.name=data['name'],
    #     shop.nip = data['nip'],
    #     shop.city = data['city'],
    #     shop.street = data['street'],
    #     shop.no_building = data['number'],
    #     shop.post_code = data['postCode'],
    #     shop.post = data['post'],
    #     shop.latitude = data['latitude'],
    #     shop.longitude = data['longitude'],
    #     shop.creator = data['creator'],
    #     shop.bank_account = data['bankAccount']

    #     shop.save()

    #     serializer = ShopsSerializer(shop, many=False)

    #     return Response(serializer.data)
    # except:
    #     message = {"detail": "Podany kod rejestracyjny już istnieje"}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)        





@api_view(['GET'])
@permission_classes([IsAdminUser])
def getShop(request, Id):
    shop = Shops.objects.get(id = Id) 
    seriaziler = ShopsSerializer(shop, many=False)
    return Response(seriaziler.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getContacts(request, Id):
    contacts = ShopsContact.objects.filter(id=Id).order_by('name')

    seriaziler = ShopsContactSerializer(contacts, many=True)

    return Response(seriaziler.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def addShopContacts(request):
    data = request.data


    shop = Shops.objects.get(id=data['shop_id'])
    shop_contact = ShopsContact.objects.create(
        id_shops=shop,
        name=data['firstName'],
        surname = data['surname'],
        email = data['email'],
        phone = data['phone'],
        creator = data['creator'],
        is_active=True
    )

    shop_contacts=ShopsContact.objects.filter(id_shops=data['shop_id'])
    seriaziler = ShopsContactSerializer(shop_contacts, many=True)
    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getShops(request):
    shops = Shops.objects.all().order_by('name') 

    seriaziler = ShopsSerializer(shops, many=True)

    return Response(seriaziler.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def addShop(request):
    data = request.data

    shopAlreadyExists = Shops.objects.filter(name=data['name']).exists()
    NIPAlreadyExists = Shops.objects.filter(name=data['nip']).exists()

    if shopAlreadyExists:
        content = {"detail": "Shop with this name already exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    elif NIPAlreadyExists:
        content = {"detail": "NIP already exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)        
    else:
        shop = Shops.objects.create(
            name=data['name'],
            nip = data['nip'],
            city = data['city'],
            street = data['street'],
            no_building = data['number'],
            post_code = data['postCode'],
            post = data['post'],
            latitude = data['latitude'],
            longitude = data['longitude'],
            creator = data['creator'],
            is_active=True,
            bank_account = data['bankAccount']
        )

        shops=Shops.objects.all().order_by('name')
        seriaziler = ShopsSerializer(shops, many=True)
        return Response(seriaziler.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def addProductType(request):
    data = request.data

    alreadyExists = ProductType.objects.filter(name=data['name']).exists()

    if alreadyExists:
        content = {"detail": "Product type already exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        product_type = ProductType.objects.create(
            name=data['name'],
            creator = data['creator'],
            is_active=True
        )

        new_type_product=ProductType.objects.get(name=data['name'])
        seriaziler = ProductTypeSerializer(new_type_product, many=False)
        return Response(seriaziler.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getCites(request, Id):
    cities = Citis.objects.filter(id_district = Id) 
    seriaziler = CitiesSerializer(cities, many=True)
    return Response(seriaziler.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def addCiti(request):
    data = request.data

    alreadyExists = Citis.objects.filter(name=data['name'], id_district=data['desc_id']).exists()

    if alreadyExists:
        content = {"detail": "City exists in the selected district"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        discrict = Districts.objects.get(id=data['desc_id'])

        citi = Citis.objects.create(
            id_district=discrict,
            name=data['name'],
            creator = data['creator'],
            post_code = data['post'],
            is_active=True
        )
        newdciti=Citis.objects.filter(name=data['name'], id_district=data['desc_id'])
        seriaziler = CitiesSerializer(newdciti, many=True)
        return Response(seriaziler.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def activeList(request):
    data=request.data

    if data['objType']=='DISTRICT':
        descrip = Districts.objects.get(id=data['Id'])
    elif data['objType']=='CITY':
        descrip = Citis.objects.get(id=data['Id'])
    elif data['objType']=='SHOP':
        descrip = Shops.objects.get(id=data['Id'])
    else:
        content = {"detail": "Changing the active flag - no object type"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST) 
    
    if data['active']:
        descrip.is_active=True
    else:
        descrip.is_active=False

    descrip.date_of_change=datetime.now()
    descrip.modifier=data['userId']
    descrip.save()

    return Response("OK")

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getFullDescriptionsDesc(request, Id, obj_type):
    descrition = Descriptions.objects.filter(obj_id = Id, obj_type=obj_type) 
    seriaziler = DistrictsDescSerializer(descrition, many=True)
    return Response(seriaziler.data)

@api_view(['POST', 'PUT'])
@permission_classes([IsAdminUser])
def addDesc(request):
    data=request.data

    if data["addDesc"]:
        desc = Descriptions.objects.create(
        description=data['desc'],
        language=data['lng'],
        obj_type=data['objType'],
        obj_id=data['objId'],
        creator=data['id'])
    else:
        descrip = Descriptions.objects.get(id=data['descId'])
        descrip.description=data['desc']
        descrip.date_of_change=datetime.now()
        descrip.modifier=data['id']
        descrip.save()

    return Response("OK")

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getDiscrictDesc(request, Id, lng, obj_type):
    descrition = Descriptions.objects.filter(obj_id = Id, language=lng, obj_type=obj_type) 
    seriaziler = DistrictsDescSerializer(descrition, many=True)
    return Response(seriaziler.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def getDiscrict(request):
    discrict = Districts.objects.all().order_by('name')
    seriaziler = DistrictsSerializer(discrict, many=True)

    return Response(seriaziler.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def addDiscrict(request):
    data = request.data

    alreadyExists = Districts.objects.filter(name=data['name']).exists()

    if alreadyExists:
        content = {"detail": "Disctrict already exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        district = Districts.objects.create(
            name=data['name'],
            creator = data['creator'],
            is_active=True,
        )
        newdistrict=Districts.objects.filter(name=data['name'])
        seriaziler = DistrictsSerializer(newdistrict, many=True)
        return Response(seriaziler.data)


