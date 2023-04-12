from django.db import models
from django.contrib.auth.models import User
from django.db import connection

## ------------  LOCATION  ------------ ##

## ##################### Districts ######################################

class Districts(models.Model):
    name = models.CharField(max_length=50)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    is_active = models.BooleanField()
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)

    def __str__(self):
         return self.name

# Descriptions Districts
class Descriptions(models.Model):
    id_district = models.ForeignKey(Districts, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)

# ##################### Cities ######################################
 
class Citis(models.Model):
    id_district = models.ForeignKey(Districts, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    post_code = models.CharField(max_length=20, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    is_active = models.BooleanField()
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    language = models.CharField(max_length=2)

    def __str__(self):
         return self.name

# Descriptions Cities
class CitiesDescriptions(models.Model):
    id_city = models.ForeignKey(Citis, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)

## ---------  END  LOCATION  ------------ ##

## ------------  PRODUCT  ------------ ##

# Product type
class ProductTypes(models.Model):
    name = models.CharField(max_length=50, unique=True)
    language = models.CharField(max_length=2)
    photo = models.ImageField(null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    is_active = models.BooleanField()
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    uniqueId = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
         return self.name

#Product types description
class ProductTypesDescriptions(models.Model):
    id_product_type = models.ForeignKey(ProductTypes, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)

# Product Subtypes
class ProductSubTypes(models.Model):
    id_product_type = models.ForeignKey(ProductTypes, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    photo = models.ImageField(null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    is_active = models.BooleanField()
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    uniqueId = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
         return self.name        

#Product subtypes description
class ProductSubtypesDescriptions(models.Model):
    id_product_subtype = models.ForeignKey(ProductSubTypes, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)

#### Product Genera
class Product(models.Model):
    id_product_subtype = models.ForeignKey(ProductSubTypes, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    photo = models.ImageField(null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    is_active = models.BooleanField()
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)

    def __str__(self):
         return self.name

#Product Genera description
class ProductDescriptions(models.Model):
    id_product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)

## ------------END  PRODUCT  ------------ ## 

## ---------  SHOP  ------------ ##

#Shops HQ place - miejsce prowadzenia działalnosci
class Shops(models.Model):
    name = models.CharField(max_length=50)
    nip = models.CharField(max_length=20)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=50,null=True,blank=True)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20,null=True,blank=True)
    post = models.CharField(max_length=50,null=True,blank=True)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)    
    creator = models.CharField(max_length=5)
    is_active = models.BooleanField()
    bank_account = models.CharField(max_length=50)
    photo = models.ImageField(null=True, blank=True)
    type_of_change = models.CharField(max_length=50, null=True,blank=True)

    def __str__(self):
         return self.name


class ShopsARC(models.Model):
    id_shops = models.IntegerField()
    name = models.CharField(max_length=50)
    nip = models.CharField(max_length=20)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=50,null=True,blank=True)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20,null=True,blank=True)
    post = models.CharField(max_length=30,null=True,blank=True)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    creator = models.CharField(max_length=5)
    is_active = models.BooleanField()
    bank_account = models.CharField(max_length=50)
    photo = models.ImageField(null=True, blank=True)
    type_of_change = models.CharField(max_length=50, null=True,blank=True)
    date_of_archiv = models.DateTimeField(auto_now_add=True)
    archiver = models.CharField(max_length=5)

    def __str__(self):
         return self.name

#Shops_description
class ShopsDescriptions(models.Model):
    id_shops = models.ForeignKey(Shops, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField( null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)


#Shops spot - miejsce sprzedaży, wydania towaru
class ShopsSpot(models.Model):
    id_shops = models.ForeignKey(Shops, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=50, null=True,blank=True)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20)
    post = models.CharField(max_length=50, null=True,blank=True)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)    
    creator = models.CharField(max_length=5)
    is_active = models.BooleanField()
    photo = models.ImageField(null=True, blank=True)
    delivery = models.BooleanField(null=True,blank=True)
    range = models.IntegerField(default=0)
    type_of_change = models.CharField(max_length=50, null=True,blank=True)
    pick_up_point = models.BooleanField(default=False)
    kind = models.CharField(max_length=50, null=True,blank=True)

