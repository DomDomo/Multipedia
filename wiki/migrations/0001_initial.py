# Generated by Django 4.0.5 on 2022-10-10 18:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('multipedia', '0004_alter_search_slug'),
    ]

    operations = [
        migrations.CreateModel(
            name='WikiSearch',
            fields=[
                ('search', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='wiki_search', serialize=False, to='multipedia.search')),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
            ],
            options={
                'verbose_name_plural': 'Wiki Searches',
            },
        ),
    ]
