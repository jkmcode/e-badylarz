from django.db import models
from django.contrib.auth.models import User
from django.db import connection

## ------------  LOCATION  ------------ ##

## ##################### Districts ######################################

class Districts(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True,null=True,blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    latitude = models.CharField(max_length=25, null=True, blank=True)
    longitude = models.CharField(max_length=25, null=True, blank=True)

    def __str__(self):
         return self.name

# Descriptions Districts
class Descriptions(models.Model):
    id_district = models.ForeignKey(Districts, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=255, null=True, blank=True)
    language = models.CharField(max_length=2, null=True, blank=True)
    # obj_type = models.CharField(max_length=50, null=True, blank=True)
    # obj_id = models.CharField(max_length=10, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True, null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)

# ##################### Cities ######################################
 
class Citis(models.Model):
    id_district = models.ForeignKey(Districts, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    post_code = models.CharField(max_length=10, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True, null=True,blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    latitude = models.CharField(max_length=25, null=True, blank=True)
    longitude = models.CharField(max_length=25, null=True, blank=True)

    def __str__(self):
         return self.name

# Descriptions Cities
class CitiesDescriptions(models.Model):
    id_city = models.ForeignKey(Citis, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=255, null=True, blank=True)
    language = models.CharField(max_length=2, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True, null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)

## ---------  END  LOCATION  ------------ ##


##################### Areas ######################################

#Areas HQ place - miejsce prowadzenia działalnosci
class Areas(models.Model):
    name = models.CharField(max_length=50)
    nip = models.CharField(max_length=20)
    city = models.CharField(max_length=40)
    street = models.CharField(max_length=50)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20)
    post = models.CharField(max_length=30)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=20, null=True, blank=True)    
    creator = models.CharField(max_length=20, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    bank_account = models.CharField(max_length=40, null=True, blank=True)
    type_of_change = models.CharField(max_length=50,null=True, blank=True)

    def __str__(self):
         return self.name          

class AreasARC(models.Model):
    id_areas = models.IntegerField()
    name = models.CharField(max_length=50)
    nip = models.CharField(max_length=20)
    city = models.CharField(max_length=40)
    street = models.CharField(max_length=50)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20)
    post = models.CharField(max_length=30)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField( null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=20, null=True, blank=True)
    creator = models.CharField(max_length=20, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    bank_account = models.CharField(max_length=40, null=True, blank=True)
    type_of_change = models.CharField(max_length=50,null=True, blank=True)
    date_of_archiv = models.DateTimeField(auto_now=True, null=True,blank=True)
    archiver = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
         return self.name

#Area_contact
class AreaContact(models.Model):
    id_area = models.ForeignKey(Areas, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=40)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    description = models.CharField(max_length=255)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)   
    creator = models.CharField(max_length=20, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True, null=True,blank=True)
    modifier = models.CharField(max_length=20, null=True, blank=True)
    type_of_change = models.CharField(max_length=50)  

#Area_contact ARC
class AreaContactARC(models.Model):
    id_area = models.IntegerField()
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=40)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    description = models.CharField(max_length=255)
    date_of_entry = models.DateTimeField( null=True,blank=True)   
    creator = models.CharField(max_length=20, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=20, null=True, blank=True)
    type_of_change = models.CharField(max_length=50)
    date_of_archiv = models.DateTimeField(auto_now=True, null=True,blank=True)
    id_contact = models.IntegerField()
    archiver = models.CharField(max_length=20, null=True, blank=True)

