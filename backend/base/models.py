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
    description =  models.CharField(max_length=1024, null=True, blank=True)
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
    description =  models.CharField(max_length=1024, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)

## ---------  END  LOCATION  ------------ ##

## ------------  PRODUCT  ------------ ##

# Product type
class ProductTypes(models.Model):
    name = models.CharField(max_length=50)
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
    description =  models.CharField(max_length=1024, null=True, blank=True)
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
    description =  models.CharField(max_length=1024, null=True, blank=True)
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
    description =  models.CharField(max_length=1024, null=True, blank=True)
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
    description =  models.CharField(max_length=1024, null=True, blank=True)
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
    description =  models.CharField(max_length=1024, null=True, blank=True)
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
# archiwizacja zmian poprzez zmianę flagi "is_delete" na true i dodanie daty zmiany
class MyProducts(models.Model):
    id_product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    id_shops_spot = models.ForeignKey(ShopsSpot, on_delete=models.CASCADE, null=True)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    is_delete = models.BooleanField(default=False,null=True,blank=True)


# MyProductsPhotos - dodatkowe zdjecia produktu robione przrz sklep ( rolnika itp.)
# archiwizacja zmian poprzez zmianę flagi "is_delete" na true i dodanie daty zmiany
class MyProductsPhotos(models.Model):
    id_my_product = models.ForeignKey(MyProducts, on_delete=models.CASCADE, null=True)
    photo = models.ImageField()
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    unique_date = models.DateTimeField(null=True,blank=True)
    is_delete = models.BooleanField(default=False,null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)


# MyProductsDescriptions - dodatkowy opis robiony przez sklep( rolnika itp.)
# dla sprzedawanego produktu
class MyProductsDescriptions(models.Model):
    id_my_product = models.ForeignKey(MyProducts, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=1024, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True) 

# Archiwizacja wszelkich zmian w tabeli - MyProductsDescriptions
class MyProductsDescriptionsARC(models.Model):
    id_my_product = models.IntegerField()
    description =  models.CharField(max_length=1024, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField()
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    date_of_archiv = models.DateTimeField(auto_now=True)
    archiver = models.CharField(max_length=5)

##################### Offer ######################################

# MyProductsOffered - główna tabela aktualnych ofert
class MyProductsOffered(models.Model):
    id_my_product = models.ForeignKey(MyProducts, on_delete=models.CASCADE, null=True)
    quantity = models.FloatField()
    current_quantity = models.FloatField(null=True, blank=True)
    barrel_bulk = models.CharField(max_length=5)
    barrel_bulk_short = models.CharField(max_length=10,null=True, blank=True)
    barrel_bulk_long = models.CharField(max_length=15,null=True, blank=True)
    offer_from = models.DateTimeField()
    offer_to = models.DateTimeField()
    country_of_origin = models.CharField(max_length=5,null=True, blank=True)
    term_of_validity = models.CharField(max_length=50,null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    is_active = models.BooleanField()
    unique_key = models.FloatField(null=True, blank=True)

# MyProductsPrice - szczegóły oferty
class MyProductsPrice(models.Model):
    id_my_product_offered = models.ForeignKey(MyProductsOffered, on_delete=models.CASCADE, null=True)
    price = models.FloatField()
    sale_price= models.FloatField( null=True, blank=True)
    price_30_day = models.FloatField( null=True, blank=True)
    currency = models.CharField(max_length=5, null=True, blank=True)
    package_size = models.FloatField()


# MyProductsOfferedDoc - dokumenty zmian w tabeli głównej
class MyProductsOfferedDoc(models.Model):
    id_my_product_offered = models.ForeignKey(MyProductsOffered, on_delete=models.CASCADE, null=True)
    quantity = models.FloatField()
    date_of_entry = models.DateTimeField(auto_now=True)
    creator = models.CharField(max_length=5)
    type_document = models.CharField(max_length=50, null=True, blank=True)

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
    description =  models.CharField(max_length=1024, null=True, blank=True)
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
    description =  models.CharField(max_length=1024, null=True, blank=True)
    language = models.CharField(max_length=2)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5)
    modifier = models.CharField(max_length=5, null=True, blank=True) 

# Descriptions spot Areas
class AreasSpotDescriptionsARC(models.Model):
    id_area_spot = models.IntegerField()
    description =  models.CharField(max_length=1024, null=True, blank=True)
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

## ---------  ERORR LOG  ------------ ##

# Archiwizacja błędów po stronie beckendu 
class ErrorLog(models.Model):
    data_error = models.DateTimeField(auto_now=True)
    user = models.CharField(max_length=20, null=True, blank=True)
    function_name = models.CharField(max_length=30, null=True, blank=True)
    error_class = models.CharField(max_length=30, null=True, blank=True)
    error_name = models.CharField(max_length=512, null=True, blank=True)
    pgcode = models.CharField(max_length=10, null=True, blank=True)
    pgerror = models.CharField(max_length=512, null=True, blank=True)
    code_position = models.CharField(max_length=10, null=True, blank=True)
    text_position = models.CharField(max_length=128, null=True, blank=True)

# Archiwizacja błędów po stronie frontendu 
class AxiosErrorLog(models.Model):
    data_error = models.DateTimeField(null=True,blank=True)
    data_error_saved = models.DateTimeField(auto_now=True)
    user_error = models.CharField(max_length=20, null=True, blank=True)
    user_saved = models.CharField(max_length=20, null=True, blank=True)
    function_name = models.CharField(max_length=30, null=True, blank=True)
    error_code = models.CharField(max_length=30, null=True, blank=True)
    error_detail = models.CharField(max_length=50, null=True, blank=True)
    status = models.CharField(max_length=20, null=True, blank=True)
    method = models.CharField(max_length=50, null=True, blank=True)
    url = models.CharField(max_length=256, null=True, blank=True)
    text = models.CharField(max_length=256, null=True, blank=True)
    param = models.CharField(max_length=50, null=True, blank=True)


## ---------  END ERORR LOG  ------------ ##