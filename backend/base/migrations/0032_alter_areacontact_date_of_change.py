# Generated by Django 4.1.2 on 2023-01-12 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0031_alter_areacontact_date_of_entry'),
    ]

    operations = [
        migrations.AlterField(
            model_name='areacontact',
            name='date_of_change',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]