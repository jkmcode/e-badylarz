import imp
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
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
def getDiscrict(request):
    discrict = Districts.objects.all().order_by('name')
    seriaziler = DistrictsSerializer(discrict, many=True)

    return Response(seriaziler.data)


@api_view(['POST'])
def addDiscrict(request):
    data = request.data
    district = Districts.objects.create(
        name=data['name'],
    )

    return Response("Wszystko okey")
