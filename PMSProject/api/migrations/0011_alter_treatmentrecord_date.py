# Generated by Django 4.2 on 2023-04-30 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_dentition_appliances_alter_dentition_occlusion_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='treatmentrecord',
            name='date',
            field=models.DateField(auto_now=True),
        ),
    ]
