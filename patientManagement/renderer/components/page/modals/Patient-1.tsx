import {Group,Divider, NumberInput, Radio, Collapse,TextInput, Select, Title, Button, Text} from '@mantine/core';
import {DateInput} from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { ContextModalProps, useModals, openContextModal} from '@mantine/modals';
import { useState, useContext } from 'react';

import { OperationContext } from '../../../@context/operation';
import { Patient, PatientFullInformation } from '../../../schema/patient';
const AddPatientModal = (
    { context, id, innerProps }: ContextModalProps<{ 
      modalDescription: string 
      
    }>
    
    ) => {
    // const [opened, setOpened] = useState(false);
    const {tempData, setTempData} = useContext(OperationContext);
    const  modals = useModals();
    const form = useForm<PatientFullInformation>({
      initialValues: tempData as PatientFullInformation,
      validate: zodResolver(PatientFullInformation),
      
  })
    return(
        <>
        <form>

        <Group sx={(theme)=>({
          flexDirection: 'column',
          paddingLeft: theme.spacing.xl,
          paddingRight: theme.spacing.xl,
          
          gap: theme.spacing.md,
          
          alignItems: 'flex-start',
        })}>
            <Text size="sm">{innerProps.modalDescription}</Text>
              <Group spacing={30}>
                  <TextInput withAsterisk label="Last Name" placeholder="Last Name" {...form.getInputProps('last_name')} />
                  <TextInput withAsterisk label="First Name" placeholder="First Name"  {...form.getInputProps('first_name')} />
                  <TextInput label="Middle Name" placeholder="Middle Name" {...form.getInputProps('middle_name')} />
              </Group>
              <Group align={"baseline"} spacing={100} >
                <div>
                  <DateInput withAsterisk label="Birth Date" placeholder='Birth Day'  defaultValue={new Date()}  {...form.getInputProps('birthday')}/>
                  <TextInput label="Occupation" placeholder="Occupation (Optional)" {...form.getInputProps('occupation')} />
                  <TextInput label="Nickname" placeholder="Nickname (Optional)" {...form.getInputProps('nickname')} />
                  <TextInput label="What is your reason for dental consultation?" placeholder="(Optional)" {...form.getInputProps('reason')} />
                </div>
                <div>
                  <Select withAsterisk label="Sex" placeholder='Pick one' data={[
                    {value:"male", label:"Male"},
                    {value:"female", label:"Female"},
                  ]}
                  {...form.getInputProps('sex')}/> 
                  <NumberInput withAsterisk type='number'  label="Age" placeholder="Age" {...form.getInputProps('age')} />
                  <Select withAsterisk label="Civil Status" placeholder='Pick one' data={[
                    {value:"single", label:"Single"},
                    {value:"married", label:"Married"},
                    {value:"widowed", label:"Widowed"},
                    {value:"separated", label:"Separated"},
                    {value:"divorced", label:"Divorced"},
                  ]}
                  defaultValue={"single"}
                  {...form.getInputProps('civil_status')}
                  />

                </div>
              </Group>
                <Collapse title="Guardian Information for Minors" in={form.values.age < 18 && form.values.age ? true:false} transitionDuration={600}>
                  <div>
                    <TextInput label="Guardian Name" placeholder="Guardian Name" withAsterisk {...form.getInputProps('PatientMinor.guardian_name')} />
                    <TextInput label="Occupation of Guardian" placeholder="Occupation" {...form.getInputProps('PatientMinor.occupation')} />
                  </div>
                </Collapse>

                <Title size={16}>Contact Details</Title>
                <Group>
                    <TextInput withAsterisk label="Mobile Number" placeholder="Mobile Number" {...form.getInputProps('mobile_number')} />
                    <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} />
                </Group>


                <Title size={16}>Address</Title>
                <Group>
                    <TextInput withAsterisk label="House no./Building no."  {...form.getInputProps('building')}/>
                    <TextInput withAsterisk label="Street" placeholder="Street" {...form.getInputProps('street')} />
                    <TextInput label="Village" placeholder="Village" {...form.getInputProps('village')} />
                    <TextInput withAsterisk label="Barangay" placeholder="Barangay" {...form.getInputProps('barangay')} />
                    <TextInput withAsterisk label="City" placeholder="City" {...form.getInputProps('city')} />
                    <TextInput withAsterisk label="Province" placeholder="Province" {...form.getInputProps('province')} />
                </Group>
              <Divider  />
              <Group align={"flex-end"} >
                    <Button onClick={()=>openContextModal({
                  modal: 'new_patient_2',
                  title: 'Patient Registration | Step 2',
                  innerProps: {
                    modalDescription:
                     'This modal was defined in ModalsProvider, you can open it anywhere in you app with useModals hook',
                    form: form,
                  },
                  styles(theme, params, context) {
                    return {
                      title: {
                        fontWeight: 700,
                        fontSize: "25px",
                        padding: theme.spacing.md,
                      },
                    };
                  },
                  size: 'xl',
              })}>Next</Button>
              </Group>
          </Group>
          </form>
        </>
    )
}

export default AddPatientModal;