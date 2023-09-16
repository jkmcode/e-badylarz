from base.serializer import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import status

from datetime import datetime

from base.Views.views_panel import *


# uruchamiany przy pobieraniu informacji do przycisku INFO
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getFullDescriptionsDesc(request, Id, obj_type):

    content = {
        'function_name' : 'getFullDescriptionsDesc',
        'code' : "0092",
        "detail": "Bad request. No info",
        'text' : "Błąd pobrania listy obiektów z tabeli Descriptions"
    }
    
    if obj_type=='DISTRICT':
        try:
            descrition = Descriptions.objects.filter(id_district = Id).order_by('language') 
        except Exception as e:
            return ErrorHendling(content, err=e)
        try:
            seriaziler = DistrictsDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli Descriptions"
            content['code'] = "0093"
            return ErrorHendling(content, err=e)
    
    elif obj_type=='CITY':
        try:
            descrition = CitiesDescriptions.objects.filter(id_city = Id).order_by('language')
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli CitiesDescriptions"
            content['code'] = "0094"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = CitiesDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli CitiesDescriptions"
            content['code'] = "0095"
            return ErrorHendling(content, err=e)
    
    elif obj_type=='SHOP':
        try:
            descrition = ShopsDescriptions.objects.filter(id_shops = Id).order_by('language')
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli ShopsDescriptions"
            content['code'] = "0096"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = ShopDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli ShopsDescriptions"
            content['code'] = "0097"
            return ErrorHendling(content, err=e)

    elif obj_type=='SPOT':
        try:
            descrition = ShopsSpotDescriptions.objects.filter(id_shops_spot = Id).order_by('language')
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli ShopsSpotDescriptions"
            content['code'] = "0098"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = ShopSpotDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli ShopsSpotDescriptions"
            content['code'] = "0099"
            return ErrorHendling(content, err=e)
        
    elif obj_type=='PROUCT':
        try:
            descrition = ProductDescriptions.objects.filter(id_product = Id).order_by('language')
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli ProductDescriptions"
            content['code'] = "0100"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = ProductDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli ProductDescriptions"
            content['code'] = "0101"
            return ErrorHendling(content, err=e)
        
    elif obj_type=='PROUCT_TYPE':
        try:
            descrition = ProductTypesDescriptions.objects.filter(id_product_type = Id).order_by('language')
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli ProductTypesDescriptions"
            content['code'] = "0102"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = ProductTypesDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli ProductTypesDescriptions"
            content['code'] = "0103"
            return ErrorHendling(content, err=e)
        
    elif obj_type=='PRODUCT_SUBCAT':
        try:
            descrition = ProductSubtypesDescriptions.objects.filter(id_product_subtype = Id).order_by('language')
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli ProductSubtypesDescriptions"
            content['code'] = "0104"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = ProductSubTypesDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli ProductSubtypesDescriptions"
            content['code'] = "0105"
            return ErrorHendling(content, err=e)
        
    elif obj_type=='MY_PROUCT':
        try:
            descrition = MyProductsDescriptions.objects.filter( id_my_product = Id).order_by('language')
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli MyProductsDescriptions"
            content['code'] = "0106"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = MyProductDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli MyProductsDescriptions"
            content['code'] = "0107"
            return ErrorHendling(content, err=e)
    else:
        content['text'] = "Błędna lista parametrów funkcji"
        content['code'] = "0108"
        content['detail'] = "Changing the active flag - no object type"
        return ErrorHendling(content, err=e)

    return Response(seriaziler.data)

