# Generated by Django 4.0.5 on 2022-09-22 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_alter_shopsarc_bank_account_alter_shopsarc_city_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='shopscontact',
            name='description',
            field=models.CharField(default=0, max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='shopscontact',
            name='creator',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='shopscontact',
            name='email',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='shopscontact',
            name='modifier',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='shopscontact',
            name='name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='shopscontact',
            name='surname',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='shopsdescription',
            name='creator',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='shopsdescription',
            name='modifier',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]