from rest_framework import routers

from .views import PatientViewSet,PatientMinorViewSet,PatientWomanViewSet,PatientInformationViewSet,TreatmentRecordViewSet,AddressViewSet,ProcedureViewSet,DentitionViewSet

router = routers.SimpleRouter()
router.register(r'patient', PatientViewSet)
router.register(r'patient minor', PatientMinorViewSet)
router.register(r'patient woman', PatientWomanViewSet)
router.register(r'patient information', PatientInformationViewSet)
router.register(r'treatment', TreatmentRecordViewSet)
router.register(r'address', AddressViewSet)
router.register(r'procedure', ProcedureViewSet)
router.register(r'dentition', DentitionViewSet)
urlpatterns = router.urls