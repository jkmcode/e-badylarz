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
    path('api/add-shop-contact/<str:Id>/list', addCiti),
    path('api/add-product-type/', addProductType),
    path('api/add-shop-contact/', addShopContacts),

    #shop
    path('api/get-shops/', getShops),
    path('api/<str:Id>/get-shop/', getShop),
    path('api/shop/<str:Id>/update/', updateShop),
    path('api/get-contacts/', getContacts),
    path('api/get-cites/<str:Id>/list', getCites),
    path('api/add-shop/', addShop),

    # area
    path('api/get-areas/', getAreas),
    
    path('api/users/login/', MyTokenObtainPairView.as_view(), name="token_refresh"),
    path('api/users/login/', MyTokenObtainPairView.as_view()),

    path('api/get-district-desc/<str:Id>/<str:lng>/<str:obj_type>', getDiscrictDesc, name="getDiscrictDesc"),
    path('api/add-desc/', addDesc, name="addDesc"),
    path('api/get-desc/full/<str:Id>/<str:obj_type>', getFullDescriptionsDesc, name="get-full-descriptions"),
    path('api/desc-active/', activeList, name="activeList"),
    
]

