# Generated by Django 4.0.5 on 2023-08-04 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0017_axioserrorlog_alter_myproductsoffered_unique_key'),
    ]

    operations = [
        migrations.RenameField(
            model_name='axioserrorlog',
            old_name='data_error_saveed',
            new_name='data_error_saved',
        ),
        migrations.RenameField(
            model_name='axioserrorlog',
            old_name='user',
            new_name='user_error',
        ),
        migrations.AddField(
            model_name='axioserrorlog',
            name='user_saved',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]