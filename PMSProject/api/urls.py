from rest_framework import routers

from .views import *

router = routers.SimpleRouter(trailing_slash=False)
router.register(r'patients', PatientViewSet)
# patient/
router.register(r'patient-minor', PatientMinorViewSet)
router.register(r'patient-woman', PatientWomanViewSet)
router.register(r'patient-info', PatientInformationViewSet)
router.register(r'treatment', TreatmentRecordViewSet)
router.register(r'address', AddressViewSet)
router.register(r'procedure', ProcedureViewSet)
router.register(r'dentition', DentitionViewSet)
router.register(r'patients-overview', PatientListViewSet)
urlpatterns = router.urls