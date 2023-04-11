from django.contrib import admin

from .models import Patient, PatientMinor, PatientWoman,MedicalHistory,TreatmentRecord,Address,Procedure,Dentition, ToothStatus
class AddressInline(admin.StackedInline):
    model = Address
    fields = ("building_number", "street", "village", "barangay", "city","province")
class MedicalHistoryInline(admin.StackedInline):
    model = MedicalHistory
    fields = ("goodhealth","current_treatment","isIllnessOrOperation", "hospitalization", "medication", "tobacco", "isAlcoholOrDrugs", "allergies", "bloodtype", "condition")
class TeethStatuses(admin.TabularInline):
    model = ToothStatus
    fields = ['tooth_no','conditions']
@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')
    inlines = [AddressInline, MedicalHistoryInline]


@admin.register(Dentition)
class DentitionAdmin(admin.ModelAdmin):
    # list_display = ('patient_id')
    inlines = [TeethStatuses]
admin.site.register(PatientMinor)
admin.site.register(PatientWoman)
admin.site.register(TreatmentRecord)
admin.site.register(Procedure)