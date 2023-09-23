# Error Code

- 0000 - "Sprawdzenie czy wpisywana oferta na określony produkt już istnieje"         
        alreadyExists = MyProductsOffered.objects.filter(id_my_product__id=data['myproduct'], is_active = True ).exists()
- 0001 - "Wpisywana oferta na określony produkt już istnieje"
        if alreadyExists:
- 0002 - "Pobranie obiektu z tabeli MyProducts"
        myProduct = MyProducts.objects.get(id=data['myproduct'])
- 0003 - "Dodanie obiektu do tabeli MyProductsOffered"
        createdOffer = MyProductsOffered.objects.create(...)
- 0004 - "Pobranie nowoutworzonego obiektu z tabeli MyProductsOffered"
        myOffer = MyProductsOffered.objects.get(unique_key = uniqueKey)
- 0005 - "Kasownie nowoutworzonego obiektu z tabeli MyProductsOffered. Błąd wpiasnia dokumentu zmian stanów"
        MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
- 0006 - "Błąd wpiasnia dokumentu znian stanów do tabeli MyProductsOfferedDoc"
        createdOffer_doc = MyProductsOfferedDoc.objects.create(...)
- 0007 - "Kasownie nowoutworzonego obiektu z tabeli MyProductsOffered. Błąd wpiasnia szczegółów oferty wariant 1"
        MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
- 0008 - "Błąd wpiasnia szczegółów oferty wariant 1"
        createdOffer_v1 = MyProductsPrice.objects.create(...)
- 0009 - "Kasownie nowoutworzonego obiektu z tabeli MyProductsOffered. Błąd wpiasnia szczegółów oferty wariant 2"
        MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
- 0010 - "Błąd wpiasnia szczegółów oferty wariant 2"
        createdOffer_v2 = MyProductsPrice.objects.create(...)
- 0011 - "Kasownie nowoutworzonego obiektu z tabeli MyProductsOffered. Błąd wpiasnia szczegółów oferty wariant 3"
        MyProductsOffered.objects.get(unique_key = uniqueKey).delete()
- 0012 - "Błąd wpiasnia szczegółów oferty wariant 3"
        createdOffer_v3 = MyProductsPrice.objects.create(...)
- 0013 - "Błąd pobrania obiektu z tabeli MyProducts"
        active_object = MyProducts.objects.get(id=data['Id'])
- 0014 - "Błąd zapisu danych w tabeli MyProducts"
        active_object.save()
- 0015 - "Błąd poboru danych do serializacji z tabeli MyProducts"
        myproducts=MyProducts.objects.filter(id_shops_spot=data['IdSpot'],is_delete=False)
- 0016 - "Błąd serializacji danych obiektu myproducts z tabeli MyProducts"
        seriaziler = MyProductsSerializer(myproducts, many = True)
- 0017 - "pobranie wszystkich aktywnych offert"
        offers=MyProductsOffered.objects.filter(is_active = True )
- 0018 - "Błąd kasowania nieaktywnych ofert"
        i.save()
- 0019 - "Błąd przy wpisaniu błędu axiosa do tabeli AxiosErrorLog"
        createdNewLog = AxiosErrorLog.objects.create(...)
- 0020 - "Błąd przy wpisaniu błędu axiosa z LS do tabeli AxiosErrorLog"
        createdNewLog = AxiosErrorLog.objects.create(...)
- 0021 - "Błąd przy wpisaniu Requesta do tabeli AxiosErrorLogRequest"
        createdNewLog = AxiosErrorLogRequest.objects.create(...)
- 0022 - "Pobór danych moich produktów"
        myproducts = MyProducts.objects.filter(id_shops_spot=IdSpot,is_delete=False).order_by('id_product__name')
- 0023 - Błąd serializacji danych obiektu myproducts z tabeli MyProducts
        seriaziler = MyProductsSerializer(myproducts, many=True)
- 0024 - "Pobór danych, moje aktywne oferty"
        myofferss = MyProductsOffered.objects.filter(
            id_my_product__id_shops_spot=IdSpot,is_active=True).order_by('id_my_product__id_product__name')
- 0025 - "Błąd serializacji danych obiektu myofferss z tabeli MyProductsOffered"
         seriaziler = MyOffersSerializer(myofferss, many=True)
- 0026 - "Pobór danych, oferta do kasowania"
        deletemyoffer = MyProductsOffered.objects.get(id=data['offerId'])
- 0027 - "Błąd aktualizacji-kasowania obiektu moja oferta"
        deletemyoffer.save()
- 0028 - "Błąd dodania dokumentu kasowania do tabeli MyProductsOfferedDoc"
        addMyOfferDoc=MyProductsOfferedDoc.objects.create(...)
