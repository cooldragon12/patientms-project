import React,{ useState, createContext} from "react";
import { Patients } from "../schema/patient";

export interface IPatientContext {
    
}

export const PatientsContext = createContext<IPatientContext>({

})



export const PatientsProvider = ({ children }: { children: React.ReactNode }) => {
    const [patients, setPatients] = useState<Patients[]>([]);

    return (
        <PatientsContext.Provider value={{ patients, setPatients }}>
            {children}
        </PatientsContext.Provider>
    )
}