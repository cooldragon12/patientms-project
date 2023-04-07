import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { Button, Group, Box, Title, Menu, Text, TextInput } from "@mantine/core";
import { LinkedSelectionTable } from "../../components/list";
import { IconArrowBadgeDown, IconSearch } from "@tabler/icons-react";
import SearchBar from "../../components/SearchBar";

import { deletePatient, getPatientOverview } from "../../server/request";
import { PatientsContext, PatientsProvider } from "../../@context/patient";

import { OperationContext } from "../../@context/operation";
import { useRouter } from "next/router";

import { PatientOverview } from "../../schema/patient";


function Patients(props) {
  const [selection, setSelection] = useState([]);
  const searchRef = React.useRef(null);
  const router = useRouter();
  // Data Related State
  const {state, dispatch} = useContext(PatientsContext)
 
  useEffect(() => {
    console.log(props.data)
    dispatch({type: "LOAD", payload: {data: props.data}})
  }, [props.data]);
  const searchHandler = (e) => {
    dispatch({ type: "SEARCH", payload: { searchQuery:e.target.value } });
  }
  return (
    <React.Fragment>
        <Head>
          <title>Patient List | GPQ</title>
        </Head>
        {/* Add */}
        <Box sx={(theme) => ({ gap: "1rem" })}>
          <Title>Patients</Title>
          
          <Group
            spacing="md"
            sx={(theme) => ({
              margin: "1rem 0",
            })}
            position="apart"
          >
            <Group>
              {/* Buttons Option */}
              <Button
                variant="filled"
                color="cyan"
                onClick={() => router.push("/patients/new/")}
              >
                New Patient
              </Button>
              <Button variant="outline" color="cyan">
                Import
              </Button>
            </Group>
            <Group>
              <SearchBar onChange={searchHandler} />
            </Group>
          </Group>
          <Group
            spacing="md"
            sx={(theme) => ({
              justifyContent: "space-between",
              marginVertical: "1rem",
            })}
          >
            {/* Sort and other options , also text for total patient*/}
            <Group>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant={"white"}>
                    Choose action <IconArrowBadgeDown />
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Action Selected</Menu.Label>
                  <Menu.Item
                    disabled={selection.length < 1 ? true : false}
                    onClick={() => null}
                  >
                    Delete Selected Item
                  </Menu.Item>
                  {/* <Menu.Item onClick={() => console.log('Item 1 clicked')}>Delete Selected Item</Menu.Item> */}
                  <Menu.Divider />

                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item onClick={() => console.log("Item 1 clicked")}>
                    Delete All
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              
              {selection.length > 0 ? (
                <Text weight={"bold"} size="sm">
                  Selected Rows: {selection.length}
                </Text>
              ) : (
                <></>
              )}
            </Group>
            <Group>
              <Text weight={"bold"} size="sm">
                Total Patients: {state.data ? state.data.length : 0}
              </Text>
            </Group>
          </Group>
          <LinkedSelectionTable
            setSelection={setSelection}
            selection={selection}
            columns={["ID", "Last Name", "First Name", "Sex", "Last Visit"]}
            data={state.filteredData}
            empty_message="No Patient"
          />
        </Box>
    </React.Fragment>
  );
}
export async function getStaticProps(context) {
  const data = [
    {
      id: "1",
      last_name: "Encabo",
      first_name: "Johndel",
      sex: "M",
      last_visit: "2021-05-01",
      patient_url: "/patients/1",
    },
    {
      id: "2",
      last_name: "Encabo",
      first_name: "Johndel",
      sex: "M",
      last_visit: "2021-05-01",
      patient_url: "/patients/2",
    },
    {
      id: "3",
      last_name: "Encabo",
      first_name: "Johndel",
      sex: "M",
      last_visit: "2021-08-01",
      patient_url: "/patients/3",
    },
    {
      id: "4",
      last_name: "Encabo",
      first_name: "Johndel",
      sex: "M",
      last_visit: "2021-09-01",
      patient_url: "/patients/4",
    },
    {
      id: "5",
      last_name: "Encabo",
      first_name: "Johndel",
      sex: "M",
      last_visit: "2021-01-01",
      patient_url: "/patients/5",
    },
  ];
  return {
    props: {
      data: data,
    },
    revalidate: 10,
  };
}

export default Patients;
