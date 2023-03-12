import { z } from "zod";


export const Procedure = z.object({
    procedureId: z.string().nonempty(),
    name: z.string().nonempty(),
    cost: z.string().nonempty()

})

export type Procedure = z.infer<typeof Procedure>;
export type Procedures = [Procedure];

