# Generated by Django 4.0.5 on 2023-02-08 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0038_product_productdescriptions'),
    ]

    operations = [
        migrations.AddField(
            model_name='shopsspotarc',
            name='kind',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='shopsspot',
            name='kind',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
