from base.serializer import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import status

from datetime  import datetime
from dateutil import tz
import time
import random
import datetime

from django.core.paginator import Paginator
from django.http import Http404


def ErrorHendling(pos, user=None, err=None):
    pgcode = None
    pgerror = None
    add_log = True
    exception_class = None
    error_name = None

    if err:
        if hasattr(err, 'pgcode') and hasattr(err, 'pgerror'):
            pgcode = err.pgcode
            pgerr = str(err.pgerror)
            pgerror = pgerr[:510] if len(pgerr) > 510 else pgerr

        exception_class = type(err).__name__
        error_str = str(err)
        error_name = error_str[:510] if len(error_str) > 510 else error_str

    try:
        createdNewLog = ErrorLog.objects.create(
        user=user,
        function_name=pos['function_name'], 
        error_class=exception_class,
        error_name=error_name,
        pgcode=pgcode,
        pgerror=pgerror,
        code_position=pos['code'],  
        text_position=pos['text']  
        )
    except Exception as e:
        print(e)
        add_log = False     
    
    content = {
        "detail": pos['detail'],
        "code": pos['code'],
        "log": add_log
    }
    return Response(content, status=status.HTTP_400_BAD_REQUEST)   

# error hendling - OK
def clearOldOffers():
    content = {
        'function_name' : 'clearOldOffers',
        'code' : "0017",
        "detail": "Bad request. No clear old offers",
        'text' : ""
        }
    try:
        offers=MyProductsOffered.objects.filter(is_active = True )
    except Exception as e:
            content['text'] = "pobranie wszystkich aktywnych offert"
            return ErrorHendling(content, err=e)
    
    local_timezone = tz.tzlocal()
    for i in offers:
        if i.offer_to < datetime.datetime.now(local_timezone):
            i.is_active = False
            try:
                i.save()
            except Exception as e:
                content['text'] = "Błąd kasowania nieaktywnych ofert"
                content['code'] = "0018"
                return ErrorHendling(content, err=e)

@api_view(["PUT","POST"])
def addAxiosError(request):

    data = request.data
    local_timezone = tz.tzlocal()
    flag = True

    content = {
        'function_name' : 'addAxiosError',
        'code' : "0019",
        "detail": "DB error. AxiosError not added",
        'text' : ""
        }
    #zabezpieczenie, że brak jakiej wielkości
    try:
        user_error=data['user'],
        user_saved=data['user'], 
        function_name=data['function'], 
        error_code=data['code'],
        error_detail=data['detail'],
        status=data['status'],
        method=data['method'],
        url=data['url'],
        text=data['text'],
        param=data['param'] 
    except:
        flag = False

    if flag:
        try:
            createdNewLog = AxiosErrorLog.objects.create(
                data_error=datetime.datetime.now(local_timezone),
                user_error=data['user'],
                user_saved=data['user'], 
                function_name=data['function'], 
                error_code=data['code'],
                error_detail=data['detail'],
                status=data['status'],
                method=data['method'],
                url=data['url'],
                text=data['text'],
                param=data['param']  
            )
        except Exception as e:
            content['text'] = "Błąd przy wpisaniu błędu axiosa do tabeli AxiosErrorLog"
            ErrorHendling(content, data['user'], e)
    else:
        dataStr=str(data)
        dataRequest = dataStr[:2048] if len(dataStr) > 2048 else dataStr
        try:
            createdNewLog = AxiosErrorLogRequest.objects.create(
            user_saved=data['user'],
            request_text=dataRequest   
            )
        except Exception as e:
            content['code'] = "0038"
            content['text'] = "Błąd przy wpisaniu Requesta do tabeli AxiosErrorLogRequest"
            ErrorHendling(content, data['user'], e)

    return Response("OK")

