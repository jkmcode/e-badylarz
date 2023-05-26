from base.serializer import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import status

from datetime import datetime


# uruchamiany przy pobieraniu informacji do przycisku INFO
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getFullDescriptionsDesc(request, Id, obj_type):
    
    if obj_type=='DISTRICT':
        descrition = Descriptions.objects.filter(id_district = Id).order_by('language') 
        seriaziler = DistrictsDescSerializer(descrition, many=True)
    elif obj_type=='CITY':
        descrition = CitiesDescriptions.objects.filter(id_city = Id).order_by('language')
        seriaziler = CitiesDescSerializer(descrition, many=True)
    elif obj_type=='SHOP':
        descrition = ShopsDescriptions.objects.filter(id_shops = Id).order_by('language')
        seriaziler = ShopDescSerializer(descrition, many=True)
    elif obj_type=='SPOT':
        descrition = ShopsSpotDescriptions.objects.filter(id_shops_spot = Id).order_by('language')
        seriaziler = ShopSpotDescSerializer(descrition, many=True)
    elif obj_type=='PROUCT':
        descrition = ProductDescriptions.objects.filter(id_product = Id).order_by('language')
        seriaziler = ProductDescSerializer(descrition, many=True)
    elif obj_type=='PROUCT_TYPE':
        descrition = ProductTypesDescriptions.objects.filter(id_product_type = Id).order_by('language')
        seriaziler = ProductTypesDescSerializer(descrition, many=True)
    elif obj_type=='PRODUCT_SUBCAT':
        descrition = ProductSubtypesDescriptions.objects.filter(id_product_subtype = Id).order_by('language')
        seriaziler = ProductSubTypesDescSerializer(descrition, many=True)
    elif obj_type=='MY_PROUCT':
        descrition = MyProductsDescriptions.objects.filter( id_my_product = Id).order_by('language')
        seriaziler = MyProductDescSerializer(descrition, many=True)
    else:
        content = {"detail": "Changing the active flag - no object type"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    return Response(seriaziler.data)

# dodanie lub modyfikacja opisu dla wybranych również zapisanie danych archiwalnych
@api_view(['POST', 'PUT'])
@permission_classes([IsAdminUser])
def addDesc(request):
    data=request.data

    if data['objType']== "DISTRICT":
        if data["addDesc"]:
            disctrict_obj= Districts.objects.get(id=data['objId'])
            desc = Descriptions.objects.create(
            description=data['desc'],
            language=data['lng'],
            id_district=disctrict_obj,
            creator=data['id'])
        else:
            descrip = Descriptions.objects.get(id=data['descId'])
            descrip.description=data['desc']
            descrip.date_of_change=datetime.now()
            descrip.modifier=data['id']
            descrip.save()
    
    elif data['objType']== "CITY":
        if data["addDesc"]:
            city_obj= Citis.objects.get(id=data['objId'])
            desc = CitiesDescriptions.objects.create(
            description=data['desc'],
            language=data['lng'],
            id_city=city_obj,
            creator=data['id'])
        else:
            descrip = CitiesDescriptions.objects.get(id=data['descId'])
            descrip.description=data['desc']
            descrip.date_of_change=datetime.now()
            descrip.modifier=data['id']
            descrip.save()
    elif data['objType']== "SHOP":
        if data["addDesc"]:
            shop_obj= Shops.objects.get(id=data['objId'])
            desc = ShopsDescriptions.objects.create(
            description=data['desc'],
            language=data['lng'],
            id_shops=shop_obj,
            creator=data['id'])
        else:
            descrip = ShopsDescriptions.objects.get(id=data['descId'])
            descrip.description=data['desc']
            descrip.date_of_change=datetime.now()
            descrip.modifier=data['id']
            descrip.save()
    elif data['objType']== "SPOT":
        if data["addDesc"]:
            spot_obj= ShopsSpot.objects.get(id=data['objId'])
            desc = ShopsSpotDescriptions.objects.create(
            description=data['desc'],
            language=data['lng'],
            id_shops_spot=spot_obj,
            creator=data['id'])
        else:
            descrip = ShopsSpotDescriptions.objects.get(id=data['descId'])
            descrip.description=data['desc']
            descrip.date_of_change=datetime.now()
            descrip.modifier=data['id']
            descrip.save()
    elif data['objType']== "PROUCT":
        if data["addDesc"]:
            product_obj= Product.objects.get(id=data['objId'])
            desc = ProductDescriptions.objects.create(
            description=data['desc'],
            language=data['lng'],
            id_product=product_obj,
            creator=data['id'])
        else:
            descrip = ProductDescriptions.objects.get(id=data['descId'])
            descrip.description=data['desc']
            descrip.date_of_change=datetime.now()
            descrip.modifier=data['id']
            descrip.save()
    elif data['objType']== "PROUCT_TYPE":
        if data["addDesc"]:
            product_obj= ProductTypes.objects.get(id=data['objId'])
            desc = ProductTypesDescriptions.objects.create(
            description=data['desc'],
            language=data['lng'],
            id_product_type=product_obj,
            creator=data['id'])
        else:
            descrip = ProductTypesDescriptions.objects.get(id=data['descId'])
            descrip.description=data['desc']
            descrip.date_of_change=datetime.now()
            descrip.modifier=data['id']
            descrip.save()
    elif data['objType']== "PRODUCT_SUBCAT":
        if data["addDesc"]:
            product_obj= ProductSubTypes.objects.get(id=data['objId'])
            desc = ProductSubtypesDescriptions.objects.create(
            description=data['desc'],
            language=data['lng'],
            id_product_subtype=product_obj,
            creator=data['id'])
        else:
            descrip = ProductSubtypesDescriptions.objects.get(id=data['descId'])
            descrip.description=data['desc']
            descrip.date_of_change=datetime.now()
            descrip.modifier=data['id']
            descrip.save()
    elif data['objType']== "MY_PROUCT":
        if data["addDesc"]:
            product_obj= MyProducts.objects.get(id=data['objId'])
            desc = MyProductsDescriptions.objects.create(
            description = data['desc'],
            language = data['lng'],
            id_my_product = product_obj,
            creator = data['id'])
        else:
            descrip = MyProductsDescriptions.objects.get(id=data['descId'])
            descARC = MyProductsDescriptionsARC.objects.create(
                id_my_product = descrip.id,
                description =  descrip.description,
                language = descrip.language,
                date_of_entry = descrip.date_of_entry,
                date_of_change= descrip.date_of_change,
                creator = descrip.creator,
                modifier = descrip.modifier,
                archiver = data['id']
            )
            descrip.description = data['desc']
            descrip.date_of_change = datetime.now()
            descrip.modifier = data['id']
            descrip.save()
    else:
        content = {"detail": "Changing the active flag - no object type"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    return Response("OK")

# uruchamiany po wyborze języka przy dodawaniu, modyfikacji opisu
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getDiscrictDesc(request, Id, lng, obj_type):

    if obj_type == "DISTRICT":
        descrition = Descriptions.objects.filter(id_district = Id, language=lng) 
        seriaziler = DistrictsDescSerializer(descrition, many=True)
    elif obj_type == "CITY":
        descrition = CitiesDescriptions.objects.filter(id_city = Id, language=lng) 
        seriaziler = CitiesDescSerializer(descrition, many=True)
    elif obj_type=='SHOP':
        descrition = ShopsDescriptions.objects.filter(id_shops = Id, language=lng)
        seriaziler = ShopDescSerializer(descrition, many=True)
    elif obj_type=='SPOT':
        descrition = ShopsSpotDescriptions.objects.filter(id_shops_spot = Id, language=lng)
        seriaziler = ShopSpotDescSerializer(descrition, many=True)
    elif obj_type=='AREA':
        descrition = ShopsSpotDescriptions.objects.filter(id_shops_spot = Id, language=lng)
        seriaziler = ShopSpotDescSerializer(descrition, many=True)
    elif obj_type=='PROUCT':
        descrition = ProductDescriptions.objects.filter(id_product = Id, language=lng)
        seriaziler = ProductDescSerializer(descrition, many=True)
    elif obj_type=='PROUCT_TYPE':
        descrition = ProductTypesDescriptions.objects.filter(id_product_type = Id, language=lng)
        seriaziler = ProductTypesDescSerializer(descrition, many=True)
    elif obj_type=='PRODUCT_SUBCAT':
        descrition = ProductSubtypesDescriptions.objects.filter(id_product_subtype = Id, language=lng)
        seriaziler = ProductSubTypesDescSerializer(descrition, many=True)
    elif obj_type=='MY_PROUCT':
        descrition = MyProductsDescriptions.objects.filter(id_my_product = Id, language=lng)
        seriaziler = MyProductDescSerializer(descrition, many=True)
    else:
        content = {"detail": "Changing the active flag - no object type"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(seriaziler.data)
   

