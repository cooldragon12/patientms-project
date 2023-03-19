from django.db import models

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
    @property
    def name(self):
        return self.last_name + ', ' + self.first_name
    @property
    def last_visit(self):
        return TreatmentRecord.objects.latest('date').date
class PatientWoman(models.Model):
    patientId=models.OneToOneField(Patient,on_delete=models.CASCADE, primary_key=True, related_name="patient_woman_info")
    pregnancy=models.BooleanField(default=False)
    nursing=models.BooleanField(default=False)
    birth_control=models.BooleanField(default=False)

class PatientMinor(models.Model):
    patientId=models.OneToOneField(Patient,on_delete=models.CASCADE, primary_key=True, related_name="patient_minor_info")
    guardian_name=models.CharField(max_length=150)
    occupation_guardian=models.CharField(max_length=50, null=True, blank=True)

class PatientInformation(models.Model):
    
    class Choice1(models.TextChoices): #isIllness or Operation choices
        ILLNESS="illness","Illness"
        OPERATION="operation","Operation"
        NA="n/a","N/A"
    
    class Choice2(models.TextChoices): #isAlchohol or drugs choices
        ALCHOHOL="alchohol","Alchohol"
        DRUGS="drugs","Drugs"
        NA="n/a","N/A"

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

    patientId=models.OneToOneField(Patient,on_delete=models.CASCADE, primary_key=True, related_name="patient_full_info")
    goodhealth=models.BooleanField(default=False)
    current_treatment=models.CharField(max_length=255,null=True, blank=True)
    isIllnessOrOperation=models.CharField(max_length=255,default=Choice1.NA, choices=Choice1.choices) 
    hospitalization=models.BooleanField(default=False)
    medication=models.CharField(max_length=255,null=True, blank=True)
    tobacco=models.BooleanField(default=False)
    isAlchoholOrDrugs=models.CharField(max_length=255,default=Choice2.NA,choices=Choice2.choices) 
    allergies=models.CharField(max_length=255,null=True, blank=True )
    bloodtype=models.CharField(max_length=50,default=BloodtypeChoices.UNKNOWN,choices=BloodtypeChoices.choices)
    condition=models.CharField(max_length=100, null=True, blank=True)

class TreatmentRecord (models.Model):
    patientId=models.ForeignKey(Patient,on_delete=models.CASCADE, related_name="patient_treatments")
    date=models.DateField()
    tooth_no=models.PositiveBigIntegerField()
    procedure=models.CharField(max_length=255)
    amount_charged=models.DecimalField(decimal_places=2,max_digits=10,)
    amount_paid=models.DecimalField(decimal_places=2,max_digits=10,null=True, blank=True)
    balance=models.DecimalField(decimal_places=2,max_digits=10, null=True, blank=True)

class Address (models.Model):
    patientId=models.OneToOneField(Patient,on_delete=models.CASCADE, primary_key=True, related_name="address")
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

class Dentition(models.Model):
    """Dentition Status and Treatment Needs Record, Part of Dental Record"""
    class OcclusionChoices(models.TextChoices):
        MOLAR="class(molar)","CLASS(MOLAR)"
        OVERJET="overjet","OVERJET"
        OVERBITE="overbite","OVERBITE"
        MDC="midline deviation crossbite","MIDLINE DEVIATION CROSSBITE"

    # Why there is no choices for screening and appliances?
    patientId=models.OneToOneField(Patient,on_delete=models.CASCADE, primary_key=True, related_name="patient_dentition",choices=OcclusionChoices.choices)
    periodontal_screening=models.CharField(max_length=25)
    occlusion=models.CharField(max_length=25)
    appliances=models.CharField(max_length=25)
    tmd=models.CharField(max_length=25)

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
    patientId=models.ForeignKey(Dentition,on_delete=models.CASCADE, related_name="patient_tooth_status")
    tooth_no=models.PositiveBigIntegerField()
    conditions=models.CharField(max_length=50, null=True, blank=True, choices=Conditions.choices, default="")