import {Group,Divider, NumberInput, Radio, Collapse,TextInput, Select, Title, Button, Text, Checkbox} from '@mantine/core';
import {DateInput} from '@mantine/dates';
import { useForm, zodResolver, UseFormReturnType } from '@mantine/form';
import { ContextModalProps, useModals } from '@mantine/modals';
import { useState, useContext } from 'react';

import { OperationContext } from '../../../@context/operation';
import { Patient, PatientFullInformation } from '../../../schema/patient';
const MedHistoryModal = (
    { context, id, innerProps }: ContextModalProps<{ 
      modalDescription: string 
      form?: UseFormReturnType<PatientFullInformation>
    }>
    
    ) => {
    const [opened1, setOpened1] = useState(false);
    const [opened2, setOpened2] = useState(false);
    const [opened3, setOpened3] = useState(false);
    const [opened4, setOpened4] = useState(false);

    const {tempData, setTempData} = useContext(OperationContext);
    const  modals = useModals();
    
    return(
        <>

          <Group sx={(theme)=>({
                          flexDirection: 'column',
                          paddingLeft: theme.spacing.xl,
                          paddingRight: theme.spacing.xl,
                          
                          gap: theme.spacing.md,
                          
                          alignItems: 'flex-start',
                        })}>
                          <Text size="sm">{innerProps.modalDescription}</Text>
                          <Radio.Group
                            label="Are you in good health?"
                            
                            >
                            <Group>
                              <Radio value="true" label="Yes"/>
                              <Radio value="false" label="No"/>
                            </Group>
                          </Radio.Group>
                          <Radio.Group
                            label="Are you in medical treatment now?"
                            onChange={(val)=>{val === "yes"? setOpened1(true): setOpened1(false); console.log(opened1)}}
                            
                          >
                            <Group>
                              <Radio value="yes" label="Yes"/>
                              <Radio value="no" label="No"/>
                            </Group>
                            <Collapse in={opened1} transitionDuration={600}>
                              <TextInput {...innerProps.form.getInputProps('PatientInformation.current_treatment')}  variant={"filled"} label="If so, what is the condition being treated?"/>
                            </Collapse>
                          </Radio.Group>
                          <Radio.Group
                            label="Have you ever had serious illness or surgical operation?"
                            onChange={(val)=>{val === "yes"? setOpened2(true): setOpened2(false); console.log(opened2)}}
                            
                          >
                            <Group>
                              <Radio value="yes" label="Yes"/>
                              <Radio value="no" label="No"/>
                            </Group>
                            <Collapse in={opened2} transitionDuration={600}>
                              <TextInput {...innerProps.form.getInputProps('PatientInformation.isIllnessOrOperation')}  variant={"filled"} label="If so, what illness or operation?"/>
                            </Collapse>
                          </Radio.Group>
                          <Radio.Group
                            label="Have you ever hospitalization?"
                            onChange={(val)=>{val === "yes"? setOpened3(true): setOpened3(false); console.log(opened3)}}
                            
                          >
                            <Group>
                              <Radio value="yes" label="Yes"/>
                              <Radio value="no" label="No"/>
                            </Group>
                            <Collapse in={opened3} transitionDuration={600}>
                              <TextInput {...innerProps.form.getInputProps('PatientInformation.hospitalization')}  variant={"filled"} label="If so, when and why?"/>
                            </Collapse>
                          </Radio.Group>
                          <Radio.Group
                            label="Are you taking any prescription/non-prescription medication?"
                            onChange={(val)=>{val === "yes"? (setOpened4(true)): setOpened4(false); console.log(opened4)}}
                          >
                            <Group>
                              <Radio value="yes" label="Yes"/>
                              <Radio value="no" label="No"/>
                            </Group>
                            <Collapse in={opened4} transitionDuration={600}>
                              <TextInput {...innerProps.form.getInputProps('PatientInformation.medication')}  variant={"filled"} label="If so, please specify"/>
                            </Collapse>
                          </Radio.Group>
                          <Radio.Group
                            label="Do you use tobacco products?"
                            
                            >
                            <Group>
                              <Radio value="true" label="Yes"/>
                              <Radio value="false" label="No"/>
                            </Group>
                          </Radio.Group>
                          <Radio.Group
                            label="Do you use alcohol, cocaine or other dangerous drugs?"
                            
                            >
                            <Group>
                              <Radio value="true" label="Yes"/>
                              <Radio value="false" label="No"/>
                            </Group>
                          </Radio.Group>
                          
                          <Collapse title="For Women" in={innerProps.form.values.sex === "female"? true:false} transitionDuration={600}>
                            <div>
                              <Checkbox label="Are you pregnant?" {...innerProps.form.getInputProps('PatientWoman.pregnancy')} />
                              <Checkbox label="Are you nursing" {...innerProps.form.getInputProps('PatientWoman.nursing')} />
                              <Checkbox label="Are you taking birth control?" {...innerProps.form.getInputProps('PatientWoman.birth_control')} />

                            </div>
                          </Collapse>
          </Group>
        </>
    )
}

export default MedHistoryModal;