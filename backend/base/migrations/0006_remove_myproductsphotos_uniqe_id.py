# Generated by Django 4.0.5 on 2023-05-30 08:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_remove_myproductsphotos_modifier_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='myproductsphotos',
            name='uniqe_id',
        ),
    ]
