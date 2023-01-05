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
3. nie mogę stworzyć nową osobę do kontaktu (problem z useEffectem)

ShopSpotActivity:

1. Zadanie na Backend (nie mamy pobranego districtu w rduserze getShopSpot ---- spotDetails). Musimy mieć tą informację żeby ustawić wartość defaultową dla districtu
2. Przy edycji: Cannot assign "(<Citis: Zaczarnie>,)": "ShopsSpot.city" must be a "Citis" instance.
3. nie mogę edytować osoby do kontaktu (problem z useEffectem) --- data na backendzie nie zawiera wszystkich danych.
