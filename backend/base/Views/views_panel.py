from base.serializer import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import status

from datetime  import datetime
import time
import random
import datetime

from django.core.paginator import Paginator
from django.http import Http404


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def addOffer(request):
    data = request.data
    uniqueKey = time.time()*float(data['quantity'])/float(data['price_1'])+random.uniform(0.0, 1.0)
    currentDate = datetime.datetime.now()
    currentDate12 = currentDate.replace(hour=12, minute=0, second=0, microsecond=0)
    startDate = currentDate12 + datetime.timedelta(days=int(data['deltaDateFrom']))
    endDate = startDate + datetime.timedelta(days=int(data['deltaDateTo']))

    alreadyExists = MyProductsOffered.objects.filter(
        id_my_product__id=data['myproduct'], is_active = True ).exists()
    
    if alreadyExists:
        content = {"detail": "Offer already exists" }
        return Response(content, status=status.HTTP_400_BAD_REQUEST)  
    try:
        try:
            myProduct = MyProducts.objects.get(id=data['myproduct'])
        except Exception:
                content = {"detail": "Bad request. Offer not added" }
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
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
    except Exception:
                content = {"detail": "Bad request. Offer not added" }
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        myOffer = MyProductsOffered.objects.get(unique_key = uniqueKey)
    except Exception:
        content = {"detail": "Bad request. Offer not added" }
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    try:
        createdOffer_doc = MyProductsOfferedDoc.objects.create( 
            id_my_product_offered = myOffer,
            quantity = data['quantity'],
            date_of_entry = currentDate,
            creator = data['user'],
            type_document = "NEW OFFER"
        )
    except Exception:
        try:
            MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
        except Exception as e:
            content = {"detail": "Bad request. Error DB" + str(e)}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        content = {"detail": "Bad request. Offer not added" }
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    try:
        createdOffer_v1 = MyProductsPrice.objects.create( 
            id_my_product_offered = myOffer,
            price = data['price_1'],
            sale_price = data['priceSale_1'],
            price_30_day = data['price30Day_1'],
            currency = data['currency_1'],
            package_size = data['packing_1']
        )
    except Exception:
        try:
            MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
        except Exception as e:
            content = {"detail": "Bad request. Error DB" + str(e)}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        content = {"detail": "Bad request. Offer not added" }
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

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
    except Exception:
        try:
            MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
        except Exception as e:
            content = {"detail": "Bad request. Error DB" + str(e)}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        content = {"detail": "Bad request. Offer not added" }
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

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
    except Exception:
        try:
            MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
        except Exception as e:
            content = {"detail": "Bad request. Error DB" + str(e)}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        content = {"detail": "Bad request. Offer not added" }
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    return Response("OK")
 

@api_view(["PUT","POST"])
def deleteMyProduct(request):

    data = request.data

    active_object = MyProducts.objects.get(id=data['Id'])
    active_object.is_delete = True
    active_object.date_of_change = datetime.datetime.now()
    active_object.modifier = data['user']
    active_object.save()

    myproducts=MyProducts.objects.filter(id_shops_spot=data['IdSpot'],is_delete=False)
    seriaziler = MyProductsSerializer(myproducts, many = True)

    return Response(seriaziler.data)


@api_view(["PUT","POST"])
def deleteMyImage(request):

    data = request.data

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

    u_date=datetime.now()

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
    page_size = request.GET.get('page_size',40)
    
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
