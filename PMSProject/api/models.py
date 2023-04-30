from django.db import models
from multiselectfield import MultiSelectField
# Create your models here.

class Patient(models.Model):
    class SexChoices(models.TextChoices):
        MALE="male","Male"
        FEMALE="female","Female"
    class CivilStatus(models.TextChoices):
        SINGLE="single","Single"
        MARRIED="married","Married"
        DIVORCED = "divorced", "Divorced"
        WIDOW="widow","Widow"
        WIDOWER= "widower", "Widower"

    first_name=models.CharField(max_length=50)
    middle_name=models.CharField(max_length=50, null=True, blank=True)
    last_name=models.CharField(max_length=50)
    age=models.PositiveIntegerField()
    birthday=models.DateField()
    civil_status=models.CharField(max_length=15,choices=CivilStatus.choices)
    religion=models.CharField(max_length=30)
    sex=models.CharField(max_length=10,choices=SexChoices.choices)
    nickname=models.CharField(max_length=30, null=True, blank=True)
    mobile_number=models.CharField(max_length=20)
    email=models.EmailField(null=True, blank=True)
    occupation=models.CharField(max_length=50)
    reason=models.TextField()

    def __str__(self) -> str:
        return self.first_name + ' ' + self.last_name
    @property
    def name(self):
        return self.last_name + ', ' + self.first_name
    @property
    def last_visit(self):
        return TreatmentRecord.objects.latest('date').date
    @property
    def patient_url(self):
        return "/patients/" + str(self.pk) + "/"

class PatientMinor(models.Model):
    patient_id=models.OneToOneField(Patient,on_delete=models.CASCADE, primary_key=True, related_name="minor_info")
    guardian_name=models.CharField(max_length=150)
    occupation_guardian=models.CharField(max_length=50, null=True, blank=True)

class MedicalHistory(models.Model):
    

    
    class BloodtypeChoices(models.TextChoices):
        A1="a+","A+"
        A2="a-","A-"
        B1="b+","B+"
        B2="b-","B-"
        O1="o+","O+"
        O2="o-","O-"
        AB1="ab+","AB+"
        AB2="ab-","AB-"
        UNKNOWN="unknown","Unknown"

    patient_id=models.OneToOneField(Patient,on_delete=models.CASCADE, primary_key=True, related_name="medical_history")
    goodhealth=models.BooleanField(default=False)
    current_treatment=models.CharField(max_length=255,null=True, blank=True)
    isIllnessOrOperation=models.CharField(max_length=255, null=True, blank=True) 
    hospitalization=models.BooleanField(default=False)
    medication=models.CharField(max_length=255,null=True, blank=True)
    tobacco=models.BooleanField(default=False)
    isAlcoholOrDrugs=models.BooleanField(default=False, null=True) 
    allergies=models.CharField(max_length=255,null=True, blank=True )
    bloodtype=models.CharField(max_length=50,default=BloodtypeChoices.UNKNOWN,choices=BloodtypeChoices.choices)
    condition=models.CharField(max_length=100, null=True, blank=True)

class PatientWoman(models.Model):
    patient_id=models.OneToOneField(MedicalHistory,on_delete=models.CASCADE, primary_key=True, related_name="woman_info")
    pregnancy=models.BooleanField(default=False)
    nursing=models.BooleanField(default=False)
    birth_control=models.BooleanField(default=False)
    # def 
class TreatmentRecord (models.Model):
    patient_id=models.ForeignKey(Patient,on_delete=models.CASCADE, related_name="patient_treatments")
    date=models.DateField(auto_now=True)
    tooth_no=models.PositiveBigIntegerField()
    procedure=models.ManyToManyField("Procedure", related_name="treatment_procedures")
    amount_charged=models.DecimalField(decimal_places=2,max_digits=10)
    amount_paid=models.DecimalField(decimal_places=2,max_digits=10,null=True, blank=True)
    balance=models.DecimalField(decimal_places=2,max_digits=10, null=True, blank=True)
    def record_url(self):
        return "/treatment/"+str(self.patient_id)
