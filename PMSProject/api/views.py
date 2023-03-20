from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from .serializers import *
from .models import *


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerialzer
    lookup_field = "id"
    
class PatientWomanViewSet(viewsets.ModelViewSet):
    queryset = PatientWoman.objects.all()
    serializer_class = PatientWomanSerializer
    lookup_field = "id"

class PatientMinorViewSet(viewsets.ModelViewSet):
    queryset = PatientMinor.objects.all()
    serializer_class = PatientMinorSerializer
    lookup_field = "id"
class PatientInformationViewSet(viewsets.ModelViewSet):
    queryset = PatientInformation.objects.all()
    serializer_class = PatientInformationSerializer
    lookup_field = "id"
class TreatmentRecordViewSet(viewsets.ModelViewSet):
    queryset = TreatmentRecord.objects.all()
    serializer_class = TreatmentRecordSerializer
    lookup_field = "id"
class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer    
    lookup_field = "id"
class ProcedureViewSet(viewsets.ModelViewSet):
    queryset = Procedure.objects.all()
    serializer_class = ProcedureSerializer    
    lookup_field = "id"
class DentitionViewSet(viewsets.ModelViewSet):
    queryset = Dentition.objects.all()
    serializer_class = DentitionSerializer 
    lookup_field = "id"
class PatientListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientOverviewSerializer
    lookup_field = "id"  

