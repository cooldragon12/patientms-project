import zod from "zod";

// Schema of Patient
export const ToothCondition = zod.object({
  tooth_no: zod.string().nullable(),
  condition: zod.string().nullable(),
});
/**
 * `Patient` is the schema of the patient basic details
 */
export const Patient = zod.object({
  id: zod.string({ required_error: "Patient id is required" }).nullable(),
  first_name: zod
    .string({ required_error: "First name is required" })
    .nonempty("First name is required"),
  middle_name: zod.string().nullable().optional(),
  last_name: zod
    .string({ required_error: "Last name is required" })
    .nonempty("Last name is required"),

  nickname: zod.string().optional(),
  age: zod.number().nonnegative("Positive number is can be input").default(0),
  birthday: zod.date({
    description: "Birth date of the patient",
    required_error: "Birthday is required",
  }),
  civil_status: zod.string({ required_error: "Civil Status is required" }),
  religion: zod.string().nullable(),
  sex: zod.string({ required_error: "Please select your sex" }),
  mobile_number: zod
    .string()
    .min(10, "Invalid mobile number")
    .max(11, "Invalid mobile number"),
  email: zod.string().email({ message: "Invalid email address" }),
  occupation: zod.string().optional(),
  reason: zod.string().nullable().optional(),
});
/**
 * `PatientInformation` is the schema of the patient medical history
 */
export const PatientInformation = zod.object({
  patient_id: zod
    .string({ required_error: "Patient id is required" })
    .nullable(),
  goodhealth: zod.boolean(),
  current_treatment: zod.string().nullable(),
  isIllnessOrOperation: zod.string().nullable(),
  hospitalization: zod.string().nullable(),
  medication: zod.string().nullable(),
  tobacco: zod.boolean().default(false),
  isAlcoholOrDrugs: zod.boolean().nullable().default(false),
  allergies: zod.string().array().nullable().optional(),
  bloodtype: zod.string().nullable(),
  condition: zod.string().array().nullable().optional(),
});
/**
 * `PatientAddress` is the schema of the patient address
 */
export const PatientAddress = zod.object({
  patient_id: zod
    .string({ required_error: "Patient id is required" })
    .nullable(),
  building: zod.string().nullable(),
  street: zod.string(),
  village: zod.string().nullable().optional(),
  barangay: zod.string(),
  city: zod.string(),
  province: zod.string(),
});
/**
 * `PatientDentition` is the schema of the patient dentition, teeth conditiona etx
 */
export const PatientDentition = zod.object({
  patient_id: zod
    .string({ required_error: "Patient id is required" })
    .nullable(),
  periodontal_screening: zod.string().nullable(),
  occlusion: zod.string().nullable(),
  tmd: zod.string().nullable(),
  teeth: zod.array(ToothCondition).default([]),
});
/**
 * Additional information for the patient who is woman
 */
export const PatientWoman = zod.object({
  patient_id: zod
    .string({ required_error: "Patient id is required" })
    .nullable(),
  pregnancy: zod.boolean().default(false),
  nursing: zod.boolean().default(false),
  birth_control: zod.boolean().default(false),
});
/**
 * `PatientMinor` is the schema of the patient who is a minor
 */
export const PatientMinor = zod.object({
  patient_id: zod
    .string({ required_error: "Patient id is required" })
    .nullable(),
  guardian_name: zod.string().default("N/A"),
  guardian_occupation: zod.string().optional().default("N/A"),
});
/**
 * `PatientFullInformation` is the schema of the patient with all the information
 */
export const PatientFullInformation = Patient.merge(PatientAddress)
  .merge(PatientInformation)
  .merge(PatientDentition)
  .merge(PatientWoman)
  .merge(PatientMinor);
  

export const PatientBasicInformation = Patient.merge(PatientAddress).merge(PatientMinor);
export const PatientMedicalHistory = PatientInformation.merge(PatientWoman);


// Types & Interfaces of Patients
export type Patient = zod.infer<typeof Patient>;
export type Patients = [Patient];
export type PatientAddress = zod.infer<typeof PatientAddress>;
export type PatientInformation = zod.infer<typeof PatientInformation>;
export type PatientDentition = zod.infer<typeof PatientDentition>;
export type PatientWoman = zod.infer<typeof PatientWoman>;
export type PatientMinor = zod.infer<typeof PatientMinor>;
export type PatientPrimary = Omit<
Patient,
| "middle_name"
| "nickname"
| "age"
| "birthday"
| "civil_status"
| "mobile_number"
| "email"
| "occupation"
| "reason"
| "religion"
>;
export type PatientFullInformation = zod.infer<typeof PatientFullInformation>;
export type PatientBasicInformation = zod.infer<typeof PatientBasicInformation>;
export type PatientMedicalHistory = zod.infer<typeof PatientMedicalHistory>;
/**
 * `PatientOverview` is the interface of the table of patient as the overview.
 */
export interface PatientOverview extends PatientPrimary, PatientUrl {
  readonly last_visit: string;
}
/**
 * `PatientUrl` is the interface of the patient url
 */
export interface PatientUrl {
  readonly patient_url: string;
  readonly patient_api_url: string;
}
