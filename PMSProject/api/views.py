from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from .serializers import *
from .models import *

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerialzer
    lookup_field = "pk"
    @action(detail=False, methods=['get'], url_path='overview')
    def list_overview(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = PatientOverviewSerializer(queryset, many=True)
        return Response(serializer.data)

# 
class PatientWomanViewSet(viewsets.ModelViewSet):
    queryset = PatientWoman.objects.all()
    serializer_class = PatientWomanSerializer
    lookup_field = "pk"

class PatientMinorViewSet(viewsets.ModelViewSet):
    queryset = PatientMinor.objects.all()
    serializer_class = PatientMinorSerializer
    lookup_field = "pk"

class MedicalHistoryViewSet(viewsets.ModelViewSet):
    queryset = MedicalHistory.objects.all()
    serializer_class = MedicalHistorySerializer
    lookup_field = "pk"

class TreatmentRecordViewSet(viewsets.ModelViewSet):
    queryset = TreatmentRecord.objects.all()
    serializer_class = TreatmentRecordSerializer
    lookup_field = "pk"
class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer    
    lookup_field = "pk"
class ProcedureViewSet(viewsets.ModelViewSet):
    queryset = Procedure.objects.all()
    serializer_class = ProcedureSerializer    
    lookup_field = "id"
class DentitionViewSet(viewsets.ModelViewSet):
    queryset = Dentition.objects.all()
    serializer_class = DentitionSerializer 
    lookup_field = "pk"
# Custom Views
class HistoryTreatmentRecordViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = TreatmentRecord.objects.all()
    serializer_class = HistoryOverviewSerializer
    

