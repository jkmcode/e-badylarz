# Generated by Django 4.0.5 on 2023-05-30 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_remove_myproductsphotos_uniqe_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='myproductsphotos',
            name='unique_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]