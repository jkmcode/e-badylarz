# Generated by Django 4.0.5 on 2022-12-13 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0023_areas_areasarc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='areas',
            name='name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='areas',
            name='nip',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='shops',
            name='name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='shops',
            name='nip',
            field=models.CharField(max_length=20),
        ),
    ]
