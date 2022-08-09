from django.db import models
from django.contrib.auth.models import User


## Shops

#Shops
class Shops(models.Model):
    name = models.CharField(max_length=50, unique=True)
    nip = models.CharField(max_length=20, unique=True)
    city = models.CharField(max_length=40)
    street = models.CharField(max_length=50)
    no_building = models.CharField(max_length=10)
    post_code = models.CharField(max_length=10)
    post = models.CharField(max_length=40)
    latitude = models.CharField(max_length=20)
    longitude = models.CharField(max_length=20)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=50, null=True, blank=True)    
    creator = models.CharField(max_length=50, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    photo = models.ImageField(null=True, blank=True)

    def __str__(self):
         return self.name

class ShopsARC(models.Model):
    id_shops = models.IntegerField()
    name = models.CharField(max_length=50, unique=True)
    nip = models.CharField(max_length=20)
    city = models.CharField(max_length=40)
    street = models.CharField(max_length=50)
    no_building = models.CharField(max_length=10)
    post_code = models.CharField(max_length=10)
    post = models.CharField(max_length=40)
    latitude = models.CharField(max_length=20)
    longitude = models.CharField(max_length=20)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=50, null=True, blank=True)
    creator = models.CharField(max_length=50, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    photo = models.ImageField(null=True, blank=True)
    type_of_change = models.CharField(max_length=50)

    def __str__(self):
         return self.name

#Shops_description
class ShopsDescription(models.Model):
    id_shops = models.ForeignKey(Shops, on_delete=models.CASCADE, null=True)
    description = models.CharField(max_length=255)
    language = models.CharField(max_length=5)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    creator = models.CharField(max_length=50, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=50, null=True, blank=True)
    type_of_change = models.CharField(max_length=50)

#Shops_contact
class ShopsContact(models.Model):
    id_shops = models.ForeignKey(Shops, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)   
    creator = models.CharField(max_length=50, null=True, blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    modifier = models.CharField(max_length=50, null=True, blank=True)
    type_of_change = models.CharField(max_length=50)    



## Products 

# Product type
class ProductType(models.Model):
    name = models.CharField(max_length=50, unique=True, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    creator = models.CharField(max_length=50, null=True, blank=True)
    modifier = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
         return self.name

## Location

# District
class Districts(models.Model):
    name = models.CharField(max_length=50, unique=True, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    creator = models.CharField(max_length=50, null=True, blank=True)
    modifier = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
         return self.name

# Cities 
class Citis(models.Model):
    id_district = models.ForeignKey(Districts, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    post_code = models.CharField(max_length=10, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    is_active = models.BooleanField(null=True,blank=True)
    creator = models.CharField(max_length=50, null=True, blank=True)
    modifier = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
         return self.name
   

# Descriptions
class Descriptions(models.Model):
    description =  models.CharField(max_length=255, null=True, blank=True)
    language = models.CharField(max_length=2, null=True, blank=True)
    obj_type = models.CharField(max_length=50, null=True, blank=True)
    obj_id = models.CharField(max_length=10, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now=True, null=True,blank=True)
    date_of_change= models.DateTimeField(null=True,blank=True)
    creator = models.CharField(max_length=5, null=True, blank=True)
    modifier = models.CharField(max_length=5, null=True, blank=True)


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