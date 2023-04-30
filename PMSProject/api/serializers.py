from rest_framework import serializers, fields
from .models import TreatmentRecord, Address, Procedure, Patient, PatientMinor, PatientWoman, MedicalHistory, Dentition, ToothStatus, PatientMinor, PatientWoman, MedicalHistory, Dentition, ToothStatus


class ProcedureSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField(method_name='_label', read_only=True)
    value = serializers.ReadOnlyField(source='name', read_only=True)
    name = serializers.CharField(write_only=True)

    class Meta:
        model = Procedure
        fields= ["label", "value", "cost", "name"]

    def _label(self, obj):
        return obj.name.capitalize()

class TreatmentRecordSerializer(serializers.ModelSerializer):
    procedure = ProcedureSerializer(many=True, read_only=True)
    procedures = serializers.ListField(child=serializers.CharField(max_length=200), required=True, write_only=True)
    class Meta:
        model = TreatmentRecord
        fields = ["id", "tooth_no","procedure", "procedures","date", "balance", "patient_id", "amount_charged", "amount_paid"]
        extra_kwargs={
            "patient_id": {"write_only": True},
        }
    def create(self, validated_data):
        procedures_data = validated_data.pop('procedures')
        treatment_record = TreatmentRecord.objects.create(**validated_data)
        for procedure_data in procedures_data:
            procedure = Procedure.objects.get(name=procedure_data)
            treatment_record.procedure.add(procedure)
        return treatment_record
class AddressSerializer(serializers.ModelSerializer):
    full_address = serializers.ReadOnlyField()
    class Meta:
        model = Address
        fields = "__all__"

# ===============Dentition Records===========================
class ToothStatusSerializer(serializers.ModelSerializer):
    # This will have to be dependent to Dentition Model
    class Meta:
        model = ToothStatus
        fields = "__all__"
class DentitionSerializer(serializers.ModelSerializer):
    # TODO: Add Edit and Delete for the Teeth Status connected to the Dentition
    teeth_status = ToothStatusSerializer(many=True)
    tmd = fields.MultipleChoiceField(choices=Dentition.TMDChoices.choices, allow_blank=True)
    appliances = fields.MultipleChoiceField(choices=Dentition.AppliancesChoices.choices, allow_blank=True)
    occlusion = fields.MultipleChoiceField(choices=Dentition.OcclusionChoices.choices, allow_blank=True)
    periodontal_screening = fields.MultipleChoiceField(choices=Dentition.PeriodontalChoices.choices, allow_blank=True)
    class Meta:
        model = Dentition
        fields = "__all__"
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
    treatments = serializers.HyperlinkedIdentityField(view_name='patients-list-treatment', read_only=True, lookup_field='pk', allow_null=True)
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
            'treatments',
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
    # patient_api_url = serializers.HyperlinkedIdentityField(view_name='patients-detail', lookup_field='pk')
    class Meta:
        model=Patient
        fields = ['id', 'last_name', 'first_name', 'sex', 'last_visit', 'patient_url']
class HistoryOverviewSerializer(serializers.ModelSerializer):
    name = serializers.SlugRelatedField(slug_field='patient_treatments.name', read_only=True)
    class Meta:
        model = TreatmentRecord
        fields = ['patient_id','name', 'procedure', 'date', 'record_url']






