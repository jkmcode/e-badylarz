# Generated by Django 4.1.2 on 2023-02-15 16:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0044_remove_productsubtypes_language'),
    ]

    operations = [
        # migrations.RemoveField(
        #     model_name='productgenera',
        #     name='language',
        # ),
        # migrations.RemoveField(
        #     model_name='productgeneradescriptions',
        #     name='language',
        # ),
        migrations.RemoveField(
            model_name='productspeciesdescriptions',
            name='language',
        ),
        migrations.RemoveField(
            model_name='producttypesdescriptions',
            name='language',
        ),
    ]