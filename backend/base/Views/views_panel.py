from base.serializer import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_myproduct(request, IdSpot):

    myproducts = MyProducts.objects.filter(id_shops_spot=IdSpot)
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