# dodanie lub modyfikacja opisu dla wybranych również zapisanie danych archiwalnych
@api_view(['POST', 'PUT'])
@permission_classes([IsAdminUser])
def addDesc(request):
    data=request.data

    content = {
        'function_name' : 'addDesc',
        'code' : "00109",
        "detail": "Bad request. Info no added",
        'text' : "Błąd pobrania obiektu z tabeli Districts"
    }

    if data['objType']== "DISTRICT":
        if data["addDesc"]:
            try:
                disctrict_obj= Districts.objects.get(id=data['objId'])
            except Exception as e:
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                desc = Descriptions.objects.create(
                    description=data['desc'],
                    language=data['lng'],
                    id_district=disctrict_obj,
                    creator=data['id']
                )
            except Exception as e:
                content['text'] = "Błąd utworzenia obiektu w tabeli Descriptions"
                content['code'] = "0110"
                return ErrorHendling(content, user=data['id'],err=e)
        else:
            try:
                descrip = Descriptions.objects.get(id=data['descId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli Descriptions"
                content['code'] = "0111"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                descrip.description=data['desc']
                descrip.date_of_change=datetime.now()
                descrip.modifier=data['id']
                descrip.save()
            except Exception as e:
                content['text'] = "Błąd aktualizacji obiektu w tabeli Descriptions"
                content['code'] = "0112"
                return ErrorHendling(content, user=data['id'],err=e)
    
    elif data['objType']== "CITY":
        if data["addDesc"]:
            try:
                city_obj= Citis.objects.get(id=data['objId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli Citis"
                content['code'] = "0113"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                desc = CitiesDescriptions.objects.create(
                    description=data['desc'],
                    language=data['lng'],
                    id_city=city_obj,
                    creator=data['id']
                )
            except Exception as e:
                content['text'] = "Błąd utworzenia obiektu w tabeli CitiesDescriptions"
                content['code'] = "0114"
                return ErrorHendling(content, user=data['id'],err=e)
        else:
            try:
                descrip = CitiesDescriptions.objects.get(id=data['descId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli CitiesDescriptions"
                content['code'] = "0115"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                descrip.description=data['desc']
                descrip.date_of_change=datetime.now()
                descrip.modifier=data['id']
                descrip.save()
            except Exception as e:
                content['text'] = "Błąd aktualizacji obiektu w tabeli CitiesDescriptions"
                content['code'] = "0116"
                return ErrorHendling(content, user=data['id'],err=e)

    elif data['objType']== "SHOP":
        if data["addDesc"]:
            try:
                shop_obj= Shops.objects.get(id=data['objId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli Shops"
                content['code'] = "0117"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                desc = ShopsDescriptions.objects.create(
                    description=data['desc'],
                    language=data['lng'],
                    id_shops=shop_obj,
                    creator=data['id']
                )
            except Exception as e:
                content['text'] = "Błąd utworzenia obiektu w tabeli ShopsDescriptions"
                content['code'] = "0118"
                return ErrorHendling(content, user=data['id'],err=e)
        else:
            try:
                descrip = ShopsDescriptions.objects.get(id=data['descId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli ShopsDescriptions"
                content['code'] = "0119"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                descrip.description=data['desc']
                descrip.date_of_change=datetime.now()
                descrip.modifier=data['id']
                descrip.save()
            except Exception as e:
                content['text'] = "Błąd aktualizacji obiektu w tabeli ShopsDescriptions"
                content['code'] = "0120"
                return ErrorHendling(content, user=data['id'],err=e)
    
    elif data['objType']== "SPOT":
        if data["addDesc"]:
            try:
                spot_obj= ShopsSpot.objects.get(id=data['objId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli ShopsSpot"
                content['code'] = "0121"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                desc = ShopsSpotDescriptions.objects.create(
                    description=data['desc'],
                    language=data['lng'],
                    id_shops_spot=spot_obj,
                    creator=data['id']
                )
            except Exception as e:
                content['text'] = "Błąd utworzenia obiektu w tabeli ShopsSpotDescriptions"
                content['code'] = "0122"
                return ErrorHendling(content, user=data['id'],err=e)
        else:
            try:
                descrip = ShopsSpotDescriptions.objects.get(id=data['descId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli ShopsSpotDescriptions"
                content['code'] = "0123"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                descrip.description=data['desc']
                descrip.date_of_change=datetime.now()
                descrip.modifier=data['id']
                descrip.save()
            except Exception as e:
                content['text'] = "Błąd aktualizacji obiektu w tabeli ShopsSpotDescriptions"
                content['code'] = "0124"
                return ErrorHendling(content, user=data['id'],err=e)
    
    elif data['objType']== "PROUCT":
        if data["addDesc"]:
            try:
                product_obj= Product.objects.get(id=data['objId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli Product"
                content['code'] = "0125"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                desc = ProductDescriptions.objects.create(
                    description=data['desc'],
                    language=data['lng'],
                    id_product=product_obj,
                    creator=data['id']
                )
            except Exception as e:
                content['text'] = "Błąd utworzenia obiektu w tabeli ProductDescriptions"
                content['code'] = "0126"
                return ErrorHendling(content, user=data['id'],err=e)
        else:
            try:
                descrip = ProductDescriptions.objects.get(id=data['descId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli ProductDescriptions"
                content['code'] = "0127"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                descrip.description=data['desc']
                descrip.date_of_change=datetime.now()
                descrip.modifier=data['id']
                descrip.save()
            except Exception as e:
                content['text'] = "Błąd aktualizacji obiektu w tabeli ProductDescriptions"
                content['code'] = "0128"
                return ErrorHendling(content, user=data['id'],err=e)

    elif data['objType']== "PROUCT_TYPE":
        if data["addDesc"]:
            try:
                product_obj= ProductTypes.objects.get(id=data['objId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli ProductTypes"
                content['code'] = "0129"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                desc = ProductTypesDescriptions.objects.create(
                    description=data['desc'],
                    language=data['lng'],
                    id_product_type=product_obj,
                    creator=data['id']
                )
            except Exception as e:
                content['text'] = "Błąd utworzenia obiektu w tabeli ProductTypesDescriptions"
                content['code'] = "0130"
                return ErrorHendling(content, user=data['id'],err=e)
        else:
            try:
                descrip = ProductTypesDescriptions.objects.get(id=data['descId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli ProductTypesDescriptions"
                content['code'] = "0131"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                descrip.description=data['desc']
                descrip.date_of_change=datetime.now()
                descrip.modifier=data['id']
                descrip.save()
            except Exception as e:
                content['text'] = "Błąd aktualizacji obiektu w tabeli ProductTypesDescriptions"
                content['code'] = "0132"
                return ErrorHendling(content, user=data['id'],err=e)
    
    elif data['objType']== "PRODUCT_SUBCAT":
        if data["addDesc"]:
            try:
                product_obj= ProductSubTypes.objects.get(id=data['objId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli ProductSubTypes"
                content['code'] = "0133"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                desc = ProductSubtypesDescriptions.objects.create(
                    description=data['desc'],
                    language=data['lng'],
                    id_product_subtype=product_obj,
                    creator=data['id']
                )
            except Exception as e:
                content['text'] = "Błąd utworzenia obiektu w tabeli ProductSubtypesDescriptions"
                content['code'] = "0134"
                return ErrorHendling(content, user=data['id'],err=e)
        else:
            try:
                descrip = ProductSubtypesDescriptions.objects.get(id=data['descId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli ProductSubtypesDescriptions"
                content['code'] = "0135"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                descrip.description=data['desc']
                descrip.date_of_change=datetime.now()
                descrip.modifier=data['id']
                descrip.save()
            except Exception as e:
                content['text'] = "Błąd aktualizacji obiektu w tabeli ProductSubtypesDescriptions"
                content['code'] = "0136"
                return ErrorHendling(content, user=data['id'],err=e)
    
    elif data['objType']== "MY_PROUCT":
        if data["addDesc"]:
            try:
                product_obj= MyProducts.objects.get(id=data['objId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli MyProducts"
                content['code'] = "0137"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                desc = MyProductsDescriptions.objects.create(
                    description = data['desc'],
                    language = data['lng'],
                    id_my_product = product_obj,
                    creator = data['id']
                )
            except Exception as e:
                content['text'] = "Błąd utworzenia obiektu w tabeli MyProductsDescriptions"
                content['code'] = "0138"
                return ErrorHendling(content, user=data['id'],err=e)
        else:
            try:
                descrip = MyProductsDescriptions.objects.get(id=data['descId'])
            except Exception as e:
                content['text'] = "Błąd pobrania obiektu z tabeli MyProductsDescriptions"
                content['code'] = "0139"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
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
            except Exception as e:
                content['text'] = "Błąd utworzenia obiektu archiwalnego w tabeli MyProductsDescriptionsARC"
                content['code'] = "0140"
                return ErrorHendling(content, user=data['id'],err=e)
            try:
                descrip.description = data['desc']
                descrip.date_of_change = datetime.now()
                descrip.modifier = data['id']
                descrip.save()
            except Exception as e:
                content['text'] = "Błąd aktualizacji obiektu w tabeli MyProductsDescriptions"
                content['code'] = "0141"
                return ErrorHendling(content, user=data['id'],err=e)
    else:
        content['text'] = "Błędna lista parametrów funkcji"
        content['code'] = "0108"
        content['detail'] = "Changing the active flag - no object type"
        return ErrorHendling(content,user=data['id'], err=e)
    
    return Response("OK")

# uruchamiany po wyborze języka przy dodawaniu, modyfikacji opisu
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getDiscrictDesc(request, Id, lng, obj_type):

    content = {
        'function_name' : 'getDiscrictDesc',
        'code' : "00142",
        "detail": "Bad request. No descriptions",
        'text' : "Błąd pobrania listy obiektów z tabeli Districts"
        }

    if obj_type == "DISTRICT":
        try:
            descrition = Descriptions.objects.filter(id_district = Id, language=lng)
        except Exception as e:
            return ErrorHendling(content,err=e)
        try: 
            seriaziler = DistrictsDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli Districts"
            content['code'] = "0143"
            return ErrorHendling(content, err=e)
    
    elif obj_type == "CITY":
        try:
            descrition = CitiesDescriptions.objects.filter(id_city = Id, language=lng) 
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli CitiesDescriptions"
            content['code'] = "0144"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = CitiesDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli CitiesDescriptions"
            content['code'] = "0145"
            return ErrorHendling(content, err=e)
    
    elif obj_type=='SHOP':
        try:
            descrition = ShopsDescriptions.objects.filter(id_shops = Id, language=lng)
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli ShopsDescriptions"
            content['code'] = "0146"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = ShopDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli ShopsDescriptions"
            content['code'] = "0147"
            return ErrorHendling(content, err=e)
    
    elif obj_type=='SPOT':
        try:
            descrition = ShopsSpotDescriptions.objects.filter(id_shops_spot = Id, language=lng)
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli ShopsSpotDescriptions"
            content['code'] = "0148"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = ShopSpotDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli ShopsSpotDescriptions"
            content['code'] = "0149"
            return ErrorHendling(content, err=e)

    elif obj_type=='AREA':
        descrition = ShopsSpotDescriptions.objects.filter(id_shops_spot = Id, language=lng)
        seriaziler = ShopSpotDescSerializer(descrition, many=True)
    
    elif obj_type=='PROUCT':
        try:
            descrition = ProductDescriptions.objects.filter(id_product = Id, language=lng)
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli ProductDescriptions"
            content['code'] = "0150"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = ProductDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli ProductDescriptions"
            content['code'] = "0151"
            return ErrorHendling(content, err=e)
    
    elif obj_type=='PROUCT_TYPE':
        try:
            descrition = ProductTypesDescriptions.objects.filter(id_product_type = Id, language=lng)
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli ProductTypesDescriptions"
            content['code'] = "0152"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = ProductTypesDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli ProductTypesDescriptions"
            content['code'] = "0153"
            return ErrorHendling(content, err=e)
    
    elif obj_type=='PRODUCT_SUBCAT':
        try:
            descrition = ProductSubtypesDescriptions.objects.filter(id_product_subtype = Id, language=lng)
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli ProductSubtypesDescriptions"
            content['code'] = "0154"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = ProductSubTypesDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli ProductSubtypesDescriptions"
            content['code'] = "0155"
            return ErrorHendling(content, err=e)
    elif obj_type=='MY_PROUCT':
        try:
            descrition = MyProductsDescriptions.objects.filter(id_my_product = Id, language=lng)
        except Exception as e:
            content['text'] = "Błąd pobrania listy obiektów z tabeli MyProductsDescriptions"
            content['code'] = "0156"
            return ErrorHendling(content, err=e)
        try:
            seriaziler = MyProductDescSerializer(descrition, many=True)
        except Exception as e:
            content['text'] = "Błąd serializacji listy obiektów z tabeli MyProductsDescriptions"
            content['code'] = "0157"
            return ErrorHendling(content, err=e)
    else:
        content['text'] = "Błędna lista parametrów funkcji"
        content['code'] = "0108"
        content['detail'] = "Changing the active flag - no object type"
        return ErrorHendling(content, err=e)
    
    return Response(seriaziler.data)
   

