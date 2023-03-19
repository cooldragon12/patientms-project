import { TRPCError } from '@trpc/server';
import {z} from 'zod'
import {publicProcedure, router} from '../../trpc';
import { GET, PATCH, POST } from '../../HTTP';
import { Procedure } from '../../../schema/procedure'; 
import { API_URL } from '../../root';


const procedureRouter = router({
    addProcedure: publicProcedure
        .input(Procedure)
        .mutation(async ({input})=>{
            const resp = await POST(API_URL+`/procedures/`, input)
            return resp.json()
        }),
    
    viewProcedures: publicProcedure
        .output(Procedure)
        .query(async ()=>{
            const resp = await GET(API_URL+"/procedures/")
            if (resp.status === 404)
                throw new TRPCError({code:"NOT_FOUND", message:"Procedure is not found or exist"})
            return resp.json()
        }),
    updateProcedure: publicProcedure
        .input(Procedure)
        .mutation(async ({input})=>{
            const resp = await PATCH(API_URL+`/procedures/${input.procedureId}/`, input)
            return resp.json()
        }),
})

export default procedureRouter