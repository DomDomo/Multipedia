# Generated by Django 4.0.5 on 2022-06-15 03:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('multipedia', '0003_search_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='search',
            name='slug',
            field=models.SlugField(max_length=120, unique=True),
        ),
    ]
