# Generated by Django 3.2.16 on 2023-09-06 22:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('multipedia', '0004_alter_search_slug'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatGPTSearch',
            fields=[
                ('search', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='chatgpt_search', serialize=False, to='multipedia.search')),
                ('prompt', models.CharField(max_length=100)),
                ('response', models.TextField()),
            ],
            options={
                'verbose_name_plural': 'ChatGPT Responses',
            },
        ),
    ]