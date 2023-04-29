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
@admin.register(TreatmentRecord)
class TreatmentRecordAdmin(admin.ModelAdmin):
    list_display = ('id','patient_id','date','tooth_no','amount_charged','amount_paid','balance')
@admin.register(Procedure)
class ProcedureAdmin(admin.ModelAdmin):
    list_display = ('name','cost')