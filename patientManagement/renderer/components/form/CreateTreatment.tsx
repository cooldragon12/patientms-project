import {forwardRef, useEffect, useState} from 'react'
import { MultiSelect, List, ScrollArea, Button, Group, Text, Select, NativeSelect, TextInput } from '@mantine/core';
import { RegularTable } from '../list';
import { IconX } from '@tabler/icons-react';
import { UseFormReturnType } from '@mantine/form';
import { API_URL } from '../../server';
import { teethList} from '../TeethList';
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  value: string;
  cost: string;
}
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, cost, value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{label}</Text>
          <Text size="xs" color="dimmed">
            {cost}
          </Text>
        </div>
      </Group>
    </div>
  )
);
const CreateTreatment = ({form}:{form: UseFormReturnType<{procedure:any[], tooth_no:number, amount_charged:number}>}) => {
    const [procedures, setProcedures] = useState([]); // This is the state that will be updated when the user create a procedure
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
      form.setValues({procedure: form.values.procedure.filter((item, i) => i !== index)})
    }
    return (
        <>
            {/* <Text>Select the tooth where the procedure is done</Text> */}
            <NativeSelect 
              label="Tooth number"
              placeholder="Select Tooth Number"
              description="Select the tooth number where the procedure is done"
              withAsterisk
              data={teethList}
              {...form.getInputProps('tooth_no')}
            />
            <TextInput 
              label="Amount Charged"
              placeholder="Enter the amount charged"
              description="Enter the amount charged for the procedures"
              withAsterisk
              type="number"
              {...form.getInputProps('amount_charged')}
            />
            <MultiSelect
                label="Procedures"
                description="Select the procedures done"
                placeholder="Select procedures or Create new"
                data={procedures}
                value={form.values.procedure}
                onChange={(e)=>{form.setValues({procedure: [...form.values.procedure,e]})}}
                searchable
                creatable
                variant='unstyled'
                sx={(theme)=>({
                  borderBottom: '1px solid grey',
                  paddingTop: '1rem',
                  paddingBottom: '0.5rem',

                })}
                withAsterisk
                size='md'
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                  const item = {value: query, label: query, cost:null };
                  createNewProcedure(query)
                  .catch((e)=>console.log(e)).finally(()=>{fetchProcedures()});
                  return item; 
                }}
                itemComponent={SelectItem}
                {...form.getInputProps('procedure')}
            />
         
            <List>
                {form.values.procedure.map((item, index) => (
                  <List.Item pb={10} icon={<IconX size={15} onClick={()=>{handleDelete(index); console.log(item)}}/>} key={index+"item-multiselect"}>{item}</List.Item>
                ))}
            </List>
           
            
        </>
    )
}

export default CreateTreatment;