@api_view(["PUT","POST"])
def addAxiosErrorFromLS(request,userId):

    data = request.data
    flag = True

    content = {
        'function_name' : 'addAxiosErrorFromLS',
        'code' : "0020",
        "detail": "DB error. AxiosError from LS not added",
        'text' : ""
        }
    #zabezpieczenie, że w LS brak jakiej wielkości
    for i in data:
        try:
            data_error=i['data_error'],
            user_error=i['user_error'],
            user_saved=userId,
            function_name=i['function'], 
            error_code=i['code'],
            error_detail=i['detail'],
            status=i['status'],
            method=i['method'],
            url=i['url'],
            text=i['text'],
            param=i['param']
        except Exception as e:
            flag = False


    if(flag):
        for i in data:
            try:
                createdNewLog = AxiosErrorLog.objects.create(
                    data_error=i['data_error'],
                    user_error=i['user_error'],
                    user_saved=userId,
                    function_name=i['function'], 
                    error_code=i['code'],
                    error_detail=i['detail'],
                    status=i['status'],
                    method=i['method'],
                    url=i['url'],
                    text=i['text'],
                    param=i['param']   
                )
            except Exception as e:
                content['text'] = "Błąd przy wpisaniu błędu axiosa z LS do tabeli AxiosErrorLog"
                ErrorHendling(content, userId, e)
    else:
        dataStr=str(data)
        dataRequest = dataStr[:2048] if len(dataStr) > 2048 else dataStr
        try:
            createdNewLog = AxiosErrorLogRequest.objects.create(
            user_saved=userId,
            request_text=dataRequest   
            )
        except Exception as e:
            content['code'] = "0021"
            content['text'] = "Błąd przy wpisaniu Requesta do tabeli AxiosErrorLogRequest"
            ErrorHendling(content, userId, e)

    return Response("OK")

############################################################################################
@api_view(['PUT'])
@permission_classes([IsAdminUser])
# error hendling - OK
def updatePickUpSpot(request):
    data = request.data
    local_timezone = tz.tzlocal()
    
    content = {
        'function_name' : 'updatePickUpSpot',
        'code' : "0057",
        "detail": "Bad request. No update pick-up in Spot",
        'text' : "Pobór obiektu do aktualizacji z tabeli ShopsSpot"
        }

    try:
        spot = ShopsSpot.objects.get(id=data['Id'])
    except Exception as e:
        return ErrorHendling(content,data['user'], e)
    
    # add to archiv
    try:
        spotARC = ShopsSpotARC.objects.create(
            id_shops = data['id_shops'],
            id_spot = data['Id'],
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
            archiver = data['user']
            )
    except Exception as e:
        content['text'] = "Błąd utworzenia obiektu ARC w tabeli ShopsSpotARC"
        content['code'] = "0058"
        ErrorHendling(content, data['user'],err=e)

    try:
        spot.pick_up_point = data['pickUp']
        spot.modifier=data['user']
        spot.type_of_change="Update pick-up to : "+ str(data['pickUp'])
        spot.date_of_change=datetime.datetime.now(local_timezone)
        spot.save()
    except Exception as e:
        content['text'] = "Błąd zapisania zmiany, aktualizacja pick-up "
        content['code'] = "0059"
        return ErrorHendling(content, data['user'],e)

    return Response("OK")