class Address (models.Model):
    patient_id=models.OneToOneField(Patient,on_delete=models.CASCADE, primary_key=True, related_name="address")
    building_number=models.CharField(max_length=20, default="", null=True, blank=True)
    street= models.CharField(max_length=50, default="",null=True, blank=True)
    village= models.CharField(max_length=50, default="", null=True, blank=True)
    barangay= models.CharField(max_length=50)
    city=models.CharField(max_length=50)
    province= models.CharField(max_length=50)
    @property
    def full_address(self):
        return f"{self.building_number} {self.street},{self.village},{self.barangay},{self.city},{self.province}"
    def __str__(self) -> str:
        return f"{self.building_number} {self.street},{self.village},{self.barangay},{self.city},{self.province}"
class Procedure(models.Model):
    name= models.CharField(max_length=200)
    cost= models.DecimalField(decimal_places=2,max_digits=10, null=True, blank=True)
    def __str__(self) -> str:
        return self.name
class Dentition(models.Model):
    """Dentition Status and Treatment Needs Record, Part of Dental Record"""
    class PeriodontalChoices(models.TextChoices):
        GINGIVITIS = "gingivitis", "GINGIVITIS"
        EARLYPERIO = "early periodontitis", "EARLY PERIODONTITIS"
        MODPERIO = "moderate periodontitis", "MODERATE PERIODONTITIS"
        ADVPERIO = "advanced periodontitis", "ADVANCED PERIODONTITIS"
    class OcclusionChoices(models.TextChoices):
        MOLAR="class(molar)","CLASS(MOLAR)"
        OVERJET="overjet","OVERJET"
        OVERBITE="overbite","OVERBITE"
        MDC="midline deviation crossbite","MIDLINE DEVIATION CROSSBITE"
    class AppliancesChoices(models.TextChoices):
        ORTHODONTIC = "orthodontic", "ORTHODONTIC"
        STAYPLATE = "stayplate", "STAYPLATE"
        OTHERS = "", ""
    class TMDChoices(models.TextChoices):
        CLENCHING = "clenching", "CLENCHING"
        CLICKING = "clicking", "CLICKING"
        TRISMUS = "trismus", "TRISMUS"
        MUSCLESPASM = "muscle spasm ", "MUSCLE SPASM"
    # Why there is no choices for screening and appliances?
    patient_id=models.OneToOneField(Patient,on_delete=models.CASCADE, primary_key=True, related_name="patient_dentition")
    periodontal_screening=MultiSelectField(max_length=100,choices=PeriodontalChoices.choices, null=True, blank=True)
    occlusion=MultiSelectField(max_length=100,choices=OcclusionChoices.choices,null=True, blank=True)
    appliances=MultiSelectField(max_length=100, choices=AppliancesChoices.choices,null=True, blank=True)
    tmd=MultiSelectField( max_length=100,choices=TMDChoices.choices,null=True, blank=True)

class ToothStatus(models.Model):
    """Tooth Status or Condition for Dentition Status and Treatment Needs Record"""
    class Conditions(models.TextChoices):
        D = "D", "Decayed"
        M = "M", "Missing"
        F = "F", "Filled"
        I = "I", "Caries Indicated for Extraction"
        RF = "RF", "Root Fragment"
        MO = "MO", "Missing due to Other Cause"
        Im = "Im", "Impacted Tooth"
        # Restorations & Prosthetics
        J = "J", "Jacket Crown"
        A = "A", "Amalgam Filling"
        AB = "AB", "Abutment"
        P = "P", "Pontic"
        In = "In", "Inlay"
        Fx = "Fx", "Fixed Cure Composite"
        S = "S", "Sealants"
        Rm = "Rm", "Removable Denture"
        # Surgery
        X = "X", "Extraction due to Caries"
        XO = "XO", "Extraction due to Other Cause"
        # Others
        Cm = "Cm", "Cingenitally Missing"
        Sp = "Sp", "Supernumerary"
    patient_id=models.ForeignKey(Dentition,on_delete=models.CASCADE, related_name="teeth_status")
    tooth_no=models.PositiveBigIntegerField()
    conditions=models.CharField(max_length=50, null=True, blank=True, choices=Conditions.choices, default="")