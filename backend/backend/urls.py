from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from base.views import *



urlpatterns = [
    path('admin/', admin.site.urls),
    
    #upload image 
    path("api/upload-image/", uploadMultiImages),
    path("api/upload-my-image/", uploadMyImages),
    path('api/upload-image2/', uploadMultiImages2),
    path('api/add-myproduct-image/', addMyImage),
    path('api/<str:Id>/get-my-image/', getMyImage),
    path('api/delete-my-image/', deleteMyImage),

    # district
    path('api/add-district/', addDiscrict),
    path('api/<str:lat>/<str:lng>/discrict/', getDiscrict),
    path('api/<str:param>/full-discricts/', getFullDiscricts),
    path('api/add-citi/', addCiti),
    path('api/add-shop-contact/<str:Id>/list', addCiti),
    path('api/add-product-type/', addProductType),
    

    # shop
    path('api/get-cites/<str:Id>/<str:param>/list', getCites),
    path('api/get-cites/all/list', getAllCities),
    path('api/get-shops/', getShops),
    path('api/<str:Id>/get-shop/', getShop),
    path('api/shop/<str:Id>/update/', updateShop),
    path('api/<str:Id>/get-contacts/', getContacts),
    path('api/<str:Id>/get-area-contacts/', getAreaContacts),
    path('api/<str:Id>/get-spots/', getSpots),
    path('api/<str:Id>/<str:typeSpot>/get-spot/', getSpot),
    path('api/add-shop/', addShop),
    path('api/add-shop-contact/', addShopContacts),
    path('api/add-shop-spot/', addShopSpot),
    path('api/edit-shop-spot/', addShopSpot),

    # area
    path('api/get-areas/', getAreas),
    path('api/add-area/', addArea),
    path('api/get-area/<str:Id>', getAreaToEdit),
    path('api/add-area-contact/', addAreaContacts),
    path('api/add-area-spot/', addAreaSpot),
    path('api/<str:Id>/get-spot-areas/', getAreaSpots),
   
    path('api/users/login/', MyTokenObtainPairView.as_view(), name="token_refresh"),
    path('api/users/login/', MyTokenObtainPairView.as_view()),

    path('api/get-district-desc/<str:Id>/<str:lng>/<str:obj_type>', getDiscrictDesc, name="getDiscrictDesc"),
    path('api/add-desc/', addDesc, name="addDesc"),
    path('api/get-desc/full/<str:Id>/<str:obj_type>', getFullDescriptionsDesc, name="get-full-descriptions"),
    path('api/desc-active/', activeList, name="activeList"),

    # panel
    path('api/add-myproduct/', add_myproduct),
    path('api/<str:IdSpot>/get-myproduct/', get_myproduct),
    path('api/delete-my-product/', deleteMyProduct),
    path('api/add-offer/', addOffer),

    # product
    path('api/add-product-cat/', addProductCat),
    path('api/get-product-categories/', getProductCategories),
    path('api/sort-by-lng/', sortByLng),
    path('api/<str:Id>/get-product-subcategories/', getProductSubcategories),
    path('api/add-product-subcat/', addProductSubcat),
    path('api/edit-product-subcategory/', edit_subcategory),
    path('api/<str:Id>/<str:typeActivity>/get-single-instance/', get_single_instance),
    path('api/add-single-instance/', add_single_instance),
    path('api/update-single-instance/', update_single_instance),
    path('api/<str:typeActivity>/<str:Page>/<str:Lng>/<str:Cat>/<str:Subcat>/get-list-of-data/', get_list_of_data),

]

