from rest_framework import serializers
from .models import Patient, PatientMinor, PatientWoman,PatientInformation,TreatmentRecord,Address,Procedure,Dentition
class PatientSerialzer (serializers.ModelSerializer):
    class Meta:
        model= Patient
        fields = ['first_name','middle_name','last_name','age','birthday','civil_status','religion','sex','nickaname','mobile_number','email','occupation','reason']

class PatientWomanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientWoman
        fields = ['patientId','pregnancy','nursing','birth_control']

class PatientMinorSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientMinor
        fields = ['patientId','guardian_name','occupation_guardian']

class PatientInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientInformation
        fields = ['patientId','goodhealth','current_treatment','isIllnessOrOperation','hospitalization','medication','tobacco','isAlchoholOrDrugs','allergies','bloodtype','condition']
        
class TreatmentRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatmentRecord
        fields = ['patientId','date','tooth_no','procedure','amount_charged','amount_paid','balance']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['patientId','building_number','street','village','barangay','city','province']

class ProcedureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields= ['name','cost']

class DentitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dentition
        fields = ['patientId', 'teeth_no','occulusion','appliances','rmd']





