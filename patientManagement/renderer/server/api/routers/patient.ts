import {publicProcedure, router} from '../../trpc';
import { TRPCError } from '@trpc/server';
import {z} from 'zod'
import { API_URL } from '../../root';
import { Patient } from '../../../schema/patient';
import { GET, PATCH, POST } from './HTTP';


const patientRouter = router({
    // Get specific patient
    getPatient: publicProcedure
    .input(
            z.object({
                patientId: z.string()
            })
            .optional()
        )
    .query(async ({input})=>{
        
        const resp  =await GET(API_URL+`/patients/${input.patientId}`, input)
        
        if (resp.status === 404)
            throw new TRPCError({code:"NOT_FOUND", message:"Patient is not found or exist"})
        

        return resp.json()
         
        
        

    }),
    // add a patient
    addPatient: publicProcedure
    .input(Patient)
    .mutation(async ({input})=>{
        const resp = await POST(API_URL+"/patients/", input)

        if (resp.status == 400)
            throw new TRPCError({code:"BAD_REQUEST", message:"Wrong or missing input"});
        if (resp.status == 401)
            throw new TRPCError({code:"FORBIDDEN", message:"You do not have a permission"});
        
        return resp.json()
        
    }),

    // get list of patients
    viewPatients: publicProcedure
   
    .query(async ()=>{
        const resp = await GET(API_URL+"/patients/")
        if (resp.status === 404)
            throw new TRPCError({code:"NOT_FOUND", message:"Patient is not found or exist"})
        
            return resp.json()
    }),
    
    // update patient
    updatePatient:publicProcedure
    .input(Patient)
    .mutation(async ({input})=>{
        const resp = await PATCH(API_URL+`/patients/${input.patient_id}/`, input);
        
        return resp.json();
    }),

})

export default patientRouter;