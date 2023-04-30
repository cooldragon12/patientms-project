import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useReducer } from "react";
import { useEffect } from "react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import {
 Anchor,
 Avatar,
 Breadcrumbs,
 Card,
 Divider,
 Grid,
 Group,
 SimpleGrid,
 Stack,
 Text,
 Title,
 Button,
 HoverCard,
 Container,
 Box,Modal, Affix, rem
} from "@mantine/core";
import { LabelText } from "../../components/text_label";

import { getPatientDetail } from "../../server/request";
import { OperationContext } from "../../@context/operation";
import CreateTreatment from "../../components/form/CreateTreatment";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { API_URL } from "../../server";
import MedicalHistoryCard from "../../components/page/Patients/MedicalHistoryCard";
import TreatmentHistoryCard from "../../components/page/Patients/TreatmentHistoryCard";

const PatientProfile = (props) => {
 const router = useRouter();
 const [open, { toggle }] = useDisclosure(false);
 const { patient_id } = router.query;
 const { anchor } = useContext(OperationContext);


  const form = useForm<{procedure:any[], tooth_no:number, amount_charged:number}>({
    initialValues: {procedure:[], tooth_no:0, amount_charged:0},
    validate: {
      procedure: (value) => {
        if (value.length < 1) {
          return 'Please select at least one procedure'
        }
      }
    }
  })
  
  const title = `Patient ${patient_id} | GPQ`
return (
  <React.Fragment>
   <Head key={"-page"}>
    <title>{title}</title>
   </Head>
   <Modal
      opened={open}
      title="Create New Treatment"
      onClose={() => toggle()}
      size="xl"
      >
        <form onSubmit={form.onSubmit(async(values) =>{
          console.log(form.values)
            const response = await fetch(`${API_URL}/treatment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                tooth_no: values.tooth_no,
                procedures: values.procedure,
                balance:0, 
                patient_id: patient_id,
                amount_charged: values.amount_charged
              })
            });
            console.log(response)
            form.reset();
            toggle();
            })}
          >
          
          <Group pos={"static"} position="right" align="center" spacing={"lg"}>
            <Button type="submit">Submit</Button>
          </Group>
          
          <Box p={50}>
            <CreateTreatment form={form}/>

          </Box>
        </form>
    </Modal>
   <Text size={28} color="gray" weight="bold">
    Patient: {props.patient.first_name}&apos;s Information
   </Text>
   <Group position="apart">
    <Breadcrumbs separator=">">
     {anchor.map((val, index) => (
      <Anchor href={val.href} key={index}>
       {val.label}
      </Anchor>
     ))}
    </Breadcrumbs>
    <Box
     sx={(theme) => {
      return {
       margin: "0.5rem",
      };
     }}
    >
     <HoverCard
      radius={16}
      shadow="md"
      withArrow
      openDelay={2000}
      position="right"
     >
      <HoverCard.Target>
       <Button
        sx={(theme) => {
         return { margin: "0.25rem" };
        }}
        onClick={() => toggle()}
        variant="filled"
       >
        New Treatment
       </Button>
      </HoverCard.Target>
      <HoverCard.Dropdown>
       <Text size="sm">Create new treatement for the current patient</Text>
      </HoverCard.Dropdown>
     </HoverCard>
     <HoverCard shadow="md" withArrow openDelay={2000} arrowPosition="center">
      <HoverCard.Target>
       <Button
        sx={(theme) => {
         return { margin: "0.25rem" };
        }}
        variant="outline"
       >
        Edit
       </Button>
      </HoverCard.Target>
      <HoverCard.Dropdown>
       <Text size="sm">Edit the profile of the current patient</Text>
      </HoverCard.Dropdown>
     </HoverCard>
    </Box>
   </Group>
   <Grid gutter="xs">
      {/* Profile */}
    <Grid.Col span={7}>
     <Card
      sx={(theme) => ({
       flexDirection: "row",
       display: "flex",
       gap: "2rem",
       // flexGrow: .4,
       flexWrap: "wrap",
      })}
      shadow="sm"
      padding="lg"
      radius="md"
     >
      <Stack spacing={0} align="center">
       <Avatar
        variant="rounded"
        alt="https://pbs.twimg.com/profile_images/1361031780/IMG_20110205_174504_0_normal.jpg"
        src={props.patient.profile_url}
        size={220}
       />
       <Group spacing={10} position="center" align="center">
        <Text weight={"bold"}>{props.patient.last_name},</Text>
        <Text weight={"bold"}>{props.patient.first_name}</Text>
        <Text weight={"bold"}>
         {props.patient.middle_initial ? props.patient.middle_initial+"." : ""}
        </Text>
       </Group>
       <Group spacing={10} position="center" align="center">
        <Text color="gray" weight={"lighter"}>
         {props.patient.email || props.patient.mobile_number
          ? props.patient.email
            ? props.patient.email + " / " + props.patient.mobile_number
            : props.patient.mobile_number
          : "N/A"}
        </Text>
       </Group>
      </Stack>
      <Divider my="xs" orientation={"vertical"} />
      <Grid gutter={"md"}>
       <Grid.Col span={6}>
        <LabelText label="Birth Date">
         {props.patient.birthday ? props.patient.birthday : "N/A"}
        </LabelText>
       </Grid.Col>
       <Grid.Col span={6}>
        <LabelText label="Sex">{props.patient.sex}</LabelText>
       </Grid.Col>
       {/* <Divider my="md" orientation={"vertical"}/> */}
       <Grid.Col span={6}>
        <LabelText label="Civil Status">
         {props.patient.civil_status ? props.patient.civil_status : "N/A"}
        </LabelText>
       </Grid.Col>
       <Grid.Col span={6}>
        <LabelText label="Occupation">
         {props.patient.occupation ? props.patient.occupation : "N/A"}
        </LabelText>
       </Grid.Col>

       {/* <Divider my="md" orientation={"vertical"}/> */}

       <Grid.Col span={6}>
        <LabelText label="Address">
         {props.patient.address ? props.patient.address.full_address : "N/A"}
        </LabelText>
       </Grid.Col>
       <Grid.Col span={6}>
        <LabelText label="Last Visit">
         {props.patient.last_visit ? props.patient.last_visit : "N/A"}
        </LabelText>
       </Grid.Col>
      </Grid>
     </Card>
    </Grid.Col>
      {/* Medical History */}
    <Grid.Col span={5}>
     <Card
      shadow="sm"
      padding="lg"
      radius="md"
     >
      <MedicalHistoryCard link={props.patient.medical_history}/>
      
     </Card>
    </Grid.Col>
      {/* TreatmentHistory */}
    <Grid.Col span={12}>
     <Card shadow="sm" padding="lg" radius="md">
      <TreatmentHistoryCard link={props.patient.treatments}/>
     </Card>
    </Grid.Col>
    {/* Dentition Condition */}
    <Grid.Col span={12}>
     <Card shadow="sm" padding="lg" radius="md">
      <Group
       sx={(theme) => ({
        flexDirection: "column",
        alignItems: "flex-start",
       })}
       spacing={"sm"}
      >
       <Text weight="bolder" variant={"text"} size={"xl"}>
        Dentition Condition
       </Text>
      </Group>
     </Card>
    </Grid.Col>

   </Grid>
  </React.Fragment>
 );
};
export async function getServerSideProps(context) {
  const { patient_id } = context.query;
  const res = await getPatientDetail(patient_id)
  const patient_data = await res.json();
  return {
   props: {
    patient: patient_data,
   },
   
  };

}

export default PatientProfile;