- 0029 - "Błąd poboru listy aktywnych ofert po kasowaniu"
        myoffers = MyProductsOffered.objects.filter(
            id_my_product__id_shops_spot=data['spotId'],is_active=True).order_by('id_my_product__id_product__name') 
- 0030 - "Błąd serializacji danych obiektu myoffers z tabeli MyProductsOffered po kasowaniu"
        seriaziler = MyOffersSerializer(myoffers, many=True)
- 0031 - "Pobór danych, oferta do dodania ilości oferowanego produktu"
        addQuantitymyoffer = MyProductsOffered.objects.get(id=data['offerId']) 
- 0032 - "Błąd zapisania zmiany, zwiekszenia ilości "
        addQuantitymyoffer.save()
- 0033 - "Błąd dodania dokumentu zwiększenia ilości do tabeli MyProductsOfferedDoc"
        addMyOfferDoc=MyProductsOfferedDoc.objects.create()
- 0034 - "Błąd poboru listy aktywnych ofert po dodaniu ilości"
        myoffers = MyProductsOffered.objects.filter(
            id_my_product__id_shops_spot=data['spotId'],is_active=True).order_by('id_my_product__id_product__name')
- 0035 - "Błąd serializacji danych obiektu myoffers z tabeli MyProductsOffered po dodaniu ilości"
        seriaziler = MyOffersSerializer(myoffers, many=True)
