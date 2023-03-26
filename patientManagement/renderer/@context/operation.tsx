import { useDisclosure } from '@mantine/hooks';
import { createContext, useState, Dispatch,SetStateAction } from 'react'
import { PatientAddress, PatientDentition, PatientFullInformation, PatientInformation, Patients } from '../schema/patient';

interface OperationContextType {
    addPatient: (data:Patients) => void,
    editPatient: (id:string) => void,
    deletePatient: (id:string) => void,
    setTempData: Dispatch<SetStateAction<Patients>>,
    tempData: Patients | PatientFullInformation |PatientAddress | PatientDentition | PatientInformation,
    
    // opened:boolean,
    // open:()=>void,
    // close:()=>void,
    
}

export const OperationContext = createContext<OperationContextType>({
    addPatient: () => void 0,
    editPatient: () => void 0,
    deletePatient: () => void 0,
    setTempData: ()=> void 0,
    tempData: {} as Patients,
    // opened:false,
    // open:()=>void 0,
    // close:()=>void 0,
})

export const OperationProvider = ({ children }: { children: React.ReactNode }) => {
    const [tempData, setTempData] = useState<Patients>({} as Patients);
    
    // const [opened, { open, close }] = useDisclosure(false);

    const addPatient = (data:{}) => {
        console.log(data);
    }
    const editPatient = (id:string) => {
        console.log(id);
    }
    const deletePatient = (id:string) => {
        console.log(id);
    }
    return (
        <OperationContext.Provider value={{
            addPatient, 
            editPatient, 
            deletePatient, 
            tempData, 
            setTempData,
            // opened,
            // open,
            // close
            }}>
            {children}
        </OperationContext.Provider>
    )
}