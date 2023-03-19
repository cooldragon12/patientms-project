import { TRPCError } from '@trpc/server';
import {z} from 'zod'
import {publicProcedure, router} from '../../trpc';
import { GET, PATCH, POST } from '../../HTTP';
import { Procedure } from '../../../schema/procedure'; 
import { API_URL } from '../../root';
import { TreatmentRecord } from '../../../schema/treatment';


const treatmentRouter = router({
    addTreatmentRecord: publicProcedure
    .input(TreatmentRecord)
    .mutation(async ({input})=>{
        const resp = await POST(API_URL+`/patients/${input.patientId}/treatments/`, input)
        return resp.json()
    }),

    viewTreatmentRecord: publicProcedure
    .input(
        z.object({
        patientId: z.string()
    })
    .optional())
    .mutation(async ({input})=>{
        const resp = await POST(API_URL+`/patients/${input.patientId}/treatments/`, input)
        if (resp.status === 404)
            throw new TRPCError({code:"NOT_FOUND", message:"Treatment record is not found or exist"})
        return resp.json()
    }),
    updateTreatmentRecord: publicProcedure
        .input(TreatmentRecord)
        .mutation(async ({input})=>{
            const resp = await PATCH(API_URL+`/procedures/${input.treatmentId}/`, input)
            return resp.json()
        }),
})

export default treatmentRouter;