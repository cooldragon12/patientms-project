# Generated by Django 4.2 on 2023-04-11 04:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_patientminor_patient_id_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PatientInformation',
            new_name='PatientMedicalHistory',
        ),
    ]