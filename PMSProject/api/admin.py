from django.contrib import admin

from .models import Patient, PatientMinor, PatientWoman,PatientInformation,TreatmentRecord,Address,Procedure,Dentition
@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')

admin.site.register(PatientMinor)
admin.site.register(PatientWoman)
admin.site.register(PatientInformation)
admin.site.register(TreatmentRecord)
admin.site.register(Address)
admin.site.register(Procedure)
admin.site.register(Dentition)