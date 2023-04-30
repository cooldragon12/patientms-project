
import { z } from "zod";
export const TreatmentRecord = z.object({
  id: z.string().nonempty(),
  date: z.date(),
  tooth_no: z.number(),
  procedure: z.array(z.object({
    value: z.string().nullable(),
    label:  z.string().nullable(),
    cost: z.number().nullable(),
  })),
  amount_charged: z.number(),
  amount_paid: z.number().nullable(),
  balance: z.number().nullable(),
});

export type TreatmentRecord = z.infer<typeof TreatmentRecord>;
export type TreatmentRecords = [TreatmentRecord];

export interface TreatmentRecordUrl {
  record_url: string;
  record_api_url: string;
}

export type TreatmentRecordPrimary = Omit<
  TreatmentRecord,
  "amount_charged" | "amount_paid" | "balance" | "tooth_no"
>;
export interface TreatmentRecordOverview
  extends TreatmentRecordPrimary,
    TreatmentRecordUrl {}

export const Procedures = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  cost: z.number(),
});

export interface IClinicHistoryRecord {
  id: string;
  name: string;
  treatment_records: TreatmentRecords;
  date: Date;
}