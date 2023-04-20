import { zodResolver, useForm, UseFormReturnType } from "@mantine/form";
import { useLocalStorage } from '@mantine/hooks';
import {useEffect} from 'react';
import { createContext, useState, Dispatch, SetStateAction } from "react";
import {
 PatientAddress,
 PatientBasicInformation,
 PatientDentition,
 PatientFullInformation,
 PatientInformation,
 PatientMedicalHistory,
 Patients,
} from "../schema/patient";
import { notifications } from "@mantine/notifications";
import { teethList } from "../components/TeethList";
// import { DELETE, POST } from '../server/request';

interface OperationContextType {
 addPatient: (data: PatientFullInformation) => void;
 editPatient: (id: string) => void;
 deletePatient: (id: string) => void;
 basic_form: UseFormReturnType<PatientBasicInformation>;
 medicalhistory_form: UseFormReturnType<PatientMedicalHistory | any>;
 dentition_form: UseFormReturnType<PatientDentition | any>;

 anchor: { href: string; label: string }[];
 setAnchor: Dispatch<SetStateAction<{ href: string; label: string }[]>>;
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

 anchor: [{ href: "/", label: "Home" }],
 setAnchor: () => void 0,
 // opened:false,
 // open:()=>void 0,
 // close:()=>void 0,
});

export const OperationProvider = ({
 children,
}: {
 children: React.ReactNode;
}) => {

 const tempData1 = {};
 const tempData2 = {};
  const tempData3 = {};
  const  [basic_forms, setBasicForms] = useLocalStorage<PatientBasicInformation>({key: 'basic_forms', defaultValue: tempData1});
  const  [medical_forms, setMedicalForms] = useLocalStorage({key: 'medical_forms', defaultValue: {...(tempData2 as PatientMedicalHistory),
  conditions: [],
  allergies:[],
  current_treatment_details: "",
  illnessOrOperation_details: "",
  hospitalization_details: "",
  medication_details: "",
  hasCondition: "",
  other_condition: "",
  other_allergy: "",}});
  const  [dentition_forms, setDentitionForms] = useLocalStorage({key: 'dentition_forms', defaultValue: {...tempData3 as PatientDentition, teeth: Object.assign({}, ...teethList.map((item) => ({[item]:{tooth_no: item, condition: ""}})))}});

 const [anchor, setAnchor] = useState([{ href: "/", label: "Home" }]);
 // const [opened, { open, close }] = useDisclosure(false);
 const basic_form = useForm({
  initialValues: basic_forms,
  validate: {
    ...zodResolver(PatientBasicInformation),
    guardian_name: (value, values) => {
      if (values.age < 18 && value === "") {
        return "Please provide name of guardian";
      }
    },
    guardian_occupation: (value, values) => {
        if (values.age < 18 && value === "") {
            return "Please provide occupation of guardian";
        }
    }
},
  validateInputOnBlur: true,
  validateInputOnChange: true,
  clearInputErrorOnChange: true,
 });
 const medicalhistory_form = useForm({
  initialValues: medical_forms,
  validateInputOnBlur: true,
  validateInputOnChange: true,
  clearInputErrorOnChange: true,
  validate: {
   ...zodResolver(PatientMedicalHistory),
   current_treatment: (value, values) => {
    if (value === "yes" && values.current_treatment_details === "")
     return "Please provide details of current treatment";
   },
   isIllnessOrOperation: (value, values) => {
    if (value === "yes" && values.illnessOrOperation_details === "")
     return "Please provide details of illness or operation";
   },
   hospitalization: (value, values) => {
    if (value === "yes" && values.hospitalization_details === "")
     return "Please provide details of hospitalization";
   },
   medication: (value, values) => {
    if (value === "yes" && values.medication_details === "")
     return "Please provide details of medication";
   },
   conditions: (value, values) => {
    if (values.hasCondition === "yes" && value.length === 0)
     return "Please select at least one condition";
    if (value.includes("Other") && values.other_condition === "")
     return "Please provide details of other condition";
   },
   allergies:(value, values) => {
    if (value.includes("Other") && values.other_allergy === "")
     return "Please provide details of other allergy";
   }
  },
  transformValues: (values) => {
    return {
        ...values,
        allergies: [...values.allergies.filter((item) => item !== "Other"), values.other_allergy],
        conditions: [...values.allergies.filter((item) => item !== "Other"), values.other_condition],
    }
  }
 });
 const dentition_form = useForm({
  initialValues: dentition_forms,
  validate: {...zodResolver(PatientDentition)},
  validateInputOnBlur: true,
  validateInputOnChange: true,
  clearInputErrorOnChange: true,
 });
 
 const addPatient = (data: PatientFullInformation) => {
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
 };
 const editPatient = (id: string) => {
  console.log(id);
 };
 const deletePatient = (id: string) => {
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
 };
 useEffect(() => {
  return ()=>{
    setBasicForms(basic_form.values);
    setMedicalForms(medicalhistory_form.values);
    setDentitionForms(dentition_form.values);
  }
 },[])
 return (
  <OperationContext.Provider
   value={{
    addPatient,
    editPatient,
    deletePatient,
    basic_form,
    medicalhistory_form,
    dentition_form,
    anchor,
    setAnchor,
    // opened,
    // open,
    // close
   }}
  >
   {children}
  </OperationContext.Provider>
 );
};