- 0036 - "Pobór danych, szczegóły wybranej oferty"
        myofferssPrice = MyProductsPriceSerializer.objects.filter(id_my_product_offered=IdOffer
- 0037 - "Błąd serializacji danych obiektu myofferssPrice z tabeli MyProductsPrice"
        seriaziler = MyOffersSerializer(myofferssPrice, many=True)
- 0038 - "Błąd przy wpisaniu Requesta do tabeli AxiosErrorLogRequest
        createdNewLog = AxiosErrorLogRequest.objects.create(...)
- 0039 - "Błąd pobrania obiektu z tabeli ShopsSpot"
        spot = ShopsSpot.objects.get(id=Id)
- 0040 - "Błąd serializacji danych z tabeli ShopsSpot"
        seriaziler = ShopSpotsSerializer(spot, many=False)
- 0041 -"Błąd poboru dnych z tabeli AreasSpot"
        spot = AreasSpot.objects.get(id=Id)
- 0042 -"Błąd serializacji danych z tabeli AreasSpot"
        seriaziler = ShopSpotsSerializer(spot, many=False)
- 0043 -"Błąd pobrania obiektów dla okreslonego sklepu z tabeli ShopsSpot"
        spots = ShopsSpot.objects.filter(id_shops=Id).order_by('name')
- 0044 - "Błąd serializacji danych z tabeli ShopsSpot"
        seriaziler = ShopSpotsSerializer(spots, many=True)
- 0045 -"Błąd pobrania obiektu do zapisania zdjęcia wariant 1 wiązanie po id"
        active_object = ShopsSpot.objects.get(id=data['Id'])
- 0046 -"Błąd pobrania obiektu do zapisania zdjęcia wariant 1 wiązanie po nip"
        active_object = Shops.objects.get(nip=taxNo)
- 0047 -"Błąd  zapisania zdjęcia wariant 1"
        active_object.save()
- 0048 -"Błąd pobrania obiektu dla wybranego sklepu z tabeli Shops"
        shop = Shops.objects.get(id = Id)
- 0049 -"Błąd serializacji danych z tabeli Shops"
         seriaziler = ShopsSerializer(shop, many=False)
- 0050 -"Błąd pobrania obiektu z tabeli Shops"
        shop = Shops.objects.get(id=data['id_shops'])
- 0051 -"Błąd utworzenia nowego obiektu w tabeli ShopsSpot"
        spot=ShopsSpot.objects.create(...)
- 0052 -"Błąd poboru danych obiekt z tabeli ShopsSpot"
        spot = ShopsSpot.objects.get(id=data['id_spot'])
- 0053 -"Błąd utworzenia obiektu ARC z tabeli ShopsSpotARC"
        spotARC = ShopsSpotARC.objects.create(...)
- 0054 -"Błąd aktualizacji danych w tabeli ShopsSpot"
        spot.save()
- 0055 -"Błąd poboru zaktualizowanej listy punktów sprzedaży"
        spots=ShopsSpot.objects.filter(id_shops=data['id_shops']).order_by('name')
- 0056 -"Błąd serializacji zaktualizowanej listy punktów sprzedaży"
        seriaziler = ShopSpotsSerializer(spots, many=True)
- 0057 -"Pobór obiektu do aktualizacji z tabeli ShopsSpot"
        spot = ShopsSpot.objects.get(id=data['Id'])
- 0058 -"Błąd utworzenia obiektu ARC w tabeli ShopsSpotARC"
        spotARC = ShopsSpotARC.objects.create(...)
- 0059 -"Błąd zapisania zmiany, aktualizacja pick-up "
        spot.save()
- 0060 -"Błąd pobrania obiektu z tabeli MyProducts"
        my_product=MyProducts.objects.get(id=data['Id'])
- 0061 -"Błąd utworzenia obiektu w tabeli MyProductsPhotos"
        photo=MyProductsPhotos.objects.create(...)
- 0062 -"Błąd pobrania nowotworzonego obiektu z tabeli MyProductsPhotos"
        photos=MyProductsPhotos.objects.filter(unique_date = u_date, id_my_product=data['Id'])
- 0063 -"Błąd serializacji nowotworzonego obiektu z tabeli MyProductsPhotos"
        seriaziler = MyProductsPhotoSerializer(photos, many = True)
- 0064 -"Błąd pobrania obiektu z tabeli MyProductsPhotos"
        active_object = MyProductsPhotos.objects.get(id=data['IdFhoto'])
- 0065 -"Błąd aktualizacji mojego zdjęcia w tabeli MyProductsPhotos"
        active_object.save()
- 0066 -"Błąd poboru listy moich zdjęć z tabeli MyProductsPhotos"
        photos=MyProductsPhotos.objects.filter(id_my_product=data['Id'],is_delete=False)
- 0067 -"Błąd serializacji listy moich zdjęć z tabeli MyProductsPhotos"
        seriaziler = MyProductsPhotoSerializer(photos, many = True)
- 0068 -"Błąd pobrania listy zdjęć z tabeli MyProductsPhotos"
        photos=MyProductsPhotos.objects.filter(id_my_product=Id, is_delete=False)
- 0069 -"Błąd serializacji listy zdjęć z tabeli MyProductsPhotos"
        seriaziler = MyProductsPhotoSerializer(photos, many = True)
- 0070 -"Błąd pobrania obiektu z tabeli MyProductsPhotos"
        active_object = MyProductsPhotos.objects.get(id=data['Id'])
- 0071 -"Błąd zapisania zmian - kasowanie mojego zdjecia w tabeli MyProductsPhotos "
        active_object.save()
- 0072 -"Błąd pobrania aktualnej listy moich zdjęc z tabeli MyProductsPhotos "
        photos=MyProductsPhotos.objects.filter(id_my_product=data['IdProduct'],is_delete=False)
- 0073 -"Błąd serializacji aktualnej listy moich zdjęc z tabeli MyProductsPhotos "
        seriaziler = MyProductsPhotoSerializer(photos, many = True)
- 0074 -"Błąd pobrania obiektu z tabeli Product"
        product = Product.objects.get(id=data['idProduct'])
- 0075 -"Błąd pobrania obiektu z tabeli ShopsSpot"
        spot = ShopsSpot.objects.get(id=data['idSpot'])
- 0076 -"Błąd dodania obiektu z tabeli MyProducts"
        createdMyProduct = MyProducts.objects.create(...)
- 0077 -"Błąd pobrania obiektu z tabeli Product, typeActivity = LIST_OF_PRODUCTS - brak filtrów"
        products = Product.objects.all().order_by('name')
- 0078 -"Błąd pobrania obiektu z tabeli Product, typeActivity = LIST_OF_PRODUCTS - filtr: Lng"
        products = Product.objects.filter(id_product_subtype__id_product_type__language=Lng
                                              ).order_by('name')
- 0079 -"Błąd pobrania obiektu z tabeli Product, typeActivity = LIST_OF_PRODUCTS - filtry: Lng,Cat"
        products = Product.objects.filter(id_product_subtype__id_product_type__language=Lng,
                                              id_product_subtype__id_product_type__id=Cat
                                              ).order_by('name'
- 0080 -"Błąd pobrania obiektu z tabeli Product, typeActivity = LIST_OF_PRODUCTS - filtry: Lng,Cat,Subcat"
        products = Product.objects.filter(id_product_subtype__id_product_type__language=Lng,
                                              id_product_subtype__id_product_type__id=Cat,
                                              id_product_subtype__id=Subcat
                                              ).order_by('name')
- 0081 -"Błąd pobrania obiektu z tabeli Product, typeActivity = LIST_OF_MY_PRODUCTS - filtry: brak"
        products = Product.objects.filter(is_active=True).order_by('name')
- 0082 -"Błąd pobrania obiektu z tabeli Product, typeActivity = LIST_OF_MY_PRODUCTS - filtry: Lng"
        products = Product.objects.filter(is_active=True,
                                              id_product_subtype__id_product_type__language=Lng
                                              ).order_by('name')
- 0083 -"Błąd pobrania obiektu z tabeli Product, typeActivity = LIST_OF_MY_PRODUCTS - filtry: Lng,Cat"
        products = Product.objects.filter(is_active=True,
                                              id_product_subtype__id_product_type__language=Lng,
                                              id_product_subtype__id_product_type__id=Cat
                                              ).order_by('name')
- 0084 -"Błąd pobrania obiektu z tabeli Product, typeActivity = LIST_OF_MY_PRODUCTS - filtry: Lng,Cat,Subcat"
        products = Product.objects.filter(is_active=True,
                                              id_product_subtype__id_product_type__language=Lng,
                                              id_product_subtype__id_product_type__id=Cat,
                                              id_product_subtype__id=Subcat
                                              ).order_by('name')
- 0085 -"Błąd paginacji listy produktów"
        paginator = Paginator(products, page_size)
- 0086 -"Błąd podziału na strony"
        page_obj = paginator.page(page)
- 0087 -"Błąd serializacji strony listy produktów"
        seriaziler = ProductsSerializer(page_obj, many=True)
- 0088 -"Błąd pobrania listy obiektów z tabeli ProductSubTypes"
        productSubCat = ProductSubTypes.objects.filter(id_product_type=Id).order_by('name')
- 0089 -"Błąd serializacji listy obiektów z tabeli ProductSubTypes"
        seriaziler = SubproductTypeSerializer(productSubCat, many=True)
- 0090 -"Błąd pobrania listy obiektów z tabeli ProductTypes"
        productCat = ProductTypes.objects.all().order_by('name')
- 0091 -"Błąd serializacji listy obiektów z tabeli ProductTypes"
        seriaziler = ProductTypeSerializer(productCat, many=True)
- 0092 -"Błąd pobrania listy obiektów z tabeli Descriptions"
        descrition = Descriptions.objects.filter(id_district = Id).order_by('language')
- 0093 -"Błąd serializacji listy obiektów z tabeli Descriptions"
        seriaziler = DistrictsDescSerializer(descrition, many=True)
- 0094 -"Błąd pobrania listy obiektów z tabeli CitiesDescriptions"
        descrition = CitiesDescriptions.objects.filter(id_city = Id).order_by('language')
- 0095 - "Błąd serializacji listy obiektów z tabeli CitiesDescriptions"
        seriaziler = CitiesDescSerializer(descrition, many=True)
- 0096 -"Błąd pobrania listy obiektów z tabeli ShopsDescriptions"
        descrition = ShopsDescriptions.objects.filter(id_shops = Id).order_by('language')
- 0097 -"Błąd serializacji listy obiektów z tabeli ShopsDescription"
        seriaziler = ShopDescSerializer(descrition, many=True)
- 0098 -"Błąd pobrania listy obiektów z tabeli ShopsSpotDescriptions"
        descrition = ShopsSpotDescriptions.objects.filter(id_shops_spot = Id).order_by('language')
- 0099 -"Błąd serializacji listy obiektów z tabeli ShopsSpotDescriptions"
        seriaziler = ShopSpotDescSerializer(descrition, many=True)
- 0100 -"Błąd pobrania listy obiektów z tabeli ProductDescriptions"
        descrition = ProductDescriptions.objects.filter(id_product = Id).order_by('language')
- 0101 -"Błąd serializacji listy obiektów z tabeli ProductDescriptions"
        seriaziler = ProductDescSerializer(descrition, many=True)
- 0102 -"Błąd pobrania listy obiektów z tabeli ProductTypesDescriptions"
        descrition = ProductTypesDescriptions.objects.filter(id_product_type = Id).order_by('language')
- 0103 -"Błąd serializacji listy obiektów z tabeli ProductTypesDescriptions"
        seriaziler = ProductTypesDescSerializer(descrition, many=True)
- 0104 -"Błąd pobrania listy obiektów z tabeli ProductSubtypesDescriptions"
        descrition = ProductSubtypesDescriptions.objects.filter(id_product_subtype = Id).order_by('language')
- 0105 -"Błąd serializacji listy obiektów z tabeli ProductSubtypesDescriptions"
        seriaziler = ProductSubTypesDescSerializer(descrition, many=True)
- 0106 -"Błąd pobrania listy obiektów z tabeli MyProductsDescriptions"
        descrition = MyProductsDescriptions.objects.filter( id_my_product = Id).order_by('language')
- 0107 -"Błąd serializacji listy obiektów z tabeli MyProductsDescriptions"
        seriaziler = MyProductDescSerializer(descrition, many=True)
- 0108 -"Błędna lista parametrów funkcji"
- 0109 -"Błąd pobrania obiektu z tabeli Districts"
        disctrict_obj= Districts.objects.get(id=data['objId'])
- 0110 -"Błąd utworzenia obiektu w tabeli Descriptions"
        desc = Descriptions.objects.create(...)
- 0111 -"Błąd pobrania obiektu z tabeli Descriptions"
        descrip = Descriptions.objects.get(id=data['descId'])
- 0112 -"Błąd aktualizacji obiektu w tabeli Descriptions
        descrip.save()
- 0113 -"Błąd pobrania obiektu z tabeli Citis"
        city_obj= Citis.objects.get(id=data['objId'])
- 0114 -"Błąd utworzenia obiektu w tabeli CitiesDescriptions"
        desc = CitiesDescriptions.objects.create(...)
- 0115 -"Błąd pobrania obiektu z tabeli CitiesDescriptions"
        descrip = CitiesDescriptions.objects.get(id=data['descId'])
- 0116 -"Błąd aktualizacji obiektu w tabeli CitiesDescriptions"
        descrip.save()
- 0117 -"Błąd pobrania obiektu z tabeli Shops"
        shop_obj= Shops.objects.get(id=data['objId'])
- 0118 -"Błąd utworzenia obiektu w tabeli ShopsDescriptions"
        desc = ShopsDescriptions.objects.create(...)
- 0119 -"Błąd pobrania obiektu z tabeli ShopsDescriptions"
        descrip = ShopsDescriptions.objects.get(id=data['descId'])
- 0120 -"Błąd aktualizacji obiektu w tabeli ShopsDescriptions"
        descrip.save()
- 0121 -"Błąd pobrania obiektu z tabeli ShopsSpot"
        spot_obj= ShopsSpot.objects.get(id=data['objId'])
- 0122 -"Błąd utworzenia obiektu w tabeli ShopsSpotDescriptions"
        desc = ShopsSpotDescriptions.objects.create(...)
- 0123 -"Błąd pobrania obiektu z tabeli ShopsSpotDescriptions"
        descrip = ShopsSpotDescriptions.objects.get(id=data['descId'])
- 0124 -"Błąd aktualizacji obiektu w tabeli ShopsSpotDescriptions"
        descrip.save()
- 0125 -"Błąd pobrania obiektu z tabeli Product"
        product_obj= Product.objects.get(id=data['objId'])
- 0126 -"Błąd utworzenia obiektu w tabeli ProductDescriptions"
        desc = ProductDescriptions.objects.create(...)
- 0127 -"Błąd pobrania obiektu z tabeli ProductDescriptions"
        descrip = ProductDescriptions.objects.get(id=data['descId'])
- 0128 -"Błąd aktualizacji obiektu w tabeli ProductDescriptions"
        descrip.save()
- 0129 -"Błąd pobrania obiektu z tabeli ProductTypes"
        product_obj= ProductTypes.objects.get(id=data['objId'])
- 0130 -"Błąd utworzenia obiektu w tabeli ProductTypesDescriptions"
        desc = ProductTypesDescriptions.objects.create(...)
- 0131 -"Błąd pobrania obiektu z tabeli ProductTypesDescriptions"
        descrip = ProductTypesDescriptions.objects.get(id=data['descId'])
- 0132 -"Błąd aktualizacji obiektu w tabeli ProductTypesDescriptions"
        descrip.save()
- 0133 -"Błąd pobrania obiektu z tabeli ProductSubTypes"
        product_obj= ProductSubTypes.objects.get(id=data['objId'])
- 0134 -"Błąd utworzenia obiektu w tabeli ProductSubtypesDescriptions"
        desc = ProductSubtypesDescriptions.objects.create(...)
- 0135 -"Błąd pobrania obiektu z tabeli ProductSubtypesDescriptions"
        descrip = ProductSubtypesDescriptions.objects.get(id=data['descId'])
- 0136 -"Błąd aktualizacji obiektu w tabeli ProductSubtypesDescriptions"
        descrip.save()
- 0137 -"Błąd pobrania obiektu z tabeli MyProducts"
        product_obj= MyProducts.objects.get(id=data['objId'])
- 0138 -"Błąd utworzenia obiektu w tabeli MyProductsDescriptions"
        desc = MyProductsDescriptions.objects.create(...)
- 0139 -"Błąd pobrania obiektu z tabeli MyProductsDescriptions"
        descrip = MyProductsDescriptions.objects.get(id=data['descId'])
- 0140 - "Błąd utworzenia obiektu archiwalnego w tabeli MyProductsDescriptionsARC"
        descARC = MyProductsDescriptionsARC.objects.create(...)
- 0141 -"Błąd aktualizacji obiektu w tabeli MyProductsDescriptions"
        descrip.save()
- 0142 -"Błąd pobrania listy obiektów z tabeli Districts"
        descrition = Descriptions.objects.filter(id_district = Id, language=lng)
- 0143 -"Błąd serializacji listy obiektów z tabeli Districts"
        seriaziler = DistrictsDescSerializer(descrition, many=True)
- 0144 -"Błąd pobrania listy obiektów z tabeli CitiesDescriptions"
        CitiesDescriptions.objects.filter(id_city = Id, language=lng
- 0145 -"Błąd serializacji listy obiektów z tabeli CitiesDescriptions"
        seriaziler = CitiesDescSerializer(descrition, many=True)
- 0146 - "Błąd pobrania listy obiektów z tabeli ShopsDescriptions"
        descrition = ShopsDescriptions.objects.filter(id_shops = Id, language=lng)
- 0147 -"Błąd serializacji listy obiektów z tabeli ShopsDescriptions"
        seriaziler = ShopDescSerializer(descrition, many=True)
- 0148 -"Błąd pobrania listy obiektów z tabeli ShopsSpotDescriptions"
        descrition = ShopsSpotDescriptions.objects.filter(id_shops_spot = Id, language=lng)
- 0149 -"Błąd serializacji listy obiektów z tabeli ShopsSpotDescriptions"
        seriaziler = ShopSpotDescSerializer(descrition, many=True)
- 0150 - "Błąd pobrania listy obiektów z tabeli ProductDescriptions"
        descrition = ProductDescriptions.objects.filter(id_product = Id, language=lng)
- 0151 -"Błąd serializacji listy obiektów z tabeli ProductDescriptions"
        seriaziler = ProductDescSerializer(descrition, many=True)
- 0152 -"Błąd pobrania listy obiektów z tabeli ProductTypesDescriptions"
        descrition = ProductTypesDescriptions.objects.filter(id_product_type = Id, language=lng)
- 0153 -"Błąd serializacji listy obiektów z tabeli ProductTypesDescriptions"
        seriaziler = ProductTypesDescSerializer(descrition, many=True)
- 0154 -"Błąd pobrania listy obiektów z tabeli ProductSubtypesDescriptions"
        descrition = ProductSubtypesDescriptions.objects.filter(id_product_subtype = Id, language=lng)
- 0155 -"Błąd serializacji listy obiektów z tabeli ProductSubtypesDescriptions"
        seriaziler = ProductSubTypesDescSerializer(descrition, many=True)
- 0156 -"Błąd pobrania listy obiektów z tabeli MyProductsDescriptions"
        descrition = MyProductsDescriptions.objects.filter(id_my_product = Id, language=lng)
- 0157 -"Błąd serializacji listy obiektów z tabeli MyProductsDescriptions"
        seriaziler = MyProductDescSerializer(descrition, many=True)
- 0158 -"Błąd pobrania listy obiektów dla wybranego sklepu z tabeli ShopsContact"
        contacts = ShopsContact.objects.filter(id_shops=Id).order_by('name')
- 0159 -"Błąd serializacji listy obiektów dla wybranego sklepu z tabeli ShopsContact"
        seriaziler = ShopsContactSerializer(contacts, many=True)
- 0160 -"Błąd pobrania obiektu z tabeli Shops"
        shop = Shops.objects.get(id=data['shop_id'])       
- 0161 -"Błąd pobrania obiektu z tabeli ShopsContact"
        shop_contact_editing = ShopsContact.objects.get(id=data['Id'])
- 0162 -"Błąd utworzenia obiektu archiwalnego w tabeli ShopsContactARC"
        ShopsContactARC.objects.create(...)
- 0163 -"Błąd aktualizacji obiektu w tabeli ShopsContact"
        shop_contact_editing.save()
- 0164 -"Błąd utworzenia obiektu w tabeli ShopsContact"
        shop_contact = ShopsContact.objects.create(...)
- 0165 -"Błąd pobrania zaktualizowanej listy kontaktów z tabeli ShopsContact"
        shop_contacts=ShopsContact.objects.filter(id_shops=data['shop_id'])
- 0166 -"Błąd serializacji zaktualizowanej listy kontaktów z tabeli ShopsContact"
        seriaziler = ShopsContactSerializer(shop_contacts, many=True)
- 0167 -"Błąd poboru danych obiekt z tabeli ShopsContact"
        descrip = ShopsContact.objects.get(id=data['Id'])
- 0168 -"Błąd utworzenia obiektu archiwalnego w tabeli ShopsContactARC"
        ShopsContactARC.objects.create(...)
- 0169 -"Błąd aktualizacji obiektu dla przypadku : " + data['objType']
        descrip.save()
- 0170 - "Błąd pobrania obiektów z tabeli Shops"
        shops = Shops.objects.all().order_by('name')        
- 0171 -"Błąd serializacji listy sklepów"
        seriaziler = ShopsSerializer(shops, many=True)
- 0172 -"Błąd poboru danych obiekt z tabeli Shops"
        descrip = Shops.objects.get(id=data['Id'])
- 0173 -"Błąd poboru danych obiekt z tabeli Areas"
        descrip = Areas.objects.get(id=data['Id'])
- 0174 -"Błąd utworzenia obiektu archiwalnego w tabeli AreasARC"
        AreasARC.objects.create(...)
- 0175 -"Błąd pobrania listy obiektów z tabeli Areas"
        areas = Areas.objects.all().order_by('name')
- 0176 -"Błąd serializacji listy obiektów z tabeli Areas"
        seriaziler = AreasSerializer(areas, many=True
- 0177 -"Błędna wartość latitude"
        latCorrect = correctLat(float(data['latitude']))
- 0178 -"Bad request. Wrong longitude"
        lngCorrect = correctLng(float(data['longitude']))
- 0179 -"Błąd przy sprawdzeniu niepowtarzalnej nazwy obszaru sprzedaży w tabeli Areas"
        areaAlreadyExists = Areas.objects.filter(name=data['name']).exists()
- 0180 -"Błąd przy sprawdzeniu niepowtarzalnego NIP dla obszaru sprzedaży w tabeli Areas"
        NIPAlreadyExists = Areas.objects.filter(nip=data['nip']).exists()       
- 0181 -"Nazwa obszaru sprzedaż już istnieje"
- 0182 -"NIP obszaru sprzedaż już istnieje"
- 0183 -"Błąd utworzenia nowego obiektu w tabeli Areas "
        createdArea = Areas.objects.create(...)
- 0184 -"Błąd pobrania obiektu z tabeli Areas"
        area = Areas.objects.get(id=data['id'])
- 0185 -"Błąd utworzenia obiektu archiwalnego w tabeli AreasARC"
        AreasARC.objects.create(...)
- 0186 -"Błąd aktualizacji obiektu w tabeli Areas"
        area.save()
- 0187 -"Błąd pobrania obiektu z tabeli Areas"
        area = Areas.objects.get(id=Id)
- 0188 -"Błąd serializacji obiektu z tabeli Area"
        seriaziler = AreasSerializer(area, many=False)
- 0189 -

- 0190 -        
- 0191 -
- 0192 -
- 0193 -
- 0194 -
- 0195 -
- 0196 -
- 0197 -
- 0198 -
- 0199 -

NavbarComponent

- Composition - write small reusable components
- Props - pass data from parent to child

CSSTransition

- unmountOExit - removes childeren when there are not active
- timeout - defines the duration if the animation

# Packages

- asgiref 3.5.1
- Django 4.0.4
- django-cors-headers 3.12.0
- djangorestframework 3.13.1
- djangorestframework-simplejwt 5.2.0
- pip 22.0.4
- PyJWT 2.4.0
- pytz 2022.1
- setuptools 62.0.0
- sqlparse 0.4.2
- tzdata 2022.1
- wheel 0.37.1

To Do:

1. button toggle na panelu
2. zrobić komponent z windowWidth
3. Autentykacja dla actions AdminActions (wszystkie)
4. backend: Permissions for SuperUsera and IsStaff

Do zrobienia:

1. Dodawanie sklepu do bazy danych + formularz (formluarz będzie posiadać zdjęcie ale do zrobenia później)
2. Modyfikacja sklepu (Edit - zmiana danych)
3. Opis/komentarz wielojęzyczyny dla sklepu
4. Dodawanie obsaru zakupów + modyfikacja + komentarz/opis (jak dla sklepu)

Front 5. SVG na logo (zamienić PNG na SVG) 6. Poprawić politykę prywatności o nową domene oraz adres firmy

/// Kosztyk / Cart -- do zrobienia

1. jak wybieram produkty z MuliImageSlidera i przechodzę do Kosztyka to musze odświeżyć strone żeby je zobaczyć.
   Rozwiązanie
   --- w context.js przeniosłem obiekt InitialState do funkcj komponentu. Dzięki temu InitialState (wartość początkowa) zawsze się renderuje przy wywyołaniu komponentu
2. W koszyku --- jak zmienie ilość produktów i odświeże strone to mam ilość produktów przed ich zmniejszeniem lub zwiększeniem
   Rozwiązanie
   --- dodałem w actionach dopisywanie bierzących zmian ilości do LocalStorage
3. na navbarze nie pokazuje się ilość gdy jestem na głownej stronie (home z formularzem)
   --- Problem powstaje gdy odświażamy stronę. Wtedy wszytskie dane w Reduxsie zostaja usunięte. Gdy przechodzę do głównje strony za pomocą Link albo Navigate to ilość produktów pochodząca z Reduxa jest widoczna (wszytsko działa okey).

///

Addcontact do zrobienia:

1. nie moge wyśrodkować napisu "Brak danych" w tabeli contact List (nornalnie uzywam do tego useFefa zeby odczytać jego szerokość).
2. usunąć zbędne pola infromacyjne w inputach.

3. Czy tworzenie jednego Reducera i Actiona dla kontaku użytego w wielu miejscach ma senes??
   Jeżeli tak to musimy stworzyc parament na podstawie którego będziemy zmieniać atrybuty we views oraz reducerze.
4. W archiwalnych recordach mamy nową nazwe osoby kontaktowej. Czy to tak ma byc czy nie?
5. dlaczego nie ma relacji w AreasSpotARC i ShopsSpotARC???

6. Należy poprawić w edit Spot dla shop i area (city jest przekazywane do viewsa jako pusty string)
   Może przeba dodać do serializacji Spota ID który ma zagnieżdzony city (jest uruchamiany poprzez getSpot)

7. GET_SHOPS_LIST_DELETE blokuje wywolanie actiona do zapisywania image (ścieżki URL). Ponieważ nie wykonuje
   się warunek w ShpoActivity.js :

   Problem występuje tylko przy edicie ponieważ należy znaleść odpowiedni sklep z konkretnym nipem.
   Dlatego musimy puścić pętle po "shopList". W momencie naciśnięcia guzika "EDIT" zmienna "successUpdateShop" zmienia swoja wartość na True co pozwala na wykonanie warunek w UseEffecie odpowiedzialnego za nawigowanie do głownego menu oraz uruchomienie GET_SHOPS_LIST_DELETE (czyli reducera kasującego liste sklepów).

   Powoduje to problem w przypadku gdy będziemy zmieniać NIP (musimy rozważyć czy nip może być edytowany)

Sposoby na zmienjszenie zdjęcia do uploadu na AWS-a używając Reacta

import React, { useState } from 'react';
import AWS from 'aws-sdk';

const ResizeableImageUploader = () => {
const [image, setImage] = useState(null);
const [url, setUrl] = useState('');
const [width, setWidth] = useState(200);
const [height, setHeight] = useState(200);

// You should set your AWS credentials and region
AWS.config.update({
accessKeyId: 'YOUR_ACCESS_KEY_ID',
secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
region: 'YOUR_REGION'
});

const handleFileChange = async e => {
const file = e.target.files[0];
if (!file) return;
setImage(file);
};

const handleUpload = async () => {
if (!image) return;

    // Resize the image before uploading
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        async (resizedImage) => {
          try {
            // Create an S3 service object
            const s3 = new AWS.S3();
            // Define the parameters for the S3 upload
            const params = {
              Bucket: 'YOUR_BUCKET_NAME',
              Key: `images/${image.name}`, // This is the path and file name of the image
              Body: resizedImage,
              ContentType: image.type,
              ACL: 'public-read'
            };
            // Upload the image to S3
            const data = await s3.upload(params).promise();
            // Get the URL of the uploaded image
            setUrl(data.Location);
            // Insert the image URL into the database
            // ...
          } catch (err) {
            console.error(err);
          }
        },
        image.type
      );
    };

};

return (

<div>
<input type="file" onChange={handleFileChange} />
<div>
<label>Width:</label>
<input
type="number"
value={width}
onChange={e => setWidth(e.target.value)}
/>
<label>Height:</label>
<input
type="number"
value={height}
onChange={e => setHeight(e.target.value)}
/>
</div>
<button onClick={handleUpload}>Upload</button>
{url && <img src={url} width={width} height={height} />}
</div>
);
};

export default ResizeableImageUploader;

Edit:
Czy ujednolicić pobieranie odpowiednich rekorów z DB, żeby wpisać defaultowe wartości przy edytowaniu.
ogarnąc ten błąd odnośnie defaultowych wartości !!!

https://www.figma.com/file/jK5MiXnvALVxpV67o78lDT/Foodu---Food-Delivery-App-UI-Kit-(Community)?node-id=0%3A1&t=higqwlhZoAC2n4DA-0
