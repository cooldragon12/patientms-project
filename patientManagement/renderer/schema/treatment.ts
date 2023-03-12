import {Patient} from './patient';
import {z} from 'zod'
export const TreatmentRecord = z.object({
    patientId:z.string().nonempty(),
    treatmentId:z.string().nonempty()
})

export type TreatmentRecord = z.infer<typeof TreatmentRecord>;
export type TreatmentRecords = [TreatmentRecord];
