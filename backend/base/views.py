
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


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSeralizerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

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
    #print('Id', Id, type(Id), 'lng', lng, type(lng))
    descrition = Descriptions.objects.filter(obj_id = Id, language=lng, obj_type=obj_type) 
    print('descrition', descrition)
    seriaziler = DistrictsDescSerializer(descrition, many=True)
    return Response(seriaziler.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def getDiscrict(request):
    discrict = Districts.objects.all().order_by('name')
    seriaziler = DistrictsSerializer(discrict, many=True)

    return Response(seriaziler.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def addDiscrict(request):
    data = request.data
    district = Districts.objects.create(
        name=data['name'],
    )

    return Response("Wszystko okey")




########################### BRUDNOPIS ###############################

# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
# def updateLocation(request, pk):
#     location = Locations.objects.get(id=pk)

#     data = request.data
#     location.name = data["name"]
#     location.short_name = data["shortName"]
#     location.is_active = data["isActive"]

#     location.save()

#     serializer = LocationsSerializer(location, many=False)

#     return Response(serializer.data)



# class LocationsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Locations
#         fields = "__all__"