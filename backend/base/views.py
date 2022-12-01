
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


# czyszczenie danych z bazy z nawiasów ('',)
def cleanStr(cleanedData):
    if cleanedData[0] == '(':
        return cleanedData[2:len(cleanedData)-3]
    return cleanedData

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
        modifier = shop.modifier,
        creator = shop.creator,
        is_active = shop.is_active,
        bank_account = shop.bank_account,
        type_of_change = data['typeOfChnage'],  
        archiver = data['creator'],      
    )

    shop.name=data['name']
    shop.nip = data['nip']
    shop.city = data['city']
    shop.street = data['street']
    shop.no_building = data['number']
    shop.post_code = data['postCode']
    shop.post = data['post']
    shop.latitude = data['latitude']
    shop.longitude = data['longitude']
    shop.modifier = str(data['creator'])
    shop.bank_account = data['bankAccount']
    shop.date_of_change = datetime.now()

    shop.save()

    serializer = ShopsSerializer(shop, many=False)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getShop(request, Id):
    shop = Shops.objects.get(id = Id) 

    shop.name = cleanStr(shop.name)
    shop.nip = cleanStr(shop.nip)
    shop.city = cleanStr(shop.city)
    shop.street = cleanStr(shop.street)
    shop.no_building = cleanStr(shop.no_building)
    shop.post_code = cleanStr(shop.post_code)
    shop.post = cleanStr(shop.post)
    shop.latitude = cleanStr(shop.latitude)
    shop.longitude = cleanStr(shop.longitude)

    seriaziler = ShopsSerializer(shop, many=False)
    return Response(seriaziler.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getContacts(request, Id):
    contacts = ShopsContact.objects.filter(id_shops=Id).order_by('name')
    seriaziler = ShopsContactSerializer(contacts, many=True)

    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getSpots(request, Id):
    spots = ShopsSpot.objects.filter(id_shops=Id).order_by('name')
    seriaziler = ShopSpotsSerializer(spots, many=True)

    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getSpot(request, Id):
    spot = ShopsSpot.objects.get(id=Id)
    seriaziler = ShopSpotsSerializer(spot, many=False)

    return Response(seriaziler.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def addShopContacts(request):
    data = request.data

    shop = Shops.objects.get(id=data['shop_id'])
    
    if data['editing']:
        shop_contact_editing = ShopsContact.objects.get(id=data['Id'])

        # Saving archive data
        ShopsContactARC.objects.create(
            id_shops = data['shop_id'],
            name = data['firstName'],
            surname = data['surname'],
            email = data['email'],
            phone = data['phone'],
            description = data['description'],
            date_of_entry = shop_contact_editing.date_of_entry,
            creator = shop_contact_editing.creator,
            is_active = shop_contact_editing.is_active,
            date_of_change = shop_contact_editing.date_of_change,
            type_of_change = shop_contact_editing.type_of_change,
            modifier = shop_contact_editing.modifier,
            id_contact = data['Id'],
            archiver = data['creator']
        )

        # Data change
        shop_contact_editing.name = data['firstName']
        shop_contact_editing.surname = data['surname']
        shop_contact_editing.email = data['email']
        shop_contact_editing.phone = data['phone']
        shop_contact_editing.description = data['description']
        shop_contact_editing.date_of_change = datetime.now()
        shop_contact_editing.modifier = data['creator']
        shop_contact_editing.type_of_change = "Data change"

        shop_contact_editing.save()
    else:
        shop_contact = ShopsContact.objects.create(
            id_shops=shop,
            name=data['firstName'],
            surname = data['surname'],
            email = data['email'],
            phone = data['phone'],
            creator = data['creator'],
            description =data['description'],
            is_active=True
        )

    shop_contacts=ShopsContact.objects.filter(id_shops=data['shop_id'])
    seriaziler = ShopsContactSerializer(shop_contacts, many=True)
    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getShops(request):
    shops = Shops.objects.all().order_by('name') 
    for i in shops:
        i.name=cleanStr(i.name)
        i.city=cleanStr(i.city)
        i.street=cleanStr(i.street)
        i.no_building=cleanStr(i.no_building)
        i.nip=cleanStr(i.nip)
        i.post=cleanStr(i.post)
        i.post_code=cleanStr(i.post_code)
        i.latitude=cleanStr(i.latitude)
        i.longitude=cleanStr(i.longitude)
        # i.bank_account=cleanStr(i.bank_account)

    seriaziler = ShopsSerializer(shops, many=True)

    return Response(seriaziler.data)


@api_view(['POST', 'PUT'])
@permission_classes([IsAdminUser])
def addShopSpot(request):
    data = request.data

    if data['add']:
        shop = Shops.objects.get(id=data['id_shops'])

        spot=ShopsSpot.objects.create(
            id_shops=shop,
            name=data['name'],
            city=data['city'],
            street=data['street'],
            no_building=data['no_building'],
            post_code=data['postCode'],
            post=data['post'],
            latitude=data['latitude'],
            longitude=data['longitude'],
            creator=data['creator'],
            is_active=data['is_active'],
            delivery=data['delivery'],
            range=data['range']
        )
    else:
        spot = ShopsSpot.objects.get(id=data['id_spot'])
    
         # add to archiv
        spotARC = ShopsSpotARC.objects.create(
        id_shops = data['id_shops'],
        id_spot = data['id_spot'],
        name = spot.name,
        city = spot.city,
        street = spot.street,
        no_building = spot.no_building,
        post_code = spot.post_code,
        post = spot.post,
        latitude = spot.latitude,
        longitude = spot.longitude,
        date_of_entry = spot.date_of_entry,
        date_of_change = spot.date_of_change,
        modifier = spot.modifier,
        creator = spot.creator,
        is_active = spot.is_active,
        photo = spot.photo,
        delivery = spot.delivery,
        range = spot.range,
        type_of_change = spot.type_of_change,
        archiver = data['creator']
        )
        # change data
        spot.name = data['name']
        spot.city = data['city']
        spot.street = data['street']
        spot.no_building = data['no_building']
        spot.post_code = data['postCode']
        spot.post = data['post']
        spot.latitude = data['latitude']
        spot.longitude = data['longitude']
        spot.date_of_change = datetime.now()
        spot.modifier = data['creator']
        spot.delivery = data['delivery']
        spot.range = data['range']
        spot.type_of_change = 'Edit - change data'

        spot.save()

    spots=ShopsSpot.objects.filter(id_shops=data['id_shops']).order_by('name')
    seriaziler = ShopSpotsSerializer(spots, many=True)
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
    elif data['objType']=='SHOP_CONTACT':
        descrip = ShopsContact.objects.get(id=data['Id'])
        ShopsContactARC.objects.create(
            id_shops=int(data['shop_id']),
            name=descrip.name,
            surname=descrip.surname,
            email = descrip.email,
            phone = descrip.phone,
            description = descrip.description,
            date_of_entry = descrip.date_of_entry,
            creator = descrip.creator,
            is_active = descrip.is_active,
            date_of_change = descrip.date_of_change,
            modifier = descrip.modifier,
            type_of_change = descrip.type_of_change,
            id_contact=descrip.id
        )
    elif data['objType']=='SHOP_SPOT':
        descrip = ShopsSpot.objects.get(id=data['Id'])
        ShopsSpotARC.objects.create(
            id_shops=int(data['shop_id']),
            id_spot=descrip.id,
            name=descrip.name,
            city = descrip.city,
            street = descrip.street,
            no_building = descrip.no_building,
            post_code = descrip.post_code,
            post = descrip.post,
            latitude = descrip.latitude,
            longitude = descrip.longitude,
            date_of_entry = descrip.date_of_entry,
            date_of_change = descrip.date_of_change,
            creator = descrip.creator,
            is_active = descrip.is_active,
            photo = descrip.photo,
            modifier = descrip.modifier,
            delivery = descrip.delivery,
            range = descrip.range,
            type_of_change = descrip.type_of_change,
        )
    else:
        content = {"detail": "Changing the active flag - no object type"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST) 
    
    if data['active']:
        descrip.is_active=True
    else:
        descrip.is_active=False

    # rozwiazanie tymczasowe bo nie wiem czy to nie bedzie sie srało dla innych typów
    # rozchodzi się o rodzaj - kind
    descrip.type_of_change = data['kind']
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
def getDiscrict(request, lat, lng):
    data = request.data
    discricts = Districts.objects.all().order_by('name')

    print(discricts)

    for i in discricts:
        lat = i.latitude
        lng = i.longitude
        print('lat, lng', lat, lng)

    seriaziler = DistrictsSerializer(discricts, many=True)

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


