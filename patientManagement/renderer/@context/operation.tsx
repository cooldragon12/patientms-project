import { zodResolver,useForm, UseFormReturnType } from '@mantine/form'; 
import { createContext, useState, Dispatch,SetStateAction } from 'react'
import { PatientAddress, PatientBasicInformation, PatientDentition, PatientFullInformation, PatientInformation, PatientMedicalHistory, Patients } from '../schema/patient';
import { notifications } from '@mantine/notifications';
// import { DELETE, POST } from '../server/request';

interface OperationContextType {
    addPatient: (data:PatientFullInformation) => void,
    editPatient: (id:string) => void,
    deletePatient: (id:string) => void,
    basic_form: UseFormReturnType<PatientBasicInformation>,
    medicalhistory_form: UseFormReturnType<PatientMedicalHistory>,
    dentition_form: UseFormReturnType<PatientDentition>,

    anchor: {href:string, label:string}[],
    setAnchor: Dispatch<SetStateAction<{href:string, label:string}[]>>,
    // opened:boolean,
    // open:()=>void,
    // close:()=>void,
    
}

export const OperationContext = createContext<OperationContextType>({
    addPatient: () => void 0,
    editPatient: () => void 0,
    deletePatient: () => void 0,
    
    basic_form: {} as UseFormReturnType<PatientBasicInformation>,
    medicalhistory_form: {} as UseFormReturnType<PatientMedicalHistory>,
    dentition_form: {} as UseFormReturnType<PatientDentition>,

    anchor: [{href:"/", label:"Home"}],
    setAnchor: ()=> void 0,
    // opened:false,
    // open:()=>void 0,
    // close:()=>void 0,
})

export const OperationProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [anchor, setAnchor] = useState([{href:"/", label:"Home"}]);
    // const [opened, { open, close }] = useDisclosure(false);
    const basic_form = useForm<PatientBasicInformation>({
        // initialValues: PatientBasicInformation,
        validate: zodResolver(PatientBasicInformation),
        
    })

    const medicalhistory_form = useForm<PatientMedicalHistory>({
        // initialValues: tempData as PatientFullInformation,
        validate: zodResolver(PatientMedicalHistory),
        
    })
    const dentition_form = useForm<PatientDentition>({
        // initialValues: tempData as PatientDentition,
        validate: zodResolver(PatientDentition),
        
    })
    const addPatient = (data:PatientFullInformation) => {
        // const resp = POST('/api/patients/', data);
        // resp.then((res)=>{
        //     if (res.status===200)
        //     notifications.show({
        //         title: 'Patient Added',
        //         message: 'Patient has been added successfully',
        //         color: 'teal',
        //         icon: 'fas fa-check-circle',
        //     })
        //     else if (res.status === 401)
        //     notifications.show({
        //         title: 'Invalid Command',
        //         message:  res.statusText,
        //         color: 'red',
        //         icon: 'fas fa-exclamation-circle'
        //     })
        // })
    }
    const editPatient = (id:string) => {
        console.log(id);
    }
    const deletePatient = (id:string) => {
        // const resp = DELETE('/api/patients/', id);
        // resp.then((res)=>{
        //     if (res.status===200)
        //     notifications.show({
        //         title: 'Patient Deleted',
        //         message: 'Patient has been deleted successfully',
        //         color: 'teal',
        //         icon: 'fas fa-check-circle',
        //     })
        //     else if (res.status === 401)
        //     notifications.show({
        //         title: 'Invalid Command',
        //         message: res.statusText,
        //         color: 'red',
        //         icon: 'fas fa-exclamation-circle'
        //     })
        // })
    }
    // useEffect(() => {
    //     const storedValue = window.localStorage.getItem('patient-form');
    //     console.log(storedValue)
    //     if (storedValue) {
    //       try {
    //         form.setValues(JSON.parse(window.localStorage.getItem('patient-form')));
    //       } catch (e) {
    //         console.log('Failed to parse stored value');
    //       }
    //     }
    //   }, []);
    //   useEffect(() => {
    //     window.localStorage.setItem('patient-form', JSON.stringify(form.values));
    //     console.log('Parsed stored value')
      
    //   }, [form.values]);
    return (
        <OperationContext.Provider value={{
            addPatient, 
            editPatient, 
            deletePatient, 
            basic_form,
            medicalhistory_form,
            dentition_form,
            anchor,
            setAnchor
            // opened,
            // open,
            // close
            }}>
            {children}
        </OperationContext.Provider>
    )
}