#Shops spot - miejsce sprzedaży, wydania towaru
class AreasSpot(models.Model):
    id_area = models.ForeignKey(Areas, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    city = models.ForeignKey(Citis, on_delete=models.CASCADE, null=True)
    street = models.CharField(max_length=50)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20)
    post = models.CharField(max_length=30)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=20, null=True, blank=True)    
    creator = models.CharField(max_length=20, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    photo = models.ImageField(null=True, blank=True)
    delivery = models.BooleanField(null=True,blank=True)
    range = models.IntegerField(default=0)
    type_of_change = models.CharField(max_length=50)

#Shops spot ARC
class AreasSpotARC(models.Model):
    id_area = models.IntegerField()
    id_spot = models.IntegerField()
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=40)
    street = models.CharField(max_length=50)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20)
    post = models.CharField(max_length=30)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField( null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=20, null=True, blank=True)    
    creator = models.CharField(max_length=20, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    photo = models.ImageField(null=True, blank=True)
    delivery = models.BooleanField(null=True,blank=True)
    range = models.IntegerField(default=0)
    type_of_change = models.CharField(max_length=50)
    date_of_archiv = models.DateTimeField(auto_now=True, null=True,blank=True)
    archiver = models.CharField(max_length=20, null=True, blank=True)

##################### Shops ######################################

#Shops HQ place - miejsce prowadzenia działalnosci
class Shops(models.Model):
    name = models.CharField(max_length=50)
    nip = models.CharField(max_length=20,null=True,blank=True)
    city = models.CharField(max_length=40)
    street = models.CharField(max_length=50,null=True,blank=True)
    no_building = models.CharField(max_length=30,null=True,blank=True)
    post_code = models.CharField(max_length=20,null=True,blank=True)
    post = models.CharField(max_length=30,null=True,blank=True)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True, null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)    
    creator = models.CharField(max_length=5, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    bank_account = models.CharField(max_length=40, null=True, blank=True)
    photo = models.ImageField(null=True, blank=True)

    def __str__(self):
         return self.name


class ShopsARC(models.Model):
    id_shops = models.IntegerField()
    name = models.CharField(max_length=50)
    nip = models.CharField(max_length=20,null=True,blank=True)
    city = models.CharField(max_length=40)
    street = models.CharField(max_length=50,null=True,blank=True)
    no_building = models.CharField(max_length=30,null=True,blank=True)
    post_code = models.CharField(max_length=20,null=True,blank=True)
    post = models.CharField(max_length=30,null=True,blank=True)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField( null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    bank_account = models.CharField(max_length=40, null=True, blank=True)
    photo = models.ImageField(null=True, blank=True)
    type_of_change = models.CharField(max_length=50)
    date_of_archiv = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    archiver = models.CharField(max_length=5, null=True, blank=True)

    def __str__(self):
         return self.name

#Shops_description
class ShopsDescriptions(models.Model):
    id_shops = models.ForeignKey(Shops, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=255, null=True, blank=True)
    language = models.CharField(max_length=2, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True, null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)


#Shops spot - miejsce sprzedaży, wydania towaru
class ShopsSpot(models.Model):
    id_shops = models.ForeignKey(Shops, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    city = models.ForeignKey(Citis, on_delete=models.CASCADE, null=True)
    street = models.CharField(max_length=50)
    no_building = models.CharField(max_length=30)
    post_code = models.CharField(max_length=20)
    post = models.CharField(max_length=30)
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True,null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)    
    creator = models.CharField(max_length=5, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    photo = models.ImageField(null=True, blank=True)
    delivery = models.BooleanField(null=True,blank=True)
    range = models.IntegerField(default=0)
    type_of_change = models.CharField(max_length=50)

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
    date_of_archiv = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    archiver = models.CharField(max_length=5, null=True, blank=True)

#Shops Spot description
class ShopsSpotDescriptions(models.Model):
    id_shops_spot = models.ForeignKey(Shops, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=255, null=True, blank=True)
    language = models.CharField(max_length=2, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True, null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)


#Shops_contact
class ShopsContact(models.Model):
    id_shops = models.ForeignKey(Shops, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=40)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    description = models.CharField(max_length=255)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)   
    creator = models.CharField(max_length=5, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True, null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    type_of_change = models.CharField(max_length=50)    

#Shops_contact ARC
class ShopsContactARC(models.Model):
    id_shops = models.IntegerField()
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=40)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    description = models.CharField(max_length=255)
    date_of_entry = models.DateTimeField( null=True,blank=True)   
    creator = models.CharField(max_length=5, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)
    type_of_change = models.CharField(max_length=50)
    date_of_archiv = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    id_contact = models.IntegerField()
    archiver = models.CharField(max_length=20, null=True, blank=True)

## ------------  PRODUCT  ------------ ##

# Product type
class ProductTypes(models.Model):
    name = models.CharField(max_length=50, unique=True, null=True, blank=True)
    language = models.CharField(max_length=2, null=True, blank=True)
    photo = models.ImageField(null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True,null=True,blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)

    def __str__(self):
         return self.name

#Product types description
class ProductTypesDescriptions(models.Model):
    id_product_type = models.ForeignKey(ProductTypes, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=255, null=True, blank=True)
    language = models.CharField(max_length=2, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True, null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)


# Product Species
class ProductSpecies(models.Model):
    id_product_type = models.ForeignKey(ProductTypes, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50, unique=True, null=True, blank=True)
    language = models.CharField(max_length=2, null=True, blank=True)
    photo = models.ImageField(null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True,null=True,blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)

    def __str__(self):
         return self.name

#Product Species description
class ProductSpeciesDescriptions(models.Model):
    id_product_species = models.ForeignKey(ProductSpecies, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=255, null=True, blank=True)
    language = models.CharField(max_length=2, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True, null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)

####
# Product Genera
class ProductGenera(models.Model):
    id_product_species = models.ForeignKey(ProductSpecies, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50, unique=True, null=True, blank=True)
    language = models.CharField(max_length=2, null=True, blank=True)
    photo = models.ImageField(null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True,null=True,blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)

    def __str__(self):
         return self.name

#Product Genera description
class ProductGeneraDescriptions(models.Model):
    id_product_genera = models.ForeignKey(ProductGenera, on_delete=models.CASCADE, null=True)
    description =  models.CharField(max_length=255, null=True, blank=True)
    language = models.CharField(max_length=2, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True, null=True,blank=True)
    date_of_change= models.DateTimeField(auto_now=True, null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)

## ------------END  PRODUCT  ------------ ##  

# To change
class Place_of_pickups(models.Model):
    id_district = models.ForeignKey(Districts, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    citi = models.CharField(max_length=50, null=True, blank=True)
    poste_code = models.CharField(max_length=10, null=True, blank=True)
    street = models.CharField(max_length=50, null=True, blank=True)
    number = models.CharField(max_length=15, null=True, blank=True)
    lat = models.CharField(max_length=30, null=True, blank=True)
    lng = models.CharField(max_length=30, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    creator = models.CharField(max_length=50, null=True, blank=True)
    modifier = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
         return self.name







# class Product(models.Model):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     name = models.CharField(max_length=200, null=True, blank=True)
#     image = models.ImageField(null=True, blank=True, default="/placeholder.png")
#     brand = models.CharField(max_length=200, null=True, blank=True)
#     category = models.CharField(max_length=200, null=True, blank=True)
#     description = models.TextField(null=True, blank=True)
#     rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     numReviews = models.IntegerField(null=True, blank=True, default=0)
#     price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     countInStock = models.IntegerField(null=True, blank=True, default=0)
#     createdAt = models.DateTimeField(auto_now_add=True)
#     _id = models.AutoField(primary_key=True, editable=False)

#     def __str__(self):
#         return self.name


# class ProductImages(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
#     images = models.ImageField(null=True, blank=True)


# class Review(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     name = models.CharField(max_length=200, null=True, blank=True)
#     rating = models.IntegerField(null=True, blank=True, default=0)
#     comment = models.TextField(null=True, blank=True)
#     createdAt = models.DateTimeField(auto_now_add=True)
#     _id = models.AutoField(primary_key=True, editable=False)

#     def __str__(self):
#         return str(self.rating)


# class Order(models.Model):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     paymentMethod = models.CharField(max_length=200, null=True, blank=True)
#     taxPrice = models.DecimalField(
#         max_digits=7, decimal_places=2, null=True, blank=True
#     )
#     shippingPrice = models.DecimalField(
#         max_digits=7, decimal_places=2, null=True, blank=True
#     )
#     totalPrice = models.DecimalField(
#         max_digits=7, decimal_places=2, null=True, blank=True
#     )
#     isPaid = models.BooleanField(default=False)
#     paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
#     isDelivered = models.BooleanField(default=False)
#     deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
#     createdAt = models.DateTimeField(auto_now_add=True)
#     _id = models.AutoField(primary_key=True, editable=False)

#     def __str__(self):
#         return str(self.createdAt)


# class OrderItem(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
#     order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
#     name = models.CharField(max_length=200, null=True, blank=True)
#     qty = models.IntegerField(null=True, blank=True, default=0)
#     price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     image = models.CharField(max_length=200, null=True, blank=True)
#     _id = models.AutoField(primary_key=True, editable=False)

#     def __str__(self):
#         return str(self.name)


# class ShippingAddress(models.Model):
#     order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
#     address = models.CharField(max_length=200, null=True, blank=True)
#     city = models.CharField(max_length=200, null=True, blank=True)
#     postalCode = models.CharField(max_length=200, null=True, blank=True)
#     country = models.CharField(max_length=200, null=True, blank=True)
#     shippingPrice = models.DecimalField(
#         max_digits=7, decimal_places=2, null=True, blank=True
#     )
#     _id = models.AutoField(primary_key=True, editable=False)

#     def __str__(self):
#         return str(self.address)