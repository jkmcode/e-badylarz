from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from base.views import *


urlpatterns = [
    #upload image 
    path("api/upload-image/", uploadMultiImages),

    path('admin/', admin.site.urls),
    path('api/<str:lat>/<str:lng>/discrict/', getDiscrict),
    path('api/full-discricts/', getFullDiscrict),
    path('api/add-district/', addDiscrict),
    path('api/add-citi/', addCiti),
    path('api/add-shop-contact/<str:Id>/list', addCiti),
    path('api/add-product-type/', addProductType),
    path('api/get-cites/<str:Id>/list', getCites),

    #shop
    path('api/get-shops/', getShops),
    path('api/<str:Id>/get-shop/', getShop),
    path('api/shop/<str:Id>/update/', updateShop),
    path('api/<str:Id>/get-contacts/', getContacts),
    path('api/<str:Id>/get-spots/', getSpots),
    path('api/<str:Id>/get-spot/', getSpot),
    path('api/add-shop/', addShop),
    path('api/add-shop-contact/', addShopContacts),
    path('api/add-shop-spot/', addShopSpot),
    path('api/edit-shop-spot/', addShopSpot),

    # area
    path('api/get-areas/', getAreas),
    
    path('api/users/login/', MyTokenObtainPairView.as_view(), name="token_refresh"),
    path('api/users/login/', MyTokenObtainPairView.as_view()),

    path('api/get-district-desc/<str:Id>/<str:lng>/<str:obj_type>', getDiscrictDesc, name="getDiscrictDesc"),
    path('api/add-desc/', addDesc, name="addDesc"),
    path('api/get-desc/full/<str:Id>/<str:obj_type>', getFullDescriptionsDesc, name="get-full-descriptions"),
    path('api/desc-active/', activeList, name="activeList"),
    
]

