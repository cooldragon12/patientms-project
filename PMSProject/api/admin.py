from django.contrib import admin

from .models import Patient, PatientMinor, PatientWoman,PatientInformation,TreatmentRecord,Address,Procedure,Dentition

admin.site.register(Patient)
admin.site.register(PatientMinor)
admin.site.register(PatientWoman)
admin.site.register(PatientInformation)
admin.site.register(TreatmentRecord)
admin.site.register(Address)
admin.site.register(Procedure)
admin.site.register(Dentition)