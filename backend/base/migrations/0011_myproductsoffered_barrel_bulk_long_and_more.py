# Generated by Django 4.0.5 on 2023-07-07 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_myproductsoffered_myproductsprice_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='myproductsoffered',
            name='barrel_bulk_long',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='myproductsoffered',
            name='barrel_bulk_short',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='myproductsoffered',
            name='current_quantity',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='myproductsoffered',
            name='term_of_validity',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]