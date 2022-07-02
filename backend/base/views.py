
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView

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



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getDiscrictDesc(request, Id, lng):
    print('request.user', request.user, request.user.is_staff)
    descrition = Districts_description.objects.filter(id_district = Id, language=lng) 
    seriaziler = DistrictsDescSerializer(descrition, many=False)
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


