# Generated by Django 4.0.4 on 2022-07-20 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_alter_shops_nip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shops',
            name='photo',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]