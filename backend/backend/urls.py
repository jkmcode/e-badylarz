from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from base.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/discrict/', getDiscrict),
    path('api/add-district/', addDiscrict),
    path('api/users/login/', MyTokenObtainPairView.as_view(), name="token_refresh"),
    path('api/users/login/', MyTokenObtainPairView.as_view()),
    path('api/get-district-desc/<str:Id>/<str:lng>', getDiscrictDesc, name="getDiscrictDesc"),
]

