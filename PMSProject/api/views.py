from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from .serializers import PatientSerialzer,PatientWomanSerializer,PatientMinorSerializer,PatientInformationSerializer,TreatmentRecordSerializer,AddressSerializer,ProcedureSerializer,DentitionSerializer
from .models import *


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerialzer
    lookup_field = "patient_id"
    # @action(methods=["get"], detail=True, url_name="patient-details")
    # def retrieve(self, request, *args, **kwargs):
    #     return super().retrieve(request, *args, **kwargs)
    
    # @action(methods=["get"],detail=True, url_name="patient-list")
    # def list(self, request, *args, **kwargs):
    #     return super().list(request, *args, **kwargs)
    
    # @action(methods=["post"], detail=True, url_name="patient-create")
    # def create(self, request, *args, **kwargs):
    #     return super().create(request, *args, **kwargs)
    
    # @action(methods=["put"], detail=True, url_name="patient-update")
    # def update(self, request, *args, **kwargs):
    #     return super().update(request, *args, **kwargs)
    
    # @action(methods=["delete"], detail=True, url_name="patient-delete")
    # def destroy(self, request, *args, **kwargs):
    #     return super().destroy(request, *args, **kwargs)
    
    # @action(methods=["patch"], detail=True, url_name="patient-partial-update")
    # def partial_update(self, request, *args, **kwargs):
    #     return super().partial_update(request, *args, **kwargs)
    
class PatientWomanViewSet(viewsets.ModelViewSet):
    queryset = PatientWoman.objects.all()
    serializer_class = PatientWomanSerializer
    lookup_field = "patient_id"

class PatientMinorViewSet(viewsets.ModelViewSet):
    queryset = PatientMinor.objects.all()
    serializer_class = PatientMinorSerializer
    lookup_field = "patient_id"
class PatientInformationViewSet(viewsets.ModelViewSet):
    queryset = PatientInformation.objects.all()
    serializer_class = PatientInformationSerializer
    lookup_field = "patient_id"
class TreatmentRecordViewSet(viewsets.ModelViewSet):
    queryset = TreatmentRecord.objects.all()
    serializer_class = TreatmentRecordSerializer
    lookup_field = "patient_id"
class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer    
    lookup_field = "patient_id"
class ProcedureViewSet(viewsets.ModelViewSet):
    queryset = Procedure.objects.all()
    serializer_class = ProcedureSerializer    
    lookup_field = "id"
class DentitionViewSet(viewsets.ModelViewSet):
    queryset = Dentition.objects.all()
    serializer_class = DentitionSerializer 
    lookup_field = "patient_id"


