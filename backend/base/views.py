
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

from rest_framework import status


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


@api_view(['POST'])
@permission_classes([IsAdminUser])
def addCiti(request):
    data = request.data

    discrict = Districts.objects.get(id=data['desc_id'])

    citi = Citis.objects.create(
        name=data['name'],
        creator = data['creator'],
        post_code = data['post'],
        is_active=True
    )
    newdciti=Citis.objects.filter(name=data['name'], id_district=data['desc_id'])
    seriaziler = CitisSerializer(newdciti, many=True)
    return Response(seriaziler.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def activeDiscr(request):
    data=request.data

    descrip = Districts.objects.get(id=data['Id'])
    if data['active']:
        descrip.is_active=True
    else:
        descrip.is_active=False

    descrip.date_of_change=datetime.now()
    descrip.modifier=data['userId']
    descrip.save()

    return Response("OK")

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getFullDescriptionsDesc(request, Id, obj_type):
    descrition = Descriptions.objects.filter(obj_id = Id, obj_type=obj_type) 
    seriaziler = DistrictsDescSerializer(descrition, many=True)
    return Response(seriaziler.data)

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
    descrition = Descriptions.objects.filter(obj_id = Id, language=lng, obj_type=obj_type) 
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

    alreadyExists = Districts.objects.filter(name=data['name']).exists()

    if alreadyExists:
        content = {"detail": "Disctrict already exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        district = Districts.objects.create(
            name=data['name'],
            creator = data['creator'],
            is_active=True,
        )
        newdistrict=Districts.objects.filter(name=data['name'])
        seriaziler = DistrictsSerializer(newdistrict, many=True)
        return Response(seriaziler.data)
