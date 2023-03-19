import Head from "next/head";
import { useRouter } from "next/router"
import React from "react";

import { useEffect } from 'react';
import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { Avatar, Box, Card, Divider, Group, Text } from "@mantine/core";
import { LabelText } from "../../components/text_label";



  

 
const PatientProfile = (props)=>{
    const router = useRouter();
    const {patient_id} = router.query
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        const handleStart = (url: string) => url !== router.asPath && nprogress.start();
        const handleComplete = () => nprogress.complete();
    
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
    
        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
      }, [router.isReady]);
    return (
        <React.Fragment>
            <Head>
                <title> Patient {patient_id} | GPQ</title>
            </Head>
            <Text size={28} color="gray" weight="bold">Patient: {props.patient.first_name}'s Information</Text>
            <Group sx={(theme)=>({alignItems:"flex-start",justifyContent:"flex-start", flexWrap:"wrap"})}>
                <Card sx={(theme)=>(
                    {
                        flexDirection: "row",
                        display: "flex",
                        gap: "2rem",
                        // flexGrow: .4,
                        flexWrap: "wrap",
                    }
                )} shadow="sm" padding="lg" radius="md" >
                    <Group>
                        <Avatar alt="https://pbs.twimg.com/profile_images/1361031780/IMG_20110205_174504_0_normal.jpg" src={props.patient.profile_url} size={250} />
                    </Group>
                    <Divider my="xs" orientation="vertical" />
                    <Group sx={(theme)=>({flexDirection:"column", alignItems:"flex-start"})} spacing={"sm"}>
                        <LabelText label="Last Name">
                            {props.patient.last_name}
                        </LabelText>
                        <LabelText label="First Name">
                            {props.patient.first_name}
                        </LabelText>
                        <LabelText label="M.I.">
                            .{props.patient.middle_initial.toUpperCase()}
                        </LabelText>
                        <LabelText label="Age">
                            {props.patient.age}
                        </LabelText>
                        <LabelText label="Sex">
                            {props.patient.sex}
                        </LabelText>
                    </Group>
                    <Group sx={(theme)=>({flexDirection:"column", alignItems:"flex-start"})} spacing={"sm"}>
                        <LabelText label="Birth Date">
                            {props.patient.birthday}
                        </LabelText>
                        <LabelText label="Civil Status">
                            {props.patient.civil_status}
                        </LabelText>
                        <LabelText label="Occupation">
                            {props.patient.occupation ? props.patient.occupation : "N/A"}
                        </LabelText>
                    </Group>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" >
                    <Group sx={(theme)=>({flexDirection:"column", alignItems:"flex-start"})} spacing={"sm"}>
                        <Text weight="bolder" variant={"text"} size={"xl"}>Contact Information</Text>
                        <LabelText label="Email">
                            {props.patient.email ? props.patient.email : "N/A"}
                        </LabelText>
                        <LabelText label="Mobile Number">
                            {props.patient.mobile_number ? props.patient.mobile_number : "N/A"}
                        </LabelText>
                        
                    </Group>
                    <Divider/>
                    <Group sx={(theme) =>({flexDirection:"column", alignItems:"flex-start"})}>
                        <Text weight="bolder" variant={"text"} size={"xl"}>Address</Text>
                        <Text>{props.patient.patient_address ? props.patient.patient_address : "N/A"}</Text>
                    </Group>
                </Card>
            </Group>
            <Group>
                <Box mx={400}>

                </Box>
                <Box mx={400}>

                </Box>
            </Group>
        </React.Fragment>
    )
}
export async function getServerSideProps(context) {
    const {patient_id} = context.query
    try{

        const res = await fetch(`http://localhost:3000/api/patients/${patient_id}`)
        const data = await res.json()
        return {
            props: {
                patient: data
            }
        }
    } catch (err) {
        const data = {
            "first_name": "Johndel",
            "last_name": "Doe",
            "middle_initial": "A",
            "age": 20,
            "sex":"Male",
        }
        return {props:{
            patient:data
        }
    }
    }
}

export default PatientProfile;