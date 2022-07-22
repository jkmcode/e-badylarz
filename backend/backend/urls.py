from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from base.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/discrict/', getDiscrict),
    path('api/add-district/', addDiscrict),
    path('api/add-citi/', addCiti),
    path('api/add-product-type/', addProductType),
    path('api/get-cites/<str:Id>/list', getCites),
    path('api/get-shops/', getShops),

    path('api/add-shop/', addShop),
    
    path('api/users/login/', MyTokenObtainPairView.as_view(), name="token_refresh"),
    path('api/users/login/', MyTokenObtainPairView.as_view()),

    path('api/get-district-desc/<str:Id>/<str:lng>/<str:obj_type>', getDiscrictDesc, name="getDiscrictDesc"),
    path('api/add-desc/', addDesc, name="addDesc"),
    path('api/get-desc/full/<str:Id>/<str:obj_type>', getFullDescriptionsDesc, name="get-full-descriptions"),
    path('api/desc-active/', activeList, name="activeList"),
    
]

