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
    teeth_status = ToothStatusSerializer(many=True)
    class Meta:
        model = Dentition
        fields = ['patientId', 'teeth_status','occulusion','appliances','rmd']
# ===========================================================
class PatientWomanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientWoman
        fields = "__all__"
class MedicalHistorySerializer(serializers.ModelSerializer):
    woman_info = PatientWomanSerializer()
    class Meta:
        model = MedicalHistory
        fields = "__all__"
class PatientMinorSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientMinor
        fields = "__all__"
class PatientSerialzer (serializers.HyperlinkedModelSerializer):
    address = AddressSerializer()
    minor_info = PatientMinorSerializer()
    medical_history = serializers.HyperlinkedRelatedField(view_name='medicalhistory-detail', read_only=True, lookup_field='pk', allow_null=True)
    patient_dentition = serializers.HyperlinkedRelatedField(view_name='dentition-detail', read_only=True, lookup_field='pk', allow_null=True)
    patient_treatments = serializers.HyperlinkedRelatedField(view_name='treatmentrecord-detail', many=True, lookup_field='pk',read_only=True,allow_null=True)
    class Meta:
        model= Patient
        fields = [
            'first_name',
            'middle_name',
            'last_name',
            'age',
            'birthday',
            'civil_status',
            'religion','sex',
            'nickname',
            'mobile_number',
            'email','address',
            'occupation','reason',
            'patient_treatments',
            'medical_history', 
            'patient_dentition',
            'minor_info']
    def update(self, instance, validated_data):
        if validated_data.get('address') is not None:
            address_data = validated_data.pop('address')
            address_instance= instance.address
            for key, value in address_data.items():
                setattr(address_instance, key, value)
            address_instance.save()
        if validated_data.get('minor_info') is not None:
            minor_data = validated_data.pop('minor_info')
            minor_instance= instance.minor_info
            for key, value in minor_data.items():
                setattr(minor_instance, key, value)
            minor_instance.save()
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance
# =========================================================    
class PatientOverviewSerializer(serializers.HyperlinkedModelSerializer):
    patient_api_url = serializers.HyperlinkedIdentityField(view_name='patients-detail', lookup_field='pk')
    class Meta:
        model=Patient
        fields = ['id', 'last_name', 'first_name', 'sex', 'last_visit', 'patient_url', 'patient_api_url']
class HistoryOverviewSerializer(serializers.ModelSerializer):
    name = serializers.SlugRelatedField(slug_field='patient_treatments.name', read_only=True)
    class Meta:
        model = TreatmentRecord
        fields = ['patient_id','name', 'procedure', 'date', 'record_url']






