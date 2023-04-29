import {useEffect, useState} from 'react'
import { MultiSelect, List, ScrollArea, Button } from '@mantine/core';
import { RegularTable } from '../list';
import { IconX } from '@tabler/icons-react';
import { UseFormReturnType } from '@mantine/form';
import { API_URL } from '../../server';

const CreateTreatment = ({form}:{form: UseFormReturnType<{procedures:any[]}>}) => {
    const [procedures, setProcedures] = useState([]); // This is the state that will be updated when the user selects a procedure
    const fetchProcedures = async () => {
        const response = await fetch(`${API_URL}/procedure`);
        const data = await response.json();
        setProcedures(data);
    }
    useEffect(() => {
      fetchProcedures();
      return () => {
        setProcedures([]);
      }
    }, [])
    const createNewProcedure = async (procedure_name:string) =>{
      const response = await fetch(`${API_URL}/procedure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:procedure_name})
      });
      const data = await response.json();
      
      setProcedures(data);
      console.log(procedures)
    }
   

    const handleDelete = (index) => {
      form.setValues({procedures: form.values.procedures.filter((item, i) => i !== index)})
    }
    return (
        <>
            <MultiSelect
                label="Procedures"
                placeholder="Select procedures or Create new"
                data={procedures}
                value={form.values.procedures}
                onChange={(e)=>{form.setValues({procedures: [...form.values.procedures,e]})}}
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                  const item = {label: query, value: query, cost:null };
                  setProcedures((current) => [...current, item]);
                  createNewProcedure(query)
                  .catch((e)=>console.log(e));
                  // fetchProcedures();
                  return item; 
                }}
            />
         
            <List>
                {form.values.procedures.map((item, index) => (
                  <List.Item p={5} icon={<IconX onClick={()=>handleDelete(index)}/>} key={index}>{item.label}</List.Item>
                ))}
            </List>
           
            
        </>
    )
}

export default CreateTreatment;