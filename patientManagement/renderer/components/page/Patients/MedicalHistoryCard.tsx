import {useEffect, useState} from 'react'
import {
    Divider,
    Group,
    Stack,
    Text,
   } from "@mantine/core";
import { PatientMedicalHistory } from '../../../schema/patient';
import { getThroughLink } from '../../../server/request';
import { notifications } from "@mantine/notifications";
import { IconAlertCircle } from '@tabler/icons-react';

const MedicalHistoryCard = (props)=>{
    const [data, setData] = useState<PatientMedicalHistory>({})
    const dataHandler = async () => {
        if (props.link == null) {
            return
        }
        try{
            
            const response = await getThroughLink(props.link)
            setData(await response.json())
        }catch(err){
            console.log(err)
            notifications.show({
                title: "Error",
                message: "Failed to fetch Patient (3) Medical History",
                color: "red",
                icon: <IconAlertCircle />,
            })
        }
    }
    useEffect(() => {
        dataHandler();
    }, [])
    
    return (
        <>
            <Group
                sx={(theme) => ({
                    flexDirection: "column",
                    alignItems: "flex-start",
                })}
                spacing={"sm"}
                >
                <Text weight="bolder" variant={"text"} size={"xl"}>
                    Medical History
                </Text>
            </Group>
            <Divider my={"md"}/>
            <Stack>
            <Text weight="normal" variant={"text"} size={"sm"}>
                Are you in a good health condition? <b>{data.goodhealth ? "Yes" : "No"}</b>
            </Text>
            <Text weight="normal" variant={"text"} size={"sm"}>
                Do you use alcohol, cocaine or other dangerous drugs? <b>{data.isAlcoholOrDrugs ? "Yes" : "No"}</b>
            </Text>
            <Text weight="normal" variant={"text"} size={"sm"}>
                Do you use tabacco products? <b>{data.tobacco ? "Yes" : "No"}</b>
            </Text>
            <Text weight="normal" variant={"text"} size={"sm"}>
                Have you ever hospitalization? <b>{data.hospitalization ? "Yes, " + data.hospitalization : "No"}</b>
            </Text>
            <Text weight="normal" variant={"text"} size={"sm"}>
            Are you taking any prescription/non-prescription medication? <b>{data.medication ?  (<><br/>{data.medication}</>): "No"}</b>
            </Text>
            <Text weight="normal" variant={"text"} size={"sm"}>
            Are you in medical treatment now? <b>{data.current_treatment ?  (<><br/>{data.current_treatment}</>): "No"}</b>
            </Text>
            <Text weight="normal" variant={"text"} size={"sm"}>
            Have you ever had serious illness or surgical operation? <b>{data.isIllnessOrOperation ?  (<><br/>{data.current_treatment}</>): "No"}</b>
            </Text>
            <Text weight="normal" variant={"text"} size={"sm"}>
                Allergic {data.allergies ? <>to the following <br/><ul>{data.allergies.map((val , index)=><li key={index}>{val}</li>)}</ul></>:  (<>to <b>None</b></>)}
            </Text>
            <Text weight="normal" variant={"text"} size={"sm"}>
            Have the following conditions: <b>{data.isIllnessOrOperation ? <><ul>{props.patient.allergies.map((val , index)=><li key={index}>{val}</li>)}</ul></>: "N/A"}</b>
            </Text>
            </Stack>
        </>
    )
}

export default MedicalHistoryCard;