#Shops spot ARC
class ShopsSpotARC(models.Model):
    id_shops = models.IntegerField()
    id_spot = models.IntegerField()
    name = models.CharField(max_length=50)
    city = models.IntegerField()
    street = models.CharField(max_length=50)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20)
    post = models.CharField(max_length=30)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField(null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)    
    creator = models.CharField(max_length=5, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    photo = models.ImageField(null=True, blank=True)
    delivery = models.BooleanField(null=True,blank=True)
    range = models.IntegerField(default=0)
    type_of_change = models.CharField(max_length=50)
    pick_up_point = models.BooleanField(null=True,blank=True)
    date_of_archiv = models.DateTimeField(auto_now_add=True)
    archiver = models.CharField(max_length=5)
    kind = models.CharField(max_length=50, null=True,blank=True)

#Shops Spot description
class ShopsSpotDescriptions(models.Model):
    id_shops_spot = models.ForeignKey(ShopsSpot, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)


#Shops_contact
class ShopsContact(models.Model):
    id_shops = models.ForeignKey(Shops, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    description = models.CharField(max_length=512)
    date_of_entry = models.DateTimeField(auto_now_add=True)   
    creator = models.CharField(max_length=5)
    is_active = models.BooleanField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    type_of_change = models.CharField(max_length=50, null=True, blank=True)    

#Shops_contact ARC
class ShopsContactARC(models.Model):
    id_shops = models.IntegerField()
    id_contact = models.IntegerField()
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    description = models.CharField(max_length=512)
    date_of_entry = models.DateTimeField()   
    creator = models.CharField(max_length=5)
    is_active = models.BooleanField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    type_of_change = models.CharField(max_length=50, null=True, blank=True)
    date_of_archiv = models.DateTimeField(auto_now_add=True)
    archiver = models.CharField(max_length=5, null=True, blank=True)

# AreasSpotsShops - przypisanie produktu do sklepu( rolnika itp.)
class MyProducts(models.Model):
    id_product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    id_shops_spot = models.ForeignKey(ShopsSpot, on_delete=models.CASCADE, null=True)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)

# Archiwizacja wszelkich zmian w tabeli - MyProducts 
class MyProductsARC(models.Model):
    id_product = models.IntegerField()
    id_shops_spot = models.IntegerField()
    date_of_entry = models.DateTimeField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    date_of_archiv = models.DateTimeField(auto_now=True)
    archiver = models.CharField(max_length=5)

# MyProductsPhotos - dodatkowe zdjecia produktu robione przrz sklep ( rolnika itp.)
class MyProductsPhotos(models.Model):
    id_my_product = models.ForeignKey(MyProducts, on_delete=models.CASCADE, null=True)
    photo = models.ImageField()
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)

# Archiwizacja wszelkich zmian w tabeli - MyProductsPhotos
class MyProductsPhotosARC(models.Model):
    id_my_product = models.IntegerField()
    photo = models.ImageField()
    date_of_entry = models.DateTimeField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    date_of_archiv = models.DateTimeField(auto_now=True)
    archiver = models.CharField(max_length=5)

# MyProductsDescriptions - dodatkowy opis robiony przez sklep( rolnika itp.)
# dla sprzedawanego produktu
class MyProductsDescriptions(models.Model):
    id_my_product = models.ForeignKey(MyProducts, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True) 

# Archiwizacja wszelkich zmian w tabeli - MyProductsDescriptions
class MyProductsDescriptionsARC(models.Model):
    id_my_product = models.IntegerField()
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    date_of_archiv = models.DateTimeField(auto_now=True)
    archiver = models.CharField(max_length=5)

## ---------  END SHOP  ------------ ##

## ---------  AREA  ------------ ##


##################### Areas ######################################

#Areas HQ place - miejsce prowadzenia działalnosci
class Areas(models.Model):
    name = models.CharField(max_length=50)
    nip = models.CharField(max_length=20)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=50,null=True,blank=True)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20,null=True,blank=True)
    post = models.CharField(max_length=50)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)    
    creator = models.CharField(max_length=5)
    is_active = models.BooleanField()
    bank_account = models.CharField(max_length=50)
    type_of_change = models.CharField(max_length=50,null=True, blank=True)

    def __str__(self):
         return self.name          

