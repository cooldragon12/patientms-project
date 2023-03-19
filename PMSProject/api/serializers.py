from rest_framework import serializers
from .models import *


        
class TreatmentRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatmentRecord
        fields = "__all__"

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"

class ProcedureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields= "__all__"
# ===============Dentition Records===========================
class ToothStatusSerializer(serializers.ModelSerializer):
    # This will have to be dependent to Dentition Model
    class Meta:
        model = ToothStatus
        fields = "__all__"
class DentitionSerializer(serializers.ModelSerializer):
    # TODO: Add Edit and Delete for the Teeth Status connected to the Dentition
    teeth_status = ToothStatusSerializer('patient_tooth_condition',many=True)
    class Meta:
        model = Dentition
        fields = ['patientId', 'teeth_status','occulusion','appliances','rmd']
# ===========================================================
class PatientInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientInformation
        fields = "__all__"
class PatientWomanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientWoman
        fields = "__all__"
class PatientMinorSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientMinor
        fields = "__all__"
class PatientSerialzer (serializers.ModelSerializer):
    address = AddressSerializer(read_only=True)
    class Meta:
        model= Patient
        fields = ['first_name',
                  'middle_name',
                  'last_name',
                  'age',
                  'birthday',
                  'civil_status',
                  'religion','sex',
                  'nickname',
                  'mobile_number',
                  'email','address','occupation','reason']




