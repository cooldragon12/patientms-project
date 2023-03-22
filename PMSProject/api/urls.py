from rest_framework import routers
from django.urls import path, include
from .views import *

router = routers.SimpleRouter(trailing_slash=False)
router.register(r'patients', PatientViewSet, basename="patients")
# patient/
router.register(r'patient-minor', PatientMinorViewSet)
router.register(r'patient-woman', PatientWomanViewSet)
router.register(r'patient-info', PatientInformationViewSet)
router.register(r'treatment', TreatmentRecordViewSet)
router.register(r'address', AddressViewSet)
router.register(r'procedure', ProcedureViewSet)
router.register(r'dentition', DentitionViewSet)
router.register(r'patients-overview', PatientListViewSet)
router.register(r'history-overview', HistoryTreatmentRecordViewSet)

urlpatterns = router.urls