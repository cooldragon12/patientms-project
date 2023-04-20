import {useEffect, useState} from 'react'
import { MultiSelect } from '@mantine/core';
import { useListState } from '@mantine/hooks';

const CreateTreatment = (form) => {
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


    return (
        <>
            <MultiSelect
                label="Procedures"
                placeholder="Select procedures or Create new"
                data={procedures}
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                  const item = { value: query, label: query };
                  setProcedures((current) => [...current, item]);
                  return item;
                }}

            />
            
        </>
    )
}

export default CreateTreatment;