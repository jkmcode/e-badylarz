
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView
from django.core.files import File
from PIL import Image
from io import BytesIO

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


# @api_view(["PUT"])
# def uploadMultiImages(request):
    # data = request.data
    # taxNo = data["taxNo"]
    # shop = Shops.objects.get(nip=taxNo)
    
    # Get the uploaded file
    # image = request.FILES.get('image')
    # Get the desired width and height
    # width = data.get('width',200)
    # height = data.get('height',200)
   
    # if not image:
    #     return Response("Image not found")
    # Open image
    # image = Image.open(BytesIO(image.read()))
    # Resize the image
    # image = image.resize((width, height), Image.ANTIALIAS)

    # Save image
    # image.save(image.name, 'JPEG')

    # Assign the resized image to the shop object
    # shop.photo = image_file
    # shop.save()

    # return Response("Image was uploaded")

@api_view(["PUT"])
def uploadMultiImages(request):

    data = request.data
    taxNo = data["taxNo"]

    shop = Shops.objects.get(nip=taxNo)

    shop.photo = request.FILES.get('image')
    shop.save()

    print('działa views: uploadMultiImages')

    return Response("Image was uploaded")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAreas(request):

    areas = Areas.objects.all().order_by('name')

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

    seriaziler = AreasSerializer(areas, many=True)
    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAreaToEdit(request, Id): 

    area = Areas.objects.get(id=Id)

    area.name = cleanStr(area.name)
    area.nip = cleanStr(area.nip)
    area.city = cleanStr(area.city)
    area.street = cleanStr(area.street)
    area.no_building = cleanStr(area.no_building)
    area.post_code = cleanStr(area.post_code)
    area.post = cleanStr(area.post)
    area.latitude = cleanStr(area.latitude)
    area.longitude = cleanStr(area.longitude)

    seriaziler = AreasSerializer(area, many=False)
    return Response(seriaziler.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def addArea(request):
    
    data = request.data

    latCorrect = correctLat(float(data['latitude']))
    if latCorrect == False:
        content = {"detail": "Wrong latitude value"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    lngCorrect = correctLng(float(data['longitude']))
    if lngCorrect == False:
        content = {"detail": "Wrong longitude value"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    if data['add']:
        areaAlreadyExists = Areas.objects.filter(name=data['name']).exists()
    else:
        areaAlreadyExists=False
    
    if data['add']:
        NIPAlreadyExists = Areas.objects.filter(nip=data['nip']).exists()
    else:
        NIPAlreadyExists = False

    if areaAlreadyExists:
        content = {"detail": "Sales area with this name already exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    elif NIPAlreadyExists:
        content = {"detail": "NIP already exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)        
    elif data['add']:
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
    else:
        area = Areas.objects.get(id=data['id'])
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
def getAreaContacts(request, Id):
    contacts = AreaContact.objects.filter(id_area=Id).order_by('name')
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
def getSpot(request, Id, typeSpot):

    if typeSpot == "shop":
        spot = ShopsSpot.objects.get(id=Id)
        seriaziler = ShopSpotsSerializer(spot, many=False)

    if typeSpot == "area":
        spot = AreasSpot.objects.get(id=Id)
        seriaziler = AreaSpotsSerializer(spot, many=False)

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

@api_view(['POST'])
@permission_classes([IsAdminUser])
def addAreaContacts(request):
    data = request.data
    area = Areas.objects.get(id=data['area_id'])
    
    if data['editing']:
        area_contact_editing = AreaContact.objects.get(id=data['Id'])
        
        # Saving archive data
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

        # Data change
        area_contact_editing.name = data['firstName']
        area_contact_editing.surname = data['surname']
        area_contact_editing.email = data['email']
        area_contact_editing.phone = data['phone']
        area_contact_editing.description = data['description']
        area_contact_editing.date_of_change = datetime.now()
        area_contact_editing.modifier = data['creator']
        area_contact_editing.type_of_change = "Data change"

        area_contact_editing.save()            
    else:
        # create arear contact
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

    area_contacts=AreaContact.objects.filter(id_area=data['area_id'])    
    seriaziler = AreaContactSerializer(area_contacts, many=True)
    return Response(seriaziler.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getShops(request):
    shops = Shops.objects.all().order_by('name') 
    seriaziler = ShopsSerializer(shops, many=True)

    return Response(seriaziler.data)

@api_view(['POST', 'PUT'])
@permission_classes([IsAdminUser])
def addShopSpot(request):
    data = request.data

    cit_obj = Citis.objects.get(id=data['city'])

    if data['add']:
        shop = Shops.objects.get(id=data['id_shops'])

        spot=ShopsSpot.objects.create(
            id_shops=shop,
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

    spots=ShopsSpot.objects.filter(id_shops=data['id_shops']).order_by('name')
    seriaziler = ShopSpotsSerializer(spots, many=True) 
    return Response(seriaziler.data)

@api_view(['POST', 'PUT'])
@permission_classes([IsAdminUser])
def addAreaSpot(request):
    data = request.data
    print('data---------', data)
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
    spots = AreasSpot.objects.filter(id_area=Id).order_by('name')
    seriaziler = AreaSpotsSerializer(spots, many=True)

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
    elif data['objType']=='AREA': 
        descrip = Areas.objects.get(id=data['Id'])
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
    elif data['objType'] == "AREA_CONTACT":
        descrip = AreaContact.objects.get(id=data['Id'])

    elif data['objType'] == "AREA_SPOT":
        descrip = AreasSpot.objects.get(id=data['Id'])

    else:
        content = {"detail": "Changing the active flag - no object type"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST) 
    
    if data['active']:
        descrip.is_active=True
    else:
        descrip.is_active=False

    descrip.type_of_change = data['kind']
    descrip.modifier=data['userId']

    descrip.save()

    return Response(data['objType'])

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getFullDescriptionsDesc(request, Id, obj_type):
    
    print('sprawdzam ---->',obj_type,'ID---->',Id)
    if obj_type=='DISTRICT':
        descrition = Descriptions.objects.filter(id_district = Id) 
        seriaziler = DistrictsDescSerializer(descrition, many=True)
    elif obj_type=='CITY':
        descrition = CitiesDescriptions.objects.filter(id_city = Id)
        seriaziler = CitiesDescSerializer(descrition, many=True)
    else:
        content = {"detail": "Changing the active flag - no object type"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


    return Response(seriaziler.data)

@api_view(['POST', 'PUT'])
@permission_classes([IsAdminUser])
def addDesc(request):
    data=request.data

    if data["addDesc"]:
        disctrict_obj= Districts.objects.get(id=data['objId'])
        desc = Descriptions.objects.create(
        description=data['desc'],
        language=data['lng'],
        # obj_type=data['objType'],
        id_district=disctrict_obj,
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
    descrition = Descriptions.objects.filter(id_district = Id, language=lng) 
    seriaziler = DistrictsDescSerializer(descrition, many=True)
    return Response(seriaziler.data)


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
    data = request.data

    if param == 'all':
        discricts = Districts.objects.all().order_by('name')
    else:
        discricts = Districts.objects.filter(is_active=True).order_by('name')
    
    seriaziler = DistrictsSerializer(discricts, many=True)
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


