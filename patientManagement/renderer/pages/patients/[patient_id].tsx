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
 Box,Modal
} from "@mantine/core";
import { LabelText } from "../../components/text_label";

import { getPatientDetail } from "../../server/request";
import { OperationContext } from "../../@context/operation";
import { LinkedSelectionTable } from "../../components/list";
import searchSortReducer, { SearchSortState } from "../../components/reducer/SearchSort";
import { TreatmentRecordOverview } from "../../schema/treatment";
import CreateTreatment from "../../components/form/CreateTreatment";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
const initialData: SearchSortState<TreatmentRecordOverview>= {
  data: [],
  filteredData: [],
  searchQuery: null,
  sortBy:"patient_id",
  ascending: true,
  currentPage: 1,
  itemsPerPage: 3,
};

const treatmentReducer = searchSortReducer<TreatmentRecordOverview>;

const PatientProfile = (props) => {
 const router = useRouter();
 const [open, { toggle }] = useDisclosure(false);
 const { patient_id } = router.query;
 const { anchor } = useContext(OperationContext);
 const [loading, setLoading] = React.useState(true);
const [state, dispatch ] = useReducer(treatmentReducer, initialData);
const sorthandler = (id:keyof TreatmentRecordOverview) => {
  dispatch({ type: "SORT", payload: { key:id } });
}
  const form = useForm<{procedures:any[]}>({
    initialValues: {procedures:[]},
      
  })
  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3000/api/treatment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({procedures: form.values.procedures, patient_id: patient_id})
    });
    console.log(response.json())
    return response
  }
  
return (
  <React.Fragment>
   <Head>
    <title> Patient {patient_id} | GPQ</title>
   </Head>
   <Modal
      opened={open}
      title="Create New Treatment"
      onClose={() => toggle()}
      size="xl"
      lockScroll
      >
        <form onSubmit={()=>{toggle(); handleSubmit()}}>
          <CreateTreatment form={form}/>
          <Button>Submit</Button>
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
      <Stack spacing={0}>
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
         {props.patient.middle_initial.toUpperCase()}.
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
         {props.patient.address ? props.patient.address : "N/A"}
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
      {/* Unknown */}
    <Grid.Col span={5}>
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
      .
     </Card>
    </Grid.Col>
      {/* TreatmentHistory */}
    <Grid.Col span={8}>
     <Card shadow="sm" padding="lg" radius="md">
      <Stack spacing={"sm"}>
       <Group>
        <Text weight="bolder" variant={"text"} size={"xl"}>
         Treatment History
        </Text>
       </Group>
       <LinkedSelectionTable
        setSelection={()=>{}}
        selection={[]}
        empty_message="No Treatment Record yet!!"
        data={state.filteredData}
        columns={[{label:"ID", value:"patient_id"}, {label:"Tooth No.", value:"tooth_no"}, {label:"Procedure", value:"procedure"}, {label:"Date", value:"date"}, {label:"Status", value:"status"}]}
        sortHandler={sorthandler}
        ascending={state.ascending}
        sortBy={state.sortBy}
       />
      </Stack>
     </Card>
    </Grid.Col>
    {/* Medical History */}
    <Grid.Col span={4}>
     <Card shadow="sm" padding="lg" radius="md">
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
        Are you in a good health condition? <b>{props.patient.goodhealth ? "Yes" : "No"}</b>
       </Text>
       <Text weight="normal" variant={"text"} size={"sm"}>
        Do you use alcohol, cocaine or other dangerous drugs? <b>{props.patient.isAlcoholOrDrugs ? "Yes" : "No"}</b>
       </Text>
       <Text weight="normal" variant={"text"} size={"sm"}>
        Do you use tabacco products? <b>{props.patient.tobacco ? "Yes" : "No"}</b>
       </Text>
       <Text weight="normal" variant={"text"} size={"sm"}>
        Have you ever hospitalization? <b>{props.patient.hospitalization ? "Yes, " + props.patient.hospitalization : "No"}</b>
       </Text>
       <Text weight="normal" variant={"text"} size={"sm"}>
       Are you taking any prescription/non-prescription medication? <b>{props.patient.medication ?  (<><br/>{props.patient.medication}</>): "No"}</b>
       </Text>
       <Text weight="normal" variant={"text"} size={"sm"}>
       Are you in medical treatment now? <b>{props.patient.current_treatment ?  (<><br/>{props.patient.current_treatment}</>): "No"}</b>
       </Text>
       <Text weight="normal" variant={"text"} size={"sm"}>
       Have you ever had serious illness or surgical operation? <b>{props.patient.isIllnessOrOperation ?  (<><br/>{props.patient.current_treatment}</>): "No"}</b>
       </Text>
       <Text weight="normal" variant={"text"} size={"sm"}>
        Allergic {props.patient.allergies ? <>to the following <br/><ul>{props.patient.allergies.map((val , index)=><li key={index}>{val}</li>)}</ul></>:  (<>to <b>None</b></>)}
       </Text>
       <Text weight="normal" variant={"text"} size={"sm"}>
       Have the following conditions: <b>{props.patient.isIllnessOrOperation ? <><ul>{props.patient.allergies.map((val , index)=><li key={index}>{val}</li>)}</ul></>: "N/A"}</b>
       </Text>
      </Stack>
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
 try {
  const res = await getPatientDetail(patient_id)
  const data = await res.json();
  return {
   props: {
    patient: data,
   },
  };
 } catch (err) {
  const data = {
   first_name: "Johndel",
   last_name: "Doe",
   middle_initial: "A",
   age: 20,
   sex: "Male",
  };
  return {
   props: {
    patient: data,
   },
  };
 }
}

export default PatientProfile;
