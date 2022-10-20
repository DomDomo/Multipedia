# Generated by Django 4.0.5 on 2022-10-20 04:45

from django.db import migrations, models
import django.db.models.deletion
import jsonfield.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('multipedia', '0004_alter_search_slug'),
    ]

    operations = [
        migrations.CreateModel(
            name='GoogleSearch',
            fields=[
                ('search', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='google_search', serialize=False, to='multipedia.search')),
                ('title', models.CharField(max_length=200)),
                ('content', jsonfield.fields.JSONField()),
            ],
            options={
                'verbose_name_plural': 'Google Searches',
            },
        ),
    ]
