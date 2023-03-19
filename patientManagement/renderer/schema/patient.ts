import zod, { z } from 'zod'

export const Patient = zod.object({
    patient_id:zod.string({required_error:"Patient id is required"}).nullable(),
    first_name: zod.string({required_error:"First name is required"}).nonempty("First name is required"),
    last_name: zod.string({required_error:"Last name is required"}).nonempty("Last name is required"),
    middle_name:zod.string().nullable().optional(),

    nickname:zod.string().optional(),
    birthday:zod.date({description:"Birth date of the patient", required_error:"Birthday is required"}),
    age:zod.number().nonnegative("Positive number is can be input"),
    civil_status:zod.string().regex(RegExp("/((S|s)ingle)|((M|m)arried)|((W|w)iddow)/g"),"Choose 1 of the following"),
    religion:zod.string().nullable(),
    insurance_detail:zod.string().nullable(),
    sex:zod.string().regex(RegExp("/((fe)?male)/g")),
    phone_number: zod.number().min(10).max(11),
    email:zod.string().email(),
    occupation:zod.string().optional(),
    reason:zod.string().optional(),
})

export type Patient = zod.infer<typeof Patient>;
export type Patients = [Patient];

export interface PatientOverview {
    patient_id: string;
    first_name: string;
    last_name: string;
    sex: string;
    last_visit: string;
    link: string;
    contact: string;
}

