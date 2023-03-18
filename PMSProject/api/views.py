from django.shortcuts import render
from rest_framework import viewsets
from PMSProject.api.migrations.serializers import PatientSerialzer,PatientWomanSerializer,PatientMinorSerializer,PatientInformationSerializer,TreatmentRecordSerializer,AddressSerializer,ProcedureSerializer,DentitionSerializer
from PMSProject.api.models import Patient, PatientMinor, PatientWoman,PatientInformation,TreatmentRecord,Address,Procedure,Dentition


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerialzer

class PatientWomanViewSet(viewsets.ModelViewSet):
    queryset = PatientWoman.objects.all()
    serializer_class = PatientWomanSerializer

class PatientMinorViewSet(viewsets.ModelViewSet):
    queryset = PatientMinor.objects.all()
    serializer_class = PatientMinorSerializer

class PatientInformationViewSet(viewsets.ModelViewSet):
    queryset = PatientInformation.objects.all()
    serializer_class = PatientInformationSerializer

class TreatmentRecordViewSet(viewsets.ModelViewSet):
    queryset = TreatmentRecord.objects.all()
    serializer_class = TreatmentRecordSerializer

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer    

class ProcedureViewSet(viewsets.ModelViewSet):
    queryset = Procedure.objects.all()
    serializer_class = ProcedureSerializer    

class DentitionViewSet(viewsets.ModelViewSet):
    queryset = Dentition.objects.all()
    serializer_class = DentitionSerializer    


