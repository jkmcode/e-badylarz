# Generated by Django 4.1.2 on 2023-01-29 09:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0035_productgenera_photo_productspecies_photo_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='producttypes',
            name='uniqueId',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]