class AreasARC(models.Model):
    id_areas = models.IntegerField()
    name = models.CharField(max_length=50)
    nip = models.CharField(max_length=20)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=50,null=True,blank=True)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20,null=True,blank=True)
    post = models.CharField(max_length=50)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    creator = models.CharField(max_length=5)
    is_active = models.BooleanField()
    bank_account = models.CharField(max_length=50)
    type_of_change = models.CharField(max_length=50,null=True, blank=True)
    date_of_archiv = models.DateTimeField(auto_now=True)
    archiver = models.CharField(max_length=5)

    def __str__(self):
         return self.name

# Descriptions Areas
class AreasDescriptions(models.Model):
    id_area = models.ForeignKey(Areas, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True) 

#Area_contact
class AreaContact(models.Model):
    id_area = models.ForeignKey(Areas, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    description = models.CharField(max_length=255)
    date_of_entry = models.DateTimeField(auto_now_add=True)   
    creator = models.CharField(max_length=5)
    is_active = models.BooleanField()
    date_of_change= models.DateTimeField( null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    type_of_change = models.CharField(max_length=50, null=True, blank=True)  

#Area_contact ARC
class AreaContactARC(models.Model):
    id_area = models.IntegerField()
    id_contact = models.IntegerField()
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    description = models.CharField(max_length=512)
    date_of_entry = models.DateTimeField()   
    creator = models.CharField(max_length=5)
    is_active = models.BooleanField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    type_of_change = models.CharField(max_length=50, null=True, blank=True)
    date_of_archiv = models.DateTimeField(auto_now=True)
    archiver = models.CharField(max_length=5)   

#Areas spot - miejsce, obszar fizycznego dostarczania towaru 
class AreasSpot(models.Model):
    id_area = models.ForeignKey(Areas, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    city =  models.CharField(max_length=50)
    street = models.CharField(max_length=50, null=True,blank=True)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20)
    post = models.CharField(max_length=50)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField(auto_now=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)    
    creator = models.CharField(max_length=5, null=True, blank=True)
    is_active = models.BooleanField()
    photo = models.ImageField(null=True, blank=True)
    type_of_change = models.CharField(max_length=50, null=True,blank=True)

#Shops spot ARC
class AreasSpotARC(models.Model):
    id_area = models.IntegerField()
    id_spot = models.IntegerField()
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=50, null=True,blank=True)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20)
    post = models.CharField(max_length=50)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)    
    creator = models.CharField(max_length=5)
    is_active = models.BooleanField()
    photo = models.ImageField(null=True, blank=True)
    type_of_change = models.CharField(max_length=50)
    date_of_archiv = models.DateTimeField(auto_now=True)
    archiver = models.CharField(max_length=5)

# Descriptions spot Areas
class AreasSpotDescriptions(models.Model):
    id_area_spot = models.ForeignKey(AreasSpot, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True) 

# Descriptions spot Areas
class AreasSpotDescriptionsARC(models.Model):
    id_area_spot = models.IntegerField()
    description =  models.CharField(max_length=512, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    date_of_archiv = models.DateTimeField(auto_now=True)
    archiver = models.CharField(max_length=5)

# AreasSpotsCities - przypisanie miejscowości do określonegp
# punktu obszaru sprzedaży
class AreasSpotsCities(models.Model):
    id_area_spot = models.ForeignKey(AreasSpot, on_delete=models.CASCADE, null=True)
    id_city = models.ForeignKey(Citis, on_delete=models.CASCADE, null=True)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)

# Archiwizacja wszelkich zmian w tabeli - AreasSpotsCities 
class AreasSpotsCitiesARC(models.Model):
    id_area_spot = models.IntegerField()
    id_city = models.IntegerField()
    date_of_entry = models.DateTimeField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    date_of_archiv = models.DateTimeField(auto_now=True)
    archiver = models.CharField(max_length=5)

# AreasSpotsShops - przypisanie sklepów( rolników itp.) do określonegp
# punktu obszaru sprzedaży
class AreasSpotsShops(models.Model):
    id_area_spot = models.ForeignKey(AreasSpot, on_delete=models.CASCADE, null=True)
    id_shops_spot = models.ForeignKey(ShopsSpot, on_delete=models.CASCADE, null=True)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)

# Archiwizacja wszelkich zmian w tabeli - AreasSpotsShops 
class AreasSpotsShopsARC(models.Model):
    id_area_spot = models.IntegerField()
    id_shops_spot = models.IntegerField()
    date_of_entry = models.DateTimeField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    date_of_archiv = models.DateTimeField(auto_now=True)
    archiver = models.CharField(max_length=5)

## ---------  END AREA  ------------ ##