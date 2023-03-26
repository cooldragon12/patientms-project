import React, { useEffect , useState, useContext} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Box, Title, Menu, Text} from '@mantine/core';
import { LinkedSelectionTable } from '../../components/list';
import { IconArrowBadgeDown } from '@tabler/icons-react';
import SearchBar from '../../components/SearchBar';

import { DELETE } from '../../server/HTTP';
import { PatientsProvider } from '../../@context/patient';

import { useModals } from '@mantine/modals';

import { OperationContext } from '../../@context/operation';
import { openContextModal } from '@mantine/modals';


function Patients(props) {
    const [selection, setSelection] = useState([]);
    const {tempData, setTempData} = useContext(OperationContext);
    const  modals = useModals();
    const searchRef = React.useRef(null);

    const handleDeleteSelected = async (ids) => {
      await DELETE("api/patients/", {patients_id:ids})
    }

    const handleDelete = async (id:string) => {
      await DELETE("api/patients/", {patient_id:id})
    }
    
    return (
      <React.Fragment>
        <PatientsProvider>

        <Head><title>Patient List | GPQ</title></Head>
        {/* Add */}
        <Box sx={(theme)=>({gap:"1rem"})}>
          <Title>Patients</Title>
          <Group spacing="md" sx={(theme)=>({
            margin:"1rem 0"
          })} position="apart">
            <Group>
              {/* Buttons Option */}
              <Button variant="filled"  color="cyan" onClick={()=>openContextModal({
                  modal: 'new_patient',
                  title: 'Patient Registration | Step 1 ',
                  innerProps: {
                    modalDescription:
                     'This modal was defined in ModalsProvider, you can open it anywhere in you app with useModals hook',
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
              })}>New Patient</Button>
              <Button variant="outline" color="cyan" >Import</Button>
            </Group>
            <Group >
              <SearchBar searchRef={searchRef}/>
            </Group>
          </Group>
          <Group spacing="md" sx={(theme)=>({
            justifyContent:"space-between",
            marginVertical:"1rem"
            })}>
            {/* Sort and other options , also text for total patient*/}
            <Group>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant={"white"}>Choose action <IconArrowBadgeDown/></Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Action Selected</Menu.Label>
                    <Menu.Item disabled={selection.length < 1 ? true :false} onClick={()=>handleDeleteSelected(selection)}>Delete Selected Item</Menu.Item>
                    {/* <Menu.Item onClick={() => console.log('Item 1 clicked')}>Delete Selected Item</Menu.Item> */}
                  <Menu.Divider />

                  <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item onClick={() => console.log('Item 1 clicked')}>Delete All</Menu.Item>

                </Menu.Dropdown>
              </Menu>
              {
                selection.length > 0?<Text weight={"bold"} size="sm">Selected Rows: {selection.length}</Text>:<></>
              }

            </Group>
            <Group>
              <Text weight={"bold"} size="sm">Total Patients: {props.data ? props.data.length : 0}</Text>
            </Group>
          </Group>
          <LinkedSelectionTable setSelection={setSelection} selection={selection} columns={["ID", "Last Name","First Name", "Sex", "Last Visit"]} data={props.data} empty_message="No Patient"/>
        </Box>
        </PatientsProvider>
      </React.Fragment>
    )
}
export async function getStaticProps(context) {
  const data = [
    {
      "id":"1",
      "last_name":"Encabo",
      "first_name":"Johndel",
      "sex":"M",
      "last_visit":"2021-05-01",
      "patient_url":"/patients/1"
    },
    {
      "patient_id":"2",
      "last_name":"Encabo",
      "first_name":"Johndel",
      "sex":"M",
      "last_visit":"2021-05-01",
      "patient_url":"/patients/2"

    },
    {
      "patient_id":"3",
      "last_name":"Encabo",
      "first_name":"Johndel",
      "sex":"M",
      "last_visit":"2021-05-01",
      "patient_url":"/patients/3"
    },
    {
      "patient_id":"4",
      "last_name":"Encabo",
      "first_name":"Johndel",
      "sex":"M",
      "last_visit":"2021-05-01",
      "patient_url":"/patients/4"
    },
    {
      "patient_id":"5",
      "last_name":"Encabo",
      "first_name":"Johndel",
      "sex":"M",
      "last_visit":"2021-05-01",
      "patient_url":"/patients/5"
    },
  ]
  return {
    props:{
      data:data
    },
    revalidate: 10,

  }
}


export default Patients;