@api_view(['GET'])
@permission_classes([IsAdminUser])
# error hendling - OK
def get_myoffersPrice(request, IdOffer):
    content = {
        'function_name' : 'get_myoffersPrice',
        'code' : "0036",
        "detail": "Bad request. No my offers",
        'text' : "Pobór danych, szczegóły wybranej oferty"
        }

    try:
        myofferssPrice = MyProductsPrice.objects.filter(id_my_product_offered=IdOffer)
    except Exception as e:
        return ErrorHendling(content, err=e)
    try:
        seriaziler = MyProductsPriceSerializer(myofferssPrice, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji danych obiektu myofferssPrice z tabeli MyProductsPrice"
        content['code'] = "0037"
        return ErrorHendling(content, err=e)
    return Response(seriaziler.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
# error hendling - OK
def add_guantity_myoffers(request):
    data = request.data
    local_timezone = tz.tzlocal()
    flag = True
    content = {
        'function_name' : 'add_guantity_myoffers',
        'code' : "0031",
        "detail": "Bad request. No added quantity to my offer",
        'text' : "Pobór danych, oferta do dodania ilości oferowanego produktu"
        }

    try:
        addQuantitymyoffer = MyProductsOffered.objects.get(id=data['offerId'])
    except Exception as e:
        return ErrorHendling(content,data['user'], e)
    try:
        addQuantitymyoffer.current_quantity = addQuantitymyoffer.current_quantity + float(data['addQuantity'])
        addQuantitymyoffer.modifier=data['user']
        addQuantitymyoffer.date_of_change=datetime.datetime.now(local_timezone)
        addQuantitymyoffer.save()
    except Exception as e:
        content['text'] = "Błąd zapisania zmiany, zwiekszenia ilości "
        content['code'] = "0032"
        return ErrorHendling(content, data['user'],e)
    try:
        addMyOfferDoc=MyProductsOfferedDoc.objects.create(
            id_my_product_offered=addQuantitymyoffer,
            quantity=data['addQuantity'],
            creator=data['user'],
            type_document='Adding quantity do my offer'
        )
    except Exception as e:
        content['text'] = "Błąd dodania dokumentu zwiększenia ilości do tabeli MyProductsOfferedDoc"
        content['code'] = "0033"
        content['detail'] = "Bad request. Change document not saved - adding quantity"
        ErrorHendling(content, data['user'],e)
    try:
        myoffers = MyProductsOffered.objects.filter(
            id_my_product__id_shops_spot=data['spotId'],is_active=True).order_by('id_my_product__id_product__name')        
    except Exception as e:
        content['text'] = "Błąd poboru listy aktywnych ofert po dodaniu ilości"
        content['code'] = "0034"
        flag = False
        ErrorHendling(content, data['user'],e)    
    if flag:
        try:
            seriaziler = MyOffersSerializer(myoffers, many=True)
            print('seriaziler-->',seriaziler,'data',seriaziler.data)
        except Exception as e:
            content['text'] = "Błąd serializacji danych obiektu myoffers z tabeli MyProductsOffered po dodaniu ilości"
            content['code'] = "0035"
            return ErrorHendling(content,data['user'], e)
        return Response(seriaziler.data)
    else:
        return Response("OK")



@api_view(['PUT'])
@permission_classes([IsAdminUser])
# error hendling - OK
def delete_myoffers(request):
    data = request.data
    local_timezone = tz.tzlocal()
    flag = True
    content = {
        'function_name' : 'delete_myoffers',
        'code' : "0026",
        "detail": "Bad request. No delete my offers",
        'text' : "Pobór danych, oferta do kasowania"
        }

    try:
        deletemyoffer = MyProductsOffered.objects.get(id=data['offerId'])
    except Exception as e:
        return ErrorHendling(content,data['user'], e)
    try:
        deletemyoffer.is_active=False
        deletemyoffer.modifier=data['user']
        deletemyoffer.date_of_change=datetime.datetime.now(local_timezone)
        deletemyoffer.save()
    except Exception as e:
        content['text'] = "Błąd aktualizacji-kasowania obiektu moja oferta"
        content['code'] = "0027"
        return ErrorHendling(content, data['user'],e)
    try:
        addMyOfferDoc=MyProductsOfferedDoc.objects.create(
            id_my_product_offered=deletemyoffer,
            quantity=0,
            creator=data['user'],
            type_document='Deleting offers by the client'
        )
    except Exception as e:
        content['text'] = "Błąd dodania dokumentu kasowania do tabeli MyProductsOfferedDoc"
        content['code'] = "0028"
        content['detail'] = "Bad request. Change document not saved" 
        ErrorHendling(content, data['user'],e)
    try:
        myoffers = MyProductsOffered.objects.filter(
            id_my_product__id_shops_spot=data['spotId'],is_active=True).order_by('id_my_product__id_product__name')        
    except Exception as e:
        content['text'] = "Błąd poboru listy aktywnych ofert po kasowaniu"
        content['code'] = "0029"
        flag = False
        ErrorHendling(content, data['user'],e)    
    if flag:
        try:
            seriaziler = MyOffersSerializer(myoffers, many=True)
            print('seriaziler-->',seriaziler,'data',seriaziler.data)
        except Exception as e:
            content['text'] = "Błąd serializacji danych obiektu myoffers z tabeli MyProductsOffered po kasowaniu"
            content['code'] = "0030"
            return ErrorHendling(content,data['user'],e)
        return Response(seriaziler.data)
    else:
        return Response("OK")


@api_view(['GET'])
@permission_classes([IsAdminUser])
# error hendling - OK
def get_myoffers(request, IdSpot):

    clearOldOffers()
    
    content = {
        'function_name' : 'get_myoffers',
        'code' : "0024",
        "detail": "Bad request. No my offers",
        'text' : "Pobór danych, moje aktywne oferty"
        }

    try:
        myofferss = MyProductsOffered.objects.filter(
            id_my_product__id_shops_spot=IdSpot,is_active=True).order_by('id_my_product__id_product__name')
    except Exception as e:
        return ErrorHendling(content, err=e)
    try:
        seriaziler = MyOffersSerializer(myofferss, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji danych obiektu myofferss z tabeli MyProductsOffered"
        content['code'] = "0025"
        return ErrorHendling(content, err=e)
    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
# error hendling - OK
def get_myproduct(request, IdSpot):

    content = {
        'function_name' : 'get_myproduct',
        'code' : "0022",
        "detail": "Bad request. No my product",
        'text' : "Pobór danych moich produktów"
        }

    try:
        myproducts = MyProducts.objects.filter(
            id_shops_spot=IdSpot,is_delete=False).order_by('id_product__name')
    except Exception as e:
        return ErrorHendling(content, err=e)
    
    try:
        seriaziler = MyProductsSerializer(myproducts, many=True)
    except Exception as e:
        content['text'] = "Błąd serializacji danych obiektu myproducts z tabeli MyProducts"
        content['code'] = "0023"
        return ErrorHendling(content, err=e)

    return Response(seriaziler.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
# error hendling - OK
def addOffer(request):
    data = request.data
    local_timezone = tz.tzlocal()
    uniqueKey = time.time()*float(data['quantity'])/float(data['price_1'])+random.uniform(0.0, 1.0)
    currentDate = datetime.datetime.now(local_timezone)
    currentDate12 = currentDate.replace(hour=12, minute=0, second=0, microsecond=0)
    startDate = currentDate12 + datetime.timedelta(days=int(data['deltaDateFrom']))
    endDate = startDate + datetime.timedelta(days=int(data['deltaDateTo']))

    clearOldOffers()

    content = {
        'function_name' : 'addOffer',
        'code' : "0000",
        "detail": "Bad request. Offer not added",
        'text' : ""
        }

    try:
        alreadyExists = MyProductsOffered.objects.filter(
            id_my_product__id=data['myproduct'], is_active = True ).exists()
    except Exception as e:
            content['text'] = "Sprawdzenie czy wpisywana oferta na określony produkt już istnieje"
            return ErrorHendling(content, data['user'], e)
    
    if alreadyExists:
        content['text'] = "Wpisywana oferta na określony produkt już istnieje"
        content['code'] = "0001"
        content['detail'] = "Bad request. Offer not added - aleady exists"
        return ErrorHendling(content, data['user'])  
    try:
        try:
            myProduct = MyProducts.objects.get(id=data['myproduct'])
        except Exception as e:
            content['text'] = "Pobranie obiektu z tabeli MyProducts"
            content['code'] = "0002"
            return ErrorHendling(content, data['user'], e)
        
        createdOffer = MyProductsOffered.objects.create(
                id_my_product= myProduct,
                quantity = data['quantity'],
                current_quantity = data['quantity'],
                barrel_bulk = data['bb'],
                barrel_bulk_short = data['bb_short'],
                barrel_bulk_long = data['bb_long'],
                offer_from = startDate,
                offer_to = endDate,
                country_of_origin = data['country'],
                term_of_validity = data['termOfValidity'],
                date_of_entry = currentDate,
                creator = data['user'],
                is_active = True,
                unique_key = uniqueKey
            )
    except Exception as e:
        content['text'] = "Dodanie obiektu do tabeli MyProductsOffered"
        content['code'] = "0003"
        return ErrorHendling(content, data['user'], e)
    
    try:
        myOffer = MyProductsOffered.objects.get(unique_key = uniqueKey)
    except Exception as e:
        content['text'] = "Pobranie nowoutworzonego obiektu z tabeli MyProductsOffered"
        content['code'] = "0004"
        return ErrorHendling(content, data['user'], e)
    
    try:
        createdOffer_doc = MyProductsOfferedDoc.objects.create( 
            id_my_product_offered = myOffer,
            quantity = data['quantity'],
            date_of_entry = currentDate,
            creator = data['user'],
            type_document = "NEW OFFER"
        )
    except Exception as e:
        try:
            MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
        except Exception as err:
            content['text'] = "Kasownie nowoutworzonego obiektu z tabeli MyProductsOffered. Błąd wpiasnia dokumentu zmian stanów"
            content['code'] = "0005"
            return ErrorHendling(content, data['user'], err)

        content['text'] = "Błąd wpiasnia dokumentu znian stanów do tabeli MyProductsOfferedDoc"
        content['code'] = "0006"
        return ErrorHendling(content, data['user'], e)

    try:
        createdOffer_v1 = MyProductsPrice.objects.create( 
            id_my_product_offered = myOffer,
            price = data['price_1'],
            sale_price = data['priceSale_1'],
            price_30_day = data['price30Day_1'],
            currency = data['currency_1'],
            package_size = data['packing_1']
        )
    except Exception as e:
        try:
            MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
        except Exception as err:
            content['text'] = "Kasownie nowoutworzonego obiektu z tabeli MyProductsOffered. Błąd wpiasnia szczegółów oferty wariant 1"
            content['code'] = "0007"
            return ErrorHendling(content, data['user'], err)

        content['text'] = "Błąd wpiasnia szczegółów oferty wariant 1"
        content['code'] = "0008"
        return ErrorHendling(content, data['user'], e)

    try:    
        if data['price_2'] !="0":
            createdOffer_v2 = MyProductsPrice.objects.create( 
                id_my_product_offered = myOffer,
                price = data['price_2'],
                sale_price = data['priceSale_2'],
                price_30_day = data['price30Day_2'],
                currency = data['currency_2'],
                package_size = data['packing_2']
            )
    except Exception as e:
        try:
            MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
        except Exception as err:
            content['text'] = "Kasownie nowoutworzonego obiektu z tabeli MyProductsOffered. Błąd wpiasnia szczegółów oferty wariant 2"
            content['code'] = "0009"
            return ErrorHendling(content, data['user'], err)

        content['text'] = "Błąd wpiasnia szczegółów oferty wariant 2"
        content['code'] = "0010"
        return ErrorHendling(content, data['user'], e)

    try:    
        if data['price_3'] !="0":
            createdOffer_v3 = MyProductsPrice.objects.create( 
                id_my_product_offered = myOffer,
                price = data['price_3'],
                sale_price = data['priceSale_3'],
                price_30_day = data['price30Day_3'],
                currency = data['currency_3'],
                package_size = data['packing_3']
            )
    except Exception as e:
        try:
            MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
        except Exception as err:
            content['text'] = "Kasownie nowoutworzonego obiektu z tabeli MyProductsOffered. Błąd wpiasnia szczegółów oferty wariant 3"
            content['code'] = "0011"
            return ErrorHendling(content, data['user'], err)

        content['text'] = "Błąd wpiasnia szczegółów oferty wariant 3"
        content['code'] = "0012"
        return ErrorHendling(content, data['user'], e)

    return Response("OK")
 

@api_view(["PUT","POST"])
# error hendling - OK
def deleteMyProduct(request):

    local_timezone = tz.tzlocal()
    data = request.data
    content = {
        'function_name' : 'deleteMyProduct',
        'code' : "0013",
        "detail": "Bad request. My product not delete",
        'text' : "Błąd pobrania obiektu z tabeli MyProducts"
    }

    try:
        active_object = MyProducts.objects.get(id=data['Id'])
    except Exception as e:
        return ErrorHendling(content, data['user'], e)

    try:
        active_object.is_delete = True
        active_object.date_of_change = datetime.datetime.now(local_timezone)
        active_object.modifier = data['user']
        active_object.save()
    except Exception as e:
        content['text'] = "Błąd zapisu danych w tabeli MyProducts"
        content['code'] = "0014"
        return ErrorHendling(content, data['user'], e)

    try:
        myproducts=MyProducts.objects.filter(id_shops_spot=data['IdSpot'],is_delete=False)
    except Exception as e:
        content['text'] = "Błąd poboru danych do serializacji z tabeli MyProducts"
        content['code'] = "0015"
        return ErrorHendling(content, data['user'], e)
    
    try:
        seriaziler = MyProductsSerializer(myproducts, many = True)
    except Exception as e:
        content['text'] = "Błąd serializacji danych obiektu myproducts z tabeli MyProducts"
        content['code'] = "0016"
        return ErrorHendling(content, data['user'], e)

    return Response(seriaziler.data)


@api_view(["PUT"])
def deleteMyImage(request):

    data = request.data
    content = {
        'function_name' : 'deleteMyImage',
        'code' : "0070",
        "detail": "Bad request. My photo product not delete",
        'text' : "Błąd pobrania obiektu z tabeli MyProductsPhotos"
    }
    try:
        active_object = MyProductsPhotos.objects.get(id=data['Id'])
    except Exception as e:
        return ErrorHendling(content, data['user'], e)
    try:
        active_object.is_delete = True
        active_object.date_of_change = datetime.datetime.now()
        active_object.modifier = data['user']
        active_object.save()
    except Exception as e:
        content['text'] = "Błąd zapisania zmian - kasowanie mojego zdjecia w tabeli MyProductsPhotos "
        content['code'] = "0071"
        return ErrorHendling(content, data['user'], e)
    try:
        photos=MyProductsPhotos.objects.filter(id_my_product=data['IdProduct'],is_delete=False)
    except Exception as e:
        content['text'] = "Błąd pobrania aktualnej listy moich zdjęc z tabeli MyProductsPhotos "
        content['code'] = "0072"
        return ErrorHendling(content, data['user'], e)
    try:
        seriaziler = MyProductsPhotoSerializer(photos, many = True)
    except Exception as e:
        content['text'] = "Błąd serializacji aktualnej listy moich zdjęc z tabeli MyProductsPhotos "
        content['code'] = "0073"
        return ErrorHendling(content, data['user'], e)
    
    return Response(seriaziler.data)

@api_view(["PUT"])
def addMyImage(request):

    data = request.data
    u_date=datetime.datetime.now()
    content = {
        'function_name' : 'addMyImage',
        'code' : "0060",
        "detail": "Bad request. No object in table MyProducts",
        'text' : "Błąd pobrania obiektu z tabeli MyProducts"
    }

    try:
        my_product=MyProducts.objects.get(id=data['Id'])
    except Exception as e:
        return ErrorHendling(content, data['user'], e)
    try:
        photo=MyProductsPhotos.objects.create(
            id_my_product = my_product,
            creator = data['user'],  
            unique_date = u_date
        )
    except Exception as e:
        content['text'] = "Błąd utworzenia obiektu w tabeli MyProductsPhotos"
        content['code'] = "0061"
        return ErrorHendling(content, data['user'], e)
    try:
        photos=MyProductsPhotos.objects.filter(unique_date = u_date, id_my_product=data['Id'])
    except Exception as e:
        content['text'] = "Błąd pobrania nowotworzonego obiektu z tabeli MyProductsPhotos"
        content['code'] = "0062"
        return ErrorHendling(content, data['user'], e)
    try:
        seriaziler = MyProductsPhotoSerializer(photos, many = True)
    except Exception as e:
        content['text'] = "Błąd serializacji nowotworzonego obiektu z tabeli MyProductsPhotos"
        content['code'] = "0063"
        return ErrorHendling(content, data['user'], e)

    return Response(seriaziler.data)

@api_view(["GET"])
def getMyImage(request,Id):

    content = {
        'function_name' : 'addMyImage',
        'code' : "0068",
        "detail": "Bad request. No my photo list",
        'text' : "Błąd pobrania listy zdjęć z tabeli MyProductsPhotos"
    }
    try:
        photos=MyProductsPhotos.objects.filter(id_my_product=Id, is_delete=False)
    except Exception as e:
        return ErrorHendling(content, err=e)
    try:
        seriaziler = MyProductsPhotoSerializer(photos, many = True)
    except Exception as e:
        content['text'] = "Błąd serializacji listy zdjęć z tabeli MyProductsPhotos"
        content['code'] = "0069"
        return ErrorHendling(content, err=e)

    return Response(seriaziler.data)

@api_view(["PUT"])
def uploadMyImages(request):

    data = request.data
    content = {
        'function_name' : 'uploadMyImages',
        'code' : "0064",
        "detail": "Bad request. No uploaded my image in table MyProductsPhotos",
        'text' : "Błąd pobrania obiektu z tabeli MyProductsPhotos"
    }
    
    try:
        active_object = MyProductsPhotos.objects.get(id=data['IdFhoto'])
    except Exception as e:
        return ErrorHendling(content, err=e)   
    try:
        active_object.photo = request.FILES.get('image')
        active_object.save()
    except Exception as e:
        content['text'] = "Błąd aktualizacji mojego zdjęcia w tabeli MyProductsPhotos"
        content['code'] = "0065"
        return ErrorHendling(content, err=e)
    try:
        photos=MyProductsPhotos.objects.filter(id_my_product=data['Id'],is_delete=False)
    except Exception as e:
        content['text'] = "Błąd poboru listy moich zdjęć z tabeli MyProductsPhotos"
        content['code'] = "0066"
        return ErrorHendling(content, err=e)
    try:
        seriaziler = MyProductsPhotoSerializer(photos, many = True)
    except Exception as e:
        content['text'] = "Błąd serializacji listy moich zdjęć z tabeli MyProductsPhotos"
        content['code'] = "0067"
        return ErrorHendling(content, err=e)

    return Response(seriaziler.data)


@api_view(['PUT'])
@permission_classes([AllowAny])
def add_myproduct(request):
    data = request.data
    product = Product.objects.get(id=data['idProduct'])
    spot = ShopsSpot.objects.get(id=data['idSpot'])
    createdMyProduct = MyProducts.objects.create(
            id_product= product,
            id_shops_spot = spot,
            creator = data['idUser'],
        )
    
    return Response("OK")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_list_of_data(request, typeActivity,Page,Lng,Cat,Subcat):
    
    if typeActivity == "LIST_OF_PRODUCTS":

        if Lng == '0':
            products = Product.objects.all().order_by('name')

        if Lng !='0' and Cat =='0' and Subcat =='0':
            products = Product.objects.filter(id_product_subtype__id_product_type__language=Lng
                                              ).order_by('name')
            
        if Lng !='0' and Cat !='0' and Subcat =='0':
            products = Product.objects.filter(id_product_subtype__id_product_type__language=Lng,
                                              id_product_subtype__id_product_type__id=Cat
                                              ).order_by('name')
        
        if Lng !='0' and Cat !='0' and Subcat !='0':
            products = Product.objects.filter(id_product_subtype__id_product_type__language=Lng,
                                              id_product_subtype__id_product_type__id=Cat,
                                              id_product_subtype__id=Subcat
                                              ).order_by('name')

    elif typeActivity == "LIST_OF_MY_PRODUCTS":

        if Lng == '0':
            products = Product.objects.filter(is_active=True).order_by('name')
        
        if Lng !='0' and Cat =='0' and Subcat =='0':
            products = Product.objects.filter(is_active=True,
                                              id_product_subtype__id_product_type__language=Lng
                                              ).order_by('name')
        
        if Lng !='0' and Cat !='0' and Subcat =='0':
            products = Product.objects.filter(is_active=True,
                                              id_product_subtype__id_product_type__language=Lng,
                                              id_product_subtype__id_product_type__id=Cat
                                              ).order_by('name')
        
        if Lng !='0' and Cat !='0' and Subcat !='0':
            products = Product.objects.filter(is_active=True,
                                              id_product_subtype__id_product_type__language=Lng,
                                              id_product_subtype__id_product_type__id=Cat,
                                              id_product_subtype__id=Subcat
                                              ).order_by('name')

    else:
        raise Http404('Invalid typeActivity')  
    
    page = request.GET.get('page',int(Page))
    page_size = request.GET.get('page_size',30)
    
    paginator = Paginator(products, page_size)
    if paginator.num_pages < int(Page):
        page = 1

    page_obj = paginator.page(page)

    seriaziler = ProductsSerializer(page_obj, many=True)
    
    response = {
        'data':seriaziler.data,
        'current_page': Page,
        'total_pages': paginator.num_pages
    }
    return Response(response)   
