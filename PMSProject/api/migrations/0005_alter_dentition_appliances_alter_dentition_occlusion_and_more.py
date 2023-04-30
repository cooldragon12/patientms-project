# Generated by Django 4.1.7 on 2023-03-30 09:37

from django.db import migrations, models
import django.db.models.deletion
import multiselectfield.db.fields


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_alter_patientinformation_isalcoholordrugs"),
    ]

    operations = [
        migrations.AlterField(
            model_name="dentition",
            name="appliances",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("orthodontic", "ORTHODONTIC"),
                    ("stayplate", "STAYPLATE"),
                    ("", ""),
                ],
                max_length=100,
            ),
        ),
        migrations.AlterField(
            model_name="dentition",
            name="occlusion",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("class(molar)", "CLASS(MOLAR)"),
                    ("overjet", "OVERJET"),
                    ("overbite", "OVERBITE"),
                    ("midline deviation crossbite", "MIDLINE DEVIATION CROSSBITE"),
                ],
                max_length=100,
            ),
        ),
        migrations.AlterField(
            model_name="dentition",
            name="patient_id",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                primary_key=True,
                related_name="patient_dentition",
                serialize=False,
                to="api.patient",
            ),
        ),
        migrations.AlterField(
            model_name="dentition",
            name="periodontal_screening",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("gingivitis", "GINGIVITIS"),
                    ("early periodontitis", "EARLY PERIODONTITIS"),
                    ("moderate periodontitis", "MODERATE PERIODONTITIS"),
                    ("advanced periodontitis", "ADVANCED PERIODONTITIS"),
                ],
                max_length=100,
            ),
        ),
        migrations.AlterField(
            model_name="dentition",
            name="tmd",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("clenching", "CLENCHING"),
                    ("clicking", "CLICKING"),
                    ("trismus", "TRISMUS"),
                    ("muscle spasm ", "MUSCLE SPASM"),
                ],
                max_length=100,
            ),
        ),
    ]