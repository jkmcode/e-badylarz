from base.serializer import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response

from datetime  import datetime

from django.core.paginator import Paginator
from django.http import Http404

@api_view(["PUT","POST"])
def deleteMyProduct(request):

    data = request.data

    active_object = MyProducts.objects.get(id=data['Id'])
    active_object.is_delete = True
    active_object.date_of_change = datetime.now()
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
    active_object.date_of_change = datetime.now()
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
