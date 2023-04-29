import {useEffect, useState} from 'react'
import { MultiSelect, List, ScrollArea, Button } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { RegularTable } from '../list';
import { Icon123, IconX } from '@tabler/icons-react';
import { UseFormReturnType } from '@mantine/form';

const CreateTreatment = ({form}:{form: UseFormReturnType<{procedures:any[]}>}) => {
    const [procedures, setProcedures] = useState([]); // This is the state that will be updated when the user selects a procedure
    const fetchProcedures = async () => {
        const response = await fetch('http://localhost:3000/api/procedures');
        const data = await response.json();
        setProcedures(data);
    }
    useEffect(() => {
      fetchProcedures();
      return () => {
        setProcedures([]);
      }
    }, [])
    const createNewProcedure = async () =>{
      const response = await fetch('http://localhost:3000/api/procedures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: procedures})
      });
      const data = await response.json();
      setProcedures(data);
    }
    useEffect(() => {
      createNewProcedure();
    }, [procedures])

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
                  const item = { value: query, label: query };
                  setProcedures((current) => [...current, item]);
                  return item; 
                }}
            />
         
            <List>
                {form.values.procedures.map((item, index) => (
                  <List.Item icon={<IconX onClick={()=>handleDelete(index)}/>} key={index}>{item}</List.Item>
                ))}
            </List>
           
            
        </>
    )
}

export default CreateTreatment;