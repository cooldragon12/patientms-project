# Generated by Django 4.2 on 2023-04-11 04:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_patientwoman_patient_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientminor',
            name='patient_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='minor_info', serialize=False, to='api.patient'),
        ),
        migrations.AlterField(
            model_name='patientwoman',
            name='patient_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='woman_info', serialize=False, to='api.patientinformation'),
        ),
        migrations.AlterField(
            model_name='toothstatus',
            name='patient_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tooth_status', to='api.dentition'),
        ),
    ]