
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from django.core.files import File
from PIL import Image
from io import BytesIO
from django.http import Http404
from django.db import IntegrityError

from django.core.paginator import Paginator

from datetime import datetime

import imp
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse


from .models import Districts
from .books import books
from base.serializer import *
from base.Views.views_panel import *
from base.Views.views_description import *

from rest_framework import status


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from  math import sin, cos, acos, pi

# czyszczenie danych z bazy z nawiasów ('',)
def cleanStr(obj):
    if not obj:
        return obj

    if obj[0] == "(":
        return obj[2:len(obj)-3]
    else:
        return obj



# odliczanie odległości pomiedzy punktami geograficznymi w kilometrach
# z uwzględnieniem krzywizny ziemi - dokładność 10 metrów

def rad2deg(radians):
    degrees = radians * 180 / pi
    return degrees

def deg2rad(degrees):
    radians = degrees * pi / 180
    return radians

def getDistanceBetweenPointsNew(latitude1, longitude1, latitude2, longitude2):
    
    theta = longitude1 - longitude2
    
    distance = 60 * 1.1515 * rad2deg(
        acos(
            (sin(deg2rad(latitude1)) * sin(deg2rad(latitude2))) + 
            (cos(deg2rad(latitude1)) * cos(deg2rad(latitude2)) * cos(deg2rad(theta)))
        )
    )

    return round(distance * 1.609344, 2)

# sprwawdzenie poprwaności wartości współrzednych geograficznych
# szerokość
def correctLat(lat):
    if lat< 90 and lat >-90:
        return True
    else:
        return False


# długość
def correctLng(lng):
    if lng< 180 and lng >-180:
        return True
    else:
        return False

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


@api_view(["PUT"])
# error hendling - OK
def uploadMultiImages(request):

    data = request.data
    objType = data['objType']
    taxNo = data["taxNo"]

    content = {
        'function_name' : 'uploadMultiImages',
        'code' : "0045",
        "detail": "Bad request. Photo not updated",
        'text' : "Błąd pobrania obiektu do zapisania zdjęcia wariant 1 wiązanie po id"
    }

    if objType == 'Spot':
        try:
            active_object = ShopsSpot.objects.get(id=data['Id'])
        except Exception as e:
            return ErrorHendling(content, err=e)
    else:
        try:
            active_object = Shops.objects.get(nip=taxNo)
        except Exception as e:
            content['text'] = "Błąd pobrania obiektu do zapisania zdjęcia wariant 1 wiązanie po nip"
            content['code'] = "0046"
            return ErrorHendling(content, err=e)

    try:
        active_object.photo = request.FILES.get('image')
        active_object.save()
    except Exception as e:
        content['text'] = "Błąd  zapisania zdjęcia wariant 1"
        content['code'] = "0047"
        return ErrorHendling(content, err=e)

    return Response("Image was uploaded")


@api_view(["PUT"])
def uploadMultiImages2(request):
    data = request.data
    uniqueId = data["uniqueId"]

    if data["type"] == "PRODUCT_SUBCAT":
        image = ProductSubTypes.objects.get(uniqueId=uniqueId)
    elif data["type"] == "PRODUCT_CAT":
        image = ProductTypes.objects.get(uniqueId=uniqueId)  
    elif data["type"] == "PRODUCT":
        image = Product.objects.get(id=uniqueId)               
    else: 
        content = {"detail": "Changing the active flag - no object type"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST) 

    image.photo = request.FILES.get('image')
    image.save()    

    return Response("Image was uploaded")

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAreas(request):

    content = {
        'function_name' : 'getAreas',
        'code' : "0175",
        "detail": "Bad request. No list areas",
        'text' : "Błąd pobrania listy obiektów z tabeli Areas"
    }

    try:
        areas = Areas.objects.all().order_by('name')
    except Exception as e:
        return ErrorHendling(content, err=e)

    for i in areas : 
        i.name = cleanStr(i.name)
        i.nip = cleanStr(i.nip)
        i.city = cleanStr(i.city)
        i.street = cleanStr(i.street)
        i.no_building = cleanStr(i.no_building)
        i.post_code = cleanStr(i.post_code)
        i.post = cleanStr(i.post)
        i.latitude = cleanStr(i.latitude)
        i.longitude = cleanStr(i.longitude) 
    try:
        seriaziler = AreasSerializer(areas, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji listy obiektów z tabeli Areas"
        content['code'] = "0176"
        return ErrorHendling(content, err=e)
    
    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAreaToEdit(request, Id): 

    content = {
        'function_name' : 'getAreaToEdit',
        'code' : "0187",
        "detail": "Bad request. No areas details",
        'text' : "Błąd pobrania obiektu z tabeli Areas"
    }
    try:
        area = Areas.objects.get(id=Id)
    except Exception as e:
        return ErrorHendling(content, err=e)
    
    area.name = cleanStr(area.name)
    area.nip = cleanStr(area.nip)
    area.city = cleanStr(area.city)
    area.street = cleanStr(area.street)
    area.no_building = cleanStr(area.no_building)
    area.post_code = cleanStr(area.post_code)
    area.post = cleanStr(area.post)
    area.latitude = cleanStr(area.latitude)
    area.longitude = cleanStr(area.longitude)
    try:
        seriaziler = AreasSerializer(area, many=False)
    except Exception as e:
        content['text'] = "Błąd serializacji obiektu z tabeli Area"
        content['code'] = "0188"
        return ErrorHendling(content, err=e)
    
    return Response(seriaziler.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def addArea(request):
    
    data = request.data
    content = {
        'function_name' : 'getAreas',
        'code' : "0177",
        "detail": "Bad request. Wrong latitude",
        'text' : "Błędna wartość latitude"
    }

    latCorrect = correctLat(float(data['latitude']))
    if latCorrect == False:
        return ErrorHendling(content, err=e)

    lngCorrect = correctLng(float(data['longitude']))
    if lngCorrect == False:
        content['text'] = "Błędna wartość longitude"
        content['code'] = "0178"
        content['detail'] = "Bad request. Wrong longitude"
        return ErrorHendling(content, err=e)

    if data['add']:
        try:
            areaAlreadyExists = Areas.objects.filter(name=data['name']).exists()
        except Exception as e:
            content['text'] = "Błąd przy sprawdzeniu niepowtarzalnej nazwy obszaru sprzedaży w tabeli Areas"
            content['code'] = "0179"
            content['detail'] = "Bad request. Area not added"
            return ErrorHendling(content, err=e)
    else:
        areaAlreadyExists=False
    
    if data['add']:
        try:
            NIPAlreadyExists = Areas.objects.filter(nip=data['nip']).exists()
        except Exception as e:
            content['text'] = "Błąd przy sprawdzeniu niepowtarzalnego NIP dla obszaru sprzedaży w tabeli Areas"
            content['code'] = "0180"
            content['detail'] = "Bad request. Area not added"
            return ErrorHendling(content, err=e)
    else:
        NIPAlreadyExists = False

    if areaAlreadyExists:
        content['text'] = "Nazwa obszaru sprzedaż już istnieje"
        content['code'] = "0181"
        content['detail'] = "Bad request. Area name already exist"
        return ErrorHendling(content, err=e)
    
    elif NIPAlreadyExists:
        content['text'] = "NIP obszaru sprzedaż już istnieje"
        content['code'] = "0182"
        content['detail'] = "Bad request. Area NIP already exist"
        return ErrorHendling(content, err=e)        
    
    elif data['add']:
        try:
            createdArea = Areas.objects.create(
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
        except Exception as e:
            content['text'] = "Błąd utworzenia nowego obiektu w tabeli Areas "
            content['code'] = "0183"
            content['detail'] = "Bad request. Area not added"
            return ErrorHendling(content, err=e)
    
    else:
        try:
            area = Areas.objects.get(id=data['id'])
        except Exception as e:
            content['text'] = "Błąd pobrania obiektu z tabeli Areas"
            content['code'] = "0184"
            content['detail'] = "Bad request. Area not edit"
            return ErrorHendling(content, err=e)
        try:
            areaARC = AreasARC.objects.create(
                id_areas = int(area.id),
                name = area.name,
                nip =  area.nip,
                city = area.city,
                street = area.street,
                no_building = area.no_building,
                post_code = area.post_code,
                post = area.post,
                latitude = area.latitude,
                longitude = area.longitude,
                date_of_entry = area.date_of_entry,
                date_of_change = area.date_of_change,
                creator = area.creator,
                modifier = area.modifier,
                is_active = area.is_active,
                bank_account = area.bank_account,
                type_of_change = area.type_of_change,
                archiver = data['creator']
            )
        except Exception as e:
            content['text'] = "Błąd utworzenia obiektu archiwalnego w tabeli AreasARC"
            content['code'] = "0185"
            return ErrorHendling(content, err=e)
        try:
            area.name=data['name'],
            area.nip = data['nip'],
            area.city = data['city'],
            area.street = data['street'],
            area.no_building = data['number'],
            area.post_code = data['postCode'],
            area.post = data['post'],
            area.latitude = data['latitude'],
            area.longitude = data['longitude'],
            area.modifier = data['creator'],
            area.bank_account = data['bankAccount']
            area.date_of_change = datetime.now()
            area.type_of_change = "modifying sales area data"
            area.save()
        except Exception as e:
            content['text'] = "Błąd aktualizacji obiektu w tabeli Areas"
            content['code'] = "0186"
            return ErrorHendling(content, err=e)

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
# error hendling - OK
def getShop(request, Id):

    content = {
        'function_name' : 'getShop',
        'code' : "0048",
        "detail": "Bad request. No objects in the table Shops for the selected shop",
        'text' : "Błąd pobrania obiektu dla wybranego sklepu z tabeli Shops"
    }
    try:
        shop = Shops.objects.get(id = Id) 
    except Exception as e:
        return ErrorHendling(content, err=e)
    try:
        seriaziler = ShopsSerializer(shop, many=False)
    except Exception as e:
        content['text'] = "Błąd serializacji danych z tabeli Shops"
        content['code'] = "0049"
        return ErrorHendling(content, err=e)
    
    return Response(seriaziler.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
# error hendling - OK
def getContacts(request, Id):

    content = {
        'function_name' : 'getContacts',
        'code' : "0158",
        "detail": "Bad request. No objects in the ShopsContact Shops for the selected shop",
        'text' : "Błąd pobrania listy obiektów dla wybranego sklepu z tabeli ShopsContact"
    }
    try:
        contacts = ShopsContact.objects.filter(id_shops=Id).order_by('name')
    except Exception as e:
        return ErrorHendling(content, err=e)
    try:
        seriaziler = ShopsContactSerializer(contacts, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji listy obiektów dla wybranego sklepu z tabeli ShopsContact"
        content['code'] = "0159"
        return ErrorHendling(content, err=e)

    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAreaContacts(request, Id):

    content = {
        'function_name' : 'getAreaContacts',
        'code' : "0199",
        "detail": "Bad request. No objects in the AreaContact  for the selected area",
        'text' : "Błąd pobrania listy obiektów dla wybranego obszaru sprzedaży z tabeli AreaContact"
    }

    try:
        contacts = AreaContact.objects.filter(id_area=Id).order_by('name')
    except Exception as e:
        return ErrorHendling(content, err=e)
    try:
        seriaziler = ShopsContactSerializer(contacts, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji listy obiektów dla wybranego obszaru sprzedaży z tabeli AreaContact"
        content['code'] = "0200"
        return ErrorHendling(content, err=e)

    return Response(seriaziler.data)    

@api_view(['GET'])
@permission_classes([IsAdminUser])
# error hendling - OK
def getSpots(request, Id):

    content = {
        'function_name' : 'getSpot',
        'code' : "0043",
        "detail": "Bad request. No objects in the table ShopsSpot for the selected shop",
        'text' : "Błąd pobrania obiektów dla okreslonego sklepu z tabeli ShopsSpot"
    }
    try:
        spots = ShopsSpot.objects.filter(id_shops=Id).order_by('name')
    except Exception as e:
        return ErrorHendling(content, err=e)
    try:
        for i in spots:
            i.city=cleanStr(i.city)
        seriaziler = ShopSpotsSerializer(spots, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji danych z tabeli ShopsSpot"
        content['code'] = "0044"
        return ErrorHendling(content, err=e)
    
    return Response(seriaziler.data)  

@api_view(['GET'])
@permission_classes([IsAdminUser])
# error hendling - OK
def getSpot(request, Id, typeSpot):

    content = {
        'function_name' : 'getSpot',
        'code' : "0039",
        "detail": "Bad request. No data for the selected object in the table ShopsSpot",
        'text' : "Błąd pobrania obiektu z tabeli ShopsSpot"
    }

    if typeSpot == "shop":
        try:
            spot = ShopsSpot.objects.get(id=Id)
        except Exception as e:
            return ErrorHendling(content, err=e)
        try:
            spot.city=cleanStr(spot.city)
            seriaziler = ShopSpotsSerializer(spot, many=False)
        except Exception as e:
            content['text'] = "Błąd serializacji danych z tabeli ShopsSpot"
            content['code'] = "0040"
            return ErrorHendling(content, err=e)

    elif typeSpot == "area":
        try:
            spot = AreasSpot.objects.get(id=Id)
        except Exception as e:
            content['text'] = "Błąd poboru dnych z tabeli AreasSpot"
            content['detail'] = "Bad request. No data for the selected object in the table AreasSpot"
            content['code'] = "0041"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = AreaSpotsSerializer(spot, many=False)
        except Exception as e:
            content['text'] = "Błąd serializacji danych z tabeli AreasSpot"
            content['detail'] = "Bad request. No data for the selected object in the table AreasSpot"
            content['code'] = "0042"
            return ErrorHendling(content, err=e)
    else:
        pass

    return Response(seriaziler.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def addShopContacts(request):
    data = request.data

    content = {
        'function_name' : 'addShopContacts',
        'code' : "0160",
        "detail": "Bad request. No add or update contact",
        'text' : "Błąd pobrania obiektu z tabeli Shops"
    }
    try:
        shop = Shops.objects.get(id=data['shop_id'])
    except Exception as e:
            return ErrorHendling(content, user=data['creator'], err=e)
    
    if data['editing']:
        try:
            shop_contact_editing = ShopsContact.objects.get(id=data['Id'])
        except Exception as e:
            content['text'] = "Błąd pobrania obiektu z tabeli ShopsContact"
            content['detail'] = "Bad request. No update contact"
            content['code'] = "0161"
            return ErrorHendling(content,user=data['creator'], err=e)

        # Saving archive data
        try:
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
        except Exception as e:
            content['text'] = "Błąd utworzenia obiektu archiwalnego w tabeli ShopsContactARC"
            content['code'] = "0162"
            ErrorHendling(content,user=data['creator'], err=e)

        # Data change
        try:
            shop_contact_editing.name = data['firstName']
            shop_contact_editing.surname = data['surname']
            shop_contact_editing.email = data['email']
            shop_contact_editing.phone = data['phone']
            shop_contact_editing.description = data['description']
            shop_contact_editing.date_of_change = datetime.now()
            shop_contact_editing.modifier = data['creator']
            shop_contact_editing.type_of_change = "Data change"
            shop_contact_editing.save()
        except Exception as e:
            content['text'] = "Błąd aktualizacji obiektu w tabeli ShopsContact"
            content['code'] = "0163"
            return ErrorHendling(content,user=data['creator'], err=e)
    
    else:
        try:
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
        except Exception as e:
            content['text'] = "Błąd utworzenia obiektu w tabeli ShopsContact"
            content['detail'] = "Bad request. No add contact"
            content['code'] = "0164"
            return ErrorHendling(content,user=data['creator'], err=e)
    try:
        shop_contacts=ShopsContact.objects.filter(id_shops=data['shop_id'])
    except Exception as e:
            content['text'] = "Błąd pobrania zaktualizowanej listy kontaktów z tabeli ShopsContact"
            content['detail'] = "Bad request. No get new list of contacts"
            content['code'] = "0165"
            return ErrorHendling(content,user=data['creator'], err=e)
    try:
        seriaziler = ShopsContactSerializer(shop_contacts, many=True)
    except Exception as e:
            content['text'] = "Błąd serializacji zaktualizowanej listy kontaktów z tabeli ShopsContact"
            content['detail'] = "Bad request. No get new list of contacts"
            content['code'] = "0166"
            return ErrorHendling(content,user=data['creator'], err=e)
    return Response(seriaziler.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def addAreaContacts(request):
    data = request.data
    area = Areas.objects.get(id=data['area_id'])

    content = {
        'function_name' : 'addAreaContacts',
        'code' : "0203",
        "detail": "Bad request.No udate areas contact",
        'text' : "Błąd pobrania obiektu z tabeli AreaContact"
    }
    
    if data['editing']:
        try:
            area_contact_editing = AreaContact.objects.get(id=data['Id'])
        except Exception as e:
            return ErrorHendling(content, user=data['creator'], err=e)
        # Saving archive data
        try:
            AreaContactARC.objects.create(
                id_area = data['area_id'],
                name = data['firstName'],
                surname = data['surname'],
                email = data['email'],
                phone = data['phone'],
                description = data['description'],
                date_of_entry = area_contact_editing.date_of_entry,
                creator = area_contact_editing.creator,
                is_active = area_contact_editing.is_active,
                date_of_change = area_contact_editing.date_of_change,
                type_of_change = area_contact_editing.type_of_change,
                modifier = area_contact_editing.modifier,
                id_contact = data['Id'],
                archiver = data['creator']
            )
        except Exception as e:
            content['text'] = "Błąd utworzenia obiektu archiwalnego w tabeli AreaContactARC"
            content['code'] = "0204"
            ErrorHendling(content,user=data['creator'], err=e)    

        # Data change
        try:
            area_contact_editing.name = data['firstName']
            area_contact_editing.surname = data['surname']
            area_contact_editing.email = data['email']
            area_contact_editing.phone = data['phone']
            area_contact_editing.description = data['description']
            area_contact_editing.date_of_change = datetime.now()
            area_contact_editing.modifier = data['creator']
            area_contact_editing.type_of_change = "Data change"

            area_contact_editing.save()   
        except Exception as e:
            content['text'] = "Błąd modyfilacji obiektu w tabeli AreaContact"
            content['code'] = "0205"
            return ErrorHendling(content,user=data['creator'], err=e)         
    else:
        # create arear contact
        try:
            area_contact = AreaContact.objects.create(
                id_area = area,
                name=data['firstName'],
                surname = data['surname'],
                email = data['email'],
                phone = data['phone'],
                creator = data['creator'],
                description =data['description'],
                is_active=True            
            )
        except Exception as e:
            content['text'] = "Błąd utworzenia obiektu w tabeli AreaContact"
            content['code'] = "0206"
            content['detail'] = "Bad request.No add areas contact"
            return ErrorHendling(content,user=data['creator'], err=e)
    try:
        area_contacts=AreaContact.objects.filter(id_area=data['area_id']) 
    except Exception as e:
        content['text'] = "Błąd pobrania zmodyfikowanej listy kontaktów dla wybranego obszaru sprzedaży"
        content['code'] = "0207"
        return ErrorHendling(content,user=data['creator'], err=e)   
    try:
        seriaziler = AreaContactSerializer(area_contacts, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji zmodyfikowanej listy kontaktów dla wybranego obszaru sprzedaży"
        content['code'] = "0208"
        return ErrorHendling(content,user=data['creator'], err=e)
   
    return Response(seriaziler.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def addShopSpot(request):
    data = request.data

    content = {
        'function_name' : 'addShopSpot',
        'code' : "0050",
        "detail": "Bad request.No added new spot",
        'text' : "Błąd pobrania obiektu z tabeli Shops"
    }

    if data['add']:
        try:
            shop = Shops.objects.get(id=data['id_shops'])
        except Exception as e:
            return ErrorHendling(content,data['creator'], err=e)
        try:
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
                range=data['range'],
                kind=data['kind'],
                pick_up_point=data['pick_up']
            )
        except Exception as e:
            content['text'] = "Błąd utworzenia nowego obiektu w tabeli ShopsSpot"
            content['code'] = "0051"
            return ErrorHendling(content, data['creator'],err=e)
    else:
        try:
            spot = ShopsSpot.objects.get(id=data['id_spot'])
        except Exception as e:
            content['text'] = "Błąd poboru danych obiekt z tabeli ShopsSpot"
            content['detail'] = "Bad request. No updata selected object in the table ShopsSpot"
            content['code'] = "0052"
            return ErrorHendling(content, data['creator'],err=e)
         # add to archiv
        try:
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
                kind=spot.kind,
                pick_up_point=spot.pick_up_point,
                archiver = data['creator']
            )
        except Exception as e:
            content['text'] = "Błąd utworzenia obiektu ARC z tabeli ShopsSpotARC"
            content['detail'] = "Bad request. No updata selected object in the table ShopsSpot"
            content['code'] = "0053"
            ErrorHendling(content, data['creator'],err=e)
        # change data
        try:
            spot.name = data['name']
            spot.city=data['city'],
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
            spot.kind = data['kind']
            spot.pick_up_point=data['pick_up']

            spot.save()
        except Exception as e:
            content['text'] = "Błąd aktualizacji danych w tabeli ShopsSpot"
            content['detail'] = "Bad request. No updata selected object in the table ShopsSpot"
            content['code'] = "0054"
            return ErrorHendling(content, data['creator'],err=e)     
    try:
        spots=ShopsSpot.objects.filter(id_shops=data['id_shops']).order_by('name')
    except Exception as e:
        content['text'] = "Błąd poboru zaktualizowanej listy punktów sprzedaży"
        content['detail'] = "Bad request. No get new spot list"
        content['code'] = "0055"
        return ErrorHendling(content, data['creator'],err=e)
    try:
        for i in spots:
            i.city=cleanStr(i.city)
        seriaziler = ShopSpotsSerializer(spots, many=True) 
    except Exception as e:
        content['text'] = "Błąd serializacji zaktualizowanej listy punktów sprzedaży"
        content['detail'] = "Bad request. No get new spot list"
        content['code'] = "0056"
        return ErrorHendling(content, data['creator'],err=e)
    return Response(seriaziler.data)

@api_view(['POST', 'PUT'])
@permission_classes([IsAdminUser])
def addAreaSpot(request):
    data = request.data
    cit_obj = Citis.objects.get(id=data['city'])

    if data['add']:
        area = Areas.objects.get(id=data['id_area'])

        spot=AreasSpot.objects.create(
            id_area=area,
            name=data['name'],
            city=cit_obj,
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
        spot = AreasSpot.objects.get(id=data['id_area'])
    
         # add to archiv
        spotARC = AreasSpotARC.objects.create(
        id_shops = data['id_area'],
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
        spot.city=cit_obj,
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

    spots=AreasSpot.objects.filter(id_area=data['id_area']).order_by('name')
    seriaziler = AreaSpotsSerializer(spots, many=True) 
    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAreaSpots(request, Id):

    content = {
        'function_name' : 'getAreaSpots',
        'code' : "0201",
        "detail": "Bad request. No area spot list",
        'text' : "Błąd pobrania listy obiektów z tabeli AreasSpot"
    }
    try:
        spots = AreasSpot.objects.filter(id_area=Id).order_by('name')
    except Exception as e:
        return ErrorHendling(content, err=e)
    try:
        seriaziler = AreaSpotsSerializer(spots, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji listy obiektów z tabeli AreasSpot"
        content['code'] = "0202"
        return ErrorHendling(content, err=e)

    return Response(seriaziler.data)  

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getShops(request):

    content = {
        'function_name' : 'getShops',
        'code' : "0170",
        "detail": "Bad request. No shops list",
        'text' : "Błąd pobrania obiektów z tabeli Shops"
    }
    try:
        shops = Shops.objects.all().order_by('name') 
    except Exception as e:
        return ErrorHendling(content, err=e)
    try:
        seriaziler = ShopsSerializer(shops, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji listy sklepów"
        content['code'] = "0171"
        return ErrorHendling(content, err=e)

    return Response(seriaziler.data)

# @api_view(['GET'])
# @permission_classes([IsAdminUser])
# def getShops(request):
#     shops = Shops.objects.all().order_by('name') 
#     seriaziler = ShopsSerializer(shops, many=True)

#     return Response(seriaziler.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def addShop(request):
    data = request.data

    shopAlreadyExists = Shops.objects.filter(name=data['name']).exists()
    NIPAlreadyExists = Shops.objects.filter(nip=data['nip']).exists()

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

    alreadyExists = ProductTypes.objects.filter(name=data['name']).exists()

    if alreadyExists:
        content = {"detail": "Product type already exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        product_type = ProductTypes.objects.create(
            name=data['name'],
            creator = data['creator'],
            is_active=True
        )

        new_type_product=ProductTypes.objects.get(name=data['name'])
        seriaziler = ProductTypeSerializer(new_type_product, many=False)
        return Response(seriaziler.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getCites(request, Id, param):

    if param == "all":
        cities = Citis.objects.filter(id_district = Id) 
    else:
        cities = Citis.objects.filter(id_district = Id, is_active = True)
    seriaziler = CitiesSerializer(cities, many=True)
    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllCities(request):
    cities = Citis.objects.all().order_by('name') 
    seriaziler = CitiesSerializer(cities, many=True)

    return Response(seriaziler.data)    

@api_view(['POST'])
@permission_classes([IsAdminUser])
def addCiti(request):
    data = request.data
    
    latCorrect = correctLat(float(data['lat']))
    if latCorrect == False:
        content = {"detail": "Wrong latitude value"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    lngCorrect = correctLng(float(data['lng']))
    if lngCorrect == False:
        content = {"detail": "Wrong longitude value"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

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
            latitude = data['lat'],
            longitude = data['lng'],
            is_active=True,
            language = data['country']
        )
        newdciti=Citis.objects.filter(name=data['name'], id_district=data['desc_id'])
        seriaziler = CitiesSerializer(newdciti, many=True)
        return Response(seriaziler.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def activeList(request):
    
    data=request.data

    content = {
        'function_name' : 'activeList',
        'code' : "XXXX",
        "detail": "Bad request. No change active flag",
        'text' : ""
    }

    if data['objType']=='DISTRICT':
        descrip = Districts.objects.get(id=data['Id'])
    elif data['objType']=='CITY':
        descrip = Citis.objects.get(id=data['Id'])
    
    elif data['objType']=='SHOP':
        try:
            descrip = Shops.objects.get(id=data['Id'])
        except Exception as e:
            content['text'] = "Błąd poboru danych obiekt z tabeli Shops"
            content['code'] = "0172"
            return ErrorHendling(content, user=data['userId'], err=e)
    
    elif data['objType']=='SHOP_CONTACT':
        try:
            descrip = ShopsContact.objects.get(id=data['Id'])
        except Exception as e:
            content['text'] = "Błąd poboru danych obiekt z tabeli ShopsContact"
            content['code'] = "0167"
            return ErrorHendling(content, user=data['userId'], err=e)
        try:
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
        except Exception as e:
            content['text'] = "Błąd utworzenia obiektu archiwalnego w tabeli ShopsContactARC"
            content['code'] = "0168"
            ErrorHendling(content, user=data['userId'], err=e)
    
    elif data['objType']=='SHOP_SPOT':
        try:
            descrip = ShopsSpot.objects.get(id=data['Id'])
        except Exception as e:
            content['text'] = "Błąd poboru danych obiekt z tabeli ShopsSpot"
            content['code'] = "0170"
            return ErrorHendling(content, user=data['userId'], err=e)
        try:
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
        except Exception as e:
            content['text'] = "Błąd utworzenia obiektu archiwalnego w tabeli ShopsSpotARC"
            content['code'] = "0171"
            ErrorHendling(content, user=data['userId'], err=e)
    
    elif data['objType']=='AREA':
        try: 
            descrip = Areas.objects.get(id=data['Id'])
        except Exception as e:
            content['text'] = "Błąd poboru danych obiekt z tabeli Areas"
            content['code'] = "0173"
            return ErrorHendling(content, user=data['userId'], err=e)
        try:
            AreasARC.objects.create(
                id_areas = int(descrip.id),
                name = descrip.name,
                nip =  descrip.nip,
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
                modifier = descrip.modifier,
                is_active = descrip.is_active,
                bank_account = descrip.bank_account,
                type_of_change = descrip.type_of_change,
                archiver = data['userId']
            )
        except Exception as e:
            content['text'] = "Błąd utworzenia obiektu archiwalnego w tabeli AreasARC"
            content['code'] = "0174"
            ErrorHendling(content, user=data['userId'], err=e)
    
    elif data['objType'] == "AREA_CONTACT":
        try:
            descrip = AreaContact.objects.get(id=data['Id'])
        except Exception as e:
            content['text'] = "Błąd poboru danych obiekt z tabeli AreaContact"
            content['code'] = "0197"
            return ErrorHendling(content, user=data['userId'], err=e)
    
    elif data['objType'] == "AREA_SPOT":
        try:
            descrip = AreasSpot.objects.get(id=data['Id'])
        except Exception as e:
            content['text'] = "Błąd poboru danych obiekt z tabeli AreasSpot"
            content['code'] = "0198"
            return ErrorHendling(content, user=data['userId'], err=e)
    
    elif data['objType'] == "PRODUCT_CAT":
        descrip = ProductTypes.objects.get(id=data["Id"])
    elif data['objType'] == "PRODUCT_SUBCAT":
        descrip = ProductSubTypes.objects.get(id=data["Id"])    
    elif data['objType'] == "PRODUCTS":
        descrip = Product.objects.get(id=data["Id"])         
    else:
        content['text'] = "Błędna lista parametrów funkcji"
        content['code'] = "0108"
        content['detail'] = "Changing the active flag - no object type"
        return ErrorHendling(content) 
    
    try:
        if data['active']:
            descrip.is_active=True
        else:
            descrip.is_active=False
        descrip.type_of_change = data['kind']
        descrip.modifier=data['userId']
        descrip.save()
    except Exception as e:
        content['text'] = "Błąd aktualizacji obiektu dla przypadku : " + data['objType']
        content['code'] = "0169"
        return ErrorHendling(content, user=data['userId'], err=e)

    return Response(data['objType'])


@api_view(['GET'])
@permission_classes([AllowAny])
def getDiscrict(request, lat, lng):
    data = request.data
    discricts = Districts.objects.filter(is_active=True).order_by('name')

    newDiscricts=[]

    # print('proba-->',getDistanceBetweenPointsNew(float(lat),float(lng), 50.144392116571424, 19.423779965030423))

    for i in discricts:
        if getDistanceBetweenPointsNew(float(lat),float(lng), float(i.latitude),float(i.longitude)) < 100: 
              newDiscricts.append(i)      
    seriaziler = DistrictsSerializer(newDiscricts, many=True)

    return Response(seriaziler.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def getFullDiscricts(request,param):

    content = {
        'function_name' : 'getFullDiscricts',
        'code' : "0209",
        "detail": "Bad request. No distrcts list",
        'text' : "Błąd pobrania listy wszystkich powiatów z tabeli Districts"
    }

    if param == 'all':
        try:
            discricts = Districts.objects.all().order_by('name')
        except Exception as e:
            return ErrorHendling(content ,err=e)
    else:
        try:
            discricts = Districts.objects.filter(is_active=True).order_by('name')
        except Exception as e:
            content['text'] = "Błąd pobrania listy aktywnych powiatów z tabeli Districts"
            content['code'] = "0210"
            return ErrorHendling(content, err=e)
    try:
        seriaziler = DistrictsSerializer(discricts, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji listy  powiatów z tabeli Districts"
        content['code'] = "0211"
        return ErrorHendling(content, err=e)
    
    return Response(seriaziler.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def addDiscrict(request):
    data = request.data

    latCorrect = correctLat(float(data['lat']))
    if latCorrect == False:
        content = {"detail": "Wrong latitude value"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    lngCorrect = correctLng(float(data['lng']))
    if lngCorrect == False:
        content = {"detail": "Wrong longitude value"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    alreadyExists = Districts.objects.filter(name=data['name']).exists()
    if alreadyExists:
        content = {"detail": "Disctrict already exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        district = Districts.objects.create(
            name=data['name'],
            creator = data['creator'],
            is_active=True,
            latitude=data['lat'],
            longitude=data['lng']
        )
        newdistrict=Districts.objects.filter(name=data['name'])
        seriaziler = DistrictsSerializer(newdistrict, many=True)
        return Response(seriaziler.data)

# PRODUCT      

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def sortByLng(request):
    data = request.data
    sortedProductCat = ProductTypes.objects.filter(language=data['language']).order_by('name')
    seriaziler = ProductTypeSerializer(sortedProductCat, many=True)
    return Response(seriaziler.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def addProductCat(request):
    data = request.data
    alreadyExists = ProductTypes.objects.filter(name=data['name']).exists()
    if alreadyExists:
        existCategory = ProductTypes.objects.filter(name=data['name'])
        for i in existCategory:
            if i.language == data['language']:
                content = {"detail": "Product category already exist"}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)  
    
    productCat = ProductTypes.objects.create(
        name=data['name'],
        creator = data['creator'],
        is_active=True,
        language = data['language'],
        uniqueId = data['uniqueId']
    )   

    newProductCat=ProductTypes.objects.filter(name=data['name'])
    seriaziler = ProductTypeSerializer(newProductCat, many=True)
    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getProductCategories(request):

    content = {
        'function_name' : 'getProductCategories',
        'code' : "0090",
        "detail": "Bad request. No categories list",
        'text' : "Błąd pobrania listy obiektów z tabeli ProductTypes"
    }
    try:
        productCat = ProductTypes.objects.all().order_by('name')
    except Exception as e:
        return ErrorHendling(content ,err=e)

    for i in productCat : 
        i.name = cleanStr(i.name)
        i.language = cleanStr(i.language)
    
    try:
        seriaziler = ProductTypeSerializer(productCat, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji listy obiektów z tabeli ProductTypes"
        content['code'] = "0091"
        return ErrorHendling(content, err=e)
    
    return Response(seriaziler.data)       


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getProductSubcategories(request, Id):

    content = {
        'function_name' : 'getProductSubcategories',
        'code' : "0088",
        "detail": "Bad request. No Subcategories list",
        'text' : "Błąd pobrania listy obiektów z tabeli ProductSubTypes"
    }
    try:
        productSubCat = ProductSubTypes.objects.filter(id_product_type=Id).order_by('name')
    except Exception as e:
        return ErrorHendling(content ,err=e)   
    try: 
        seriaziler = SubproductTypeSerializer(productSubCat, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji listy obiektów z tabeli ProductSubTypes"
        content['code'] = "0089"
        return ErrorHendling(content, err=e)
    
    return Response(seriaziler.data)  


@api_view(['POST'])
@permission_classes([IsAdminUser])
def addProductSubcat(request):
    data = request.data
    alreadyExists = ProductSubTypes.objects.filter(name=data['name']).exists()
    productCat = ProductTypes.objects.all().order_by('name')
    # productCat = ProductTypes.objects.get(id==data['subcategoryId'])

    for i in productCat :
        if data['subcategoryId'] == i.id :
            subCat = i

    if alreadyExists:
        existSubcategory = ProductSubTypes.objects.filter(name=data['name'])
        for i in existSubcategory:
            if i.id_product_type.language == subCat.language:
                content = {"detail": "Product subcategory already exist"}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)   

    productSubcat = ProductSubTypes.objects.create(
        name=data['name'],
        creator = data['creator'],
        uniqueId = data['uniqueId'],
        is_active=True,
        id_product_type_id = subCat.id
    )   
    return Response("okey")

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def edit_subcategory(request):
    try: 
        data = request.data
        subcategory_obj = ProductSubTypes.objects.get(id=data['editSubcategoryId'])
        subcategory_obj.name = data['name']
        subcategory_obj.date_of_change = datetime.now()
        subcategory_obj.modifier = data['modifier']
        subcategory_obj.save()
        return Response({'message': 'Subcategory updated successfully'}, status=status.HTTP_200_OK)
    except ProductSubTypes.DoesNotExist:
        return Response({'message': 'Subcategory not found'}, status=status.HTTP_404_NOT_FOUND)
    except serializers.ValidationError as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)        

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_single_instance(request, Id, typeActivity):

    if typeActivity == 'subcategory':
        single_instance = ProductSubTypes.objects.filter(id=Id).first()
        serializer = SubproductTypeSerializer(single_instance)
    elif typeActivity == 'PRODUCT_CAT':
        single_instance = ProductTypes.objects.filter(id=Id).first()
        serializer = ProductTypeSerializer(single_instance)
    elif typeActivity == 'PRODUCT':
        single_instance = Product.objects.filter(id=Id).first()
        serializer = ProductsSerializer(single_instance)        
    else:
        raise Http404('Invalid typeActivity')

    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_single_instance(request):
    data = request.data

    # , id_product_subtype.id_product_type.language=data['lng']

    alreadyExists = Product.objects.filter(name=data['name']).exists()

    if alreadyExists:
        existProduct = Product.objects.filter(name=data['name'])
        for i in existProduct:
            if i.id_product_subtype.id_product_type.language == data['lng']:
                content = {"detail": "Product with this name already exist"}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

    try:
        if data['typeActivity'] == 'PRODUCT':
            sub_product = ProductSubTypes.objects.get(id=data['subcategoryId'])
            product = Product.objects.create(
                id_product_subtype=sub_product,
                name=data['name'],
                creator=data['creator'],
                is_active=True,
            )
            seriaziler = ProductsSerializer(product)
            return Response(seriaziler.data)
    except ProductSubTypes.DoesNotExist:
        content = {"detail": "Product subcategory not found"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)            
    except IntegrityError:
        content = {"detail": "Product with this name already exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def update_single_instance(request):
    data = request.data
        
    alreadyExists = Product.objects.filter(name=data['name']).exists()

    if alreadyExists:
        existProduct = Product.objects.filter(name=data['name'])
        for i in existProduct:
            if i.id_product_subtype.id_product_type.language == data['lng']:
                content = {"detail": "Product with this name already exist"}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.get(id=data['Id'])
        product.name=data['name']
        product.modifier=data['modifier']
        product.date_of_change=datetime.now()
        product.save()     
        return Response("OK")
    except ProductSubTypes.DoesNotExist:
        content = {"detail": "Product not found"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)            
    except IntegrityError:
        content = {"detail": "Product with this name already exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
