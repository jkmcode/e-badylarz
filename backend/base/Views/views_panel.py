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
        createdOffer = ErrorLog.objects.create(
        user=user,
        function_name=pos['function_name'], 
        error_class=exception_class,
        error_name=error_name,
        pgcode=pgcode,
        pgerror=pgerror,
        code_position=pos['code'],  
        text_position=pos['text']  
        )
    except Exception:
        add_log = False     
    
    content = {
        "detail": pos['detail'],
        "code": pos['code'],
        "log": add_log
    }
    return Response(content, status=status.HTTP_400_BAD_REQUEST)   

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
            return ErrorHendling(content, e)
    
    local_timezone = tz.tzlocal()
    for i in offers:
        if i.offer_to < datetime.datetime.now(local_timezone):
            i.is_active = False
            try:
                i.save()
            except Exception as e:
                content['text'] = "zapisanie nieaktywnych ofert"
                content['code'] = "0018"
                return ErrorHendling(content, e)
    # if flag :
    #     try:
    #         offers.save()
    #     except Exception as e:
    #         content['text'] = "zapisanie nieaktywnych ofert"
    #         content['code'] = "0018"
    #         return ErrorHendling(content, e)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def addOffer(request):
    data = request.data
    uniqueKey = time.time()*float(data['quantity'])/float(data['price_1'])+random.uniform(0.0, 1.0)
    currentDate = datetime.datetime.now()
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
def deleteMyProduct(request):

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
        active_object.date_of_change = datetime.datetime.now()
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


@api_view(["PUT","POST"])
def deleteMyImage(request):

    data = request.data
    # content = {
    #     'function_name' : 'addOffer',
    #     'code' : "0013",
    #     "detail": "Bad request. My product not delete",
    #     'text' : "Błąd pobrania obiektu"
    # }

    active_object = MyProductsPhotos.objects.get(id=data['Id'])
    active_object.is_delete = True
    active_object.date_of_change = datetime.datetime.now()
    active_object.modifier = data['user']
    active_object.save()

    photos=MyProductsPhotos.objects.filter(id_my_product=data['IdProduct'],is_delete=False)
    seriaziler = MyProductsPhotoSerializer(photos, many = True)

    return Response(seriaziler.data)

@api_view(["PUT","POST"])
def addMyImage(request):

    data = request.data

    u_date=datetime.datetime.now()

    my_product=MyProducts.objects.get(id=data['Id'])
    photo=MyProductsPhotos.objects.create(
        id_my_product = my_product,
        creator = data['user'],  
        unique_date = u_date
    )

    photos=MyProductsPhotos.objects.filter(unique_date = u_date, id_my_product=data['Id'])
    seriaziler = MyProductsPhotoSerializer(photos, many = True)

    return Response(seriaziler.data)

@api_view(["GET"])
def getMyImage(request,Id):

    photos=MyProductsPhotos.objects.filter(id_my_product=Id, is_delete=False)
    seriaziler = MyProductsPhotoSerializer(photos, many = True)

    return Response(seriaziler.data)

@api_view(["PUT","POST"])
def uploadMyImages(request):

    data = request.data

    active_object = MyProductsPhotos.objects.get(id=data['IdFhoto'])
    active_object.photo = request.FILES.get('image')
    active_object.save()

    photos=MyProductsPhotos.objects.filter(id_my_product=data['Id'],is_delete=False)
    seriaziler = MyProductsPhotoSerializer(photos, many = True)

    return Response(seriaziler.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_myproduct(request, IdSpot):

    myproducts = MyProducts.objects.filter(
        id_shops_spot=IdSpot,is_delete=False).order_by('id_product__name')
    seriaziler = MyProductsSerializer(myproducts, many=True)
    
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
    page_size = request.GET.get('page_size',60)
    
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
