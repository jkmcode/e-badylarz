# Generated by Django 4.0.5 on 2022-06-24 08:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Place_of_pickups',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('citi', models.CharField(blank=True, max_length=50, null=True)),
                ('poste_code', models.CharField(blank=True, max_length=10, null=True)),
                ('street', models.CharField(blank=True, max_length=50, null=True)),
                ('number', models.CharField(blank=True, max_length=15, null=True)),
                ('lat', models.CharField(blank=True, max_length=30, null=True)),
                ('lng', models.CharField(blank=True, max_length=30, null=True)),
                ('date_of_entry', models.DateTimeField(auto_now=True, null=True)),
                ('date_of_change', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(blank=True, null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='districts',
            name='description',
        ),
        migrations.AddField(
            model_name='districts',
            name='date_of_change',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='districts',
            name='date_of_entry',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AddField(
            model_name='districts',
            name='is_active',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='Place_of_pickups_description',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('language', models.CharField(blank=True, max_length=5, null=True)),
                ('date_of_entry', models.DateTimeField(auto_now=True, null=True)),
                ('date_of_change', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(blank=True, null=True)),
                ('id_place_of_pickup', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.place_of_pickups')),
            ],
        ),
        migrations.AddField(
            model_name='place_of_pickups',
            name='id_district',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.districts'),
        ),
        migrations.CreateModel(
            name='Districts_description',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('language', models.CharField(blank=True, max_length=5, null=True)),
                ('date_of_entry', models.DateTimeField(auto_now=True, null=True)),
                ('date_of_change', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(blank=True, null=True)),
                ('id_district', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.districts')),
            ],
        ),
        migrations.CreateModel(
            name='Citis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('date_of_entry', models.DateTimeField(auto_now=True, null=True)),
                ('date_of_change', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(blank=True, null=True)),
                ('id_district', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.districts')),
            ],
        ),
        migrations.CreateModel(
            name='Citi_description',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('language', models.CharField(blank=True, max_length=5, null=True)),
                ('date_of_entry', models.DateTimeField(auto_now=True, null=True)),
                ('date_of_change', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(blank=True, null=True)),
                ('id_citi', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.citis')),
            ],
        ),
    ]
