# Generated by Django 4.1.2 on 2023-01-12 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0030_rename_id_shops_areacontact_id_area_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='areacontact',
            name='date_of_entry',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]