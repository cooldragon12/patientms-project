import zod, { z } from 'zod'

// Schema of Patient
export const ToothCondition = zod.object({
    tooth_no: zod.string().nullable(),
    condition: zod.string().nullable(),
})

export const Patient = zod.object({
    id:zod.string({required_error:"Patient id is required"}).nullable(),
    first_name: zod.string({required_error:"First name is required"}).nonempty("First name is required"),
    middle_name:zod.string().nullable().optional(),
    last_name: zod.string({required_error:"Last name is required"}).nonempty("Last name is required"),

    nickname:zod.string().optional(),
    age:zod.number().nonnegative("Positive number is can be input"),
    birthday:zod.date({description:"Birth date of the patient", required_error:"Birthday is required"}),
    civil_status:zod.string().regex(RegExp("/((S|s)ingle)|((M|m)arried)|((W|w)iddow)/g"),"Choose 1 of the following"),
    religion:zod.string().nullable(),
    sex:zod.string().regex(RegExp("/((fe)?male)/g")),
    mobile_number: zod.number().min(10).max(11),
    email:zod.string().email(),
    occupation:zod.string().optional(),
    reason:zod.string().optional(),
    
})

export const PatientInformation = zod.object({
    patient_id:zod.string({required_error:"Patient id is required"}).nullable(),
    goodhealth:zod.boolean().default(true),
    current_treatment:zod.string().nullable(),
    isIllnessOrOperation:zod.string().nullable(),
    hospitalization:zod.string().nullable(),
    medication: zod.string().nullable(),
    tobacco:zod.boolean().default(false),
    isAlcoholOrDrugs:zod.boolean().nullable().default(false),
    allergies:zod.string().nullable(),
    bloodtype:zod.string().nullable(),
    condition:zod.string().nullable(),
})

export const PatientAddress = zod.object({
    patient_id:zod.string({required_error:"Patient id is required"}).nullable(),
    building:zod.string().nullable(),
    street:zod.string(),
    village:zod.string().nullable(),
    barangay:zod.string(),
    city:zod.string(),
    province:zod.string(),
})

export const PatientDentition = zod.object({
    patient_id:zod.string({required_error:"Patient id is required"}).nullable(),
    periodontal_screening:zod.string().nullable(),
    occlusion:zod.string().nullable(),
    tmd:zod.string().nullable(),
    teeth:zod.array(ToothCondition).default([]),
})

export const PatientWoman = zod.object({
    patient_id:zod.string({required_error:"Patient id is required"}).nullable(),
    pregnancy:zod.boolean().default(false),
    nursing:zod.boolean().default(false),
    birth_control:zod.boolean().default(false),
})
export const PatientMinor = zod.object({
    patient_id:zod.string({required_error:"Patient id is required"}).nullable(),
    guardian_name:zod.string(),
    occupation:zod.string().nullable(),
})

export const PatientFullInformation = Patient
    .extend({PatientAddress})
    .extend({PatientInformation})
    .extend({PatientDentition})
    .extend({PatientWoman})
    .extend({PatientMinor})
// Types & Interfaces of Patient
export type Patient = zod.infer<typeof Patient>;
export type Patients = [Patient];
export type PatientAddress = zod.infer<typeof PatientAddress>;
export type PatientInformation = zod.infer<typeof PatientInformation>;
export type PatientDentition = zod.infer<typeof PatientDentition>;
export type PatientFullInformation = zod.infer<typeof PatientFullInformation>;
export type PatientWoman = zod.infer<typeof PatientWoman>;
export type PatientMinor = zod.infer<typeof PatientMinor>;
export type PatientPrimary = Omit<Patient,
                'middle_name'| 
                'nickname' | 
                'age' | 
                'birthday' | 
                "civil_status"| 
                'mobile_number' |
                "email" |
                "occupation" |
                "reason" | 
                "religieon"
                >;

export interface PatientOverview extends PatientPrimary, PatientUrl{
    readonly last_visit: Date;
}

export interface PatientUrl {
    readonly patient_url: string;
    readonly patient_api_url: string;
} 


