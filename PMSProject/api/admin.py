from django.contrib import admin

from .models import Patient, PatientMinor, PatientWoman,PatientInformation,TreatmentRecord,Address,Procedure,Dentition
class AddressInline(admin.StackedInline):
    model = Address
    fields = ("building_number", "street", "village", "barangay", "city","province")
class PatientInformationInline(admin.StackedInline):
    model = PatientInformation
    fields = ("goodhealth","current_treatment","isIllnessOrOperation", "hospitalization", "medication", "tobacco", "isAlcoholOrDrugs", "allergies", "bloodtype", "condition")

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')
    inlines = [AddressInline, PatientInformationInline]

    
admin.site.register(Dentition)
admin.site.register(PatientMinor)
admin.site.register(PatientWoman)
admin.site.register(TreatmentRecord)
admin.site.register(Procedure)