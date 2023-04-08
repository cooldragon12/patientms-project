import React, {useState, useReducer, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { createStyles, Button, Group, rem,SegmentedControl, Title, useMantineTheme} from '@mantine/core';

import { RegularTable }from '../components/list/table';
import { showNotification } from '@mantine/notifications';
import searchSortReducer, { SearchSortState } from '../components/reducer/SearchSort';
import { IClinicHistoryRecord } from '../schema/treatment';
const useLayoutStyle = createStyles((theme)=>({
  main:{
    display:"flex",
    flexDirection:"column",
    gap:".5rem"
  },
  button:{
    borderRadius:"0px",
    backgroundColor:theme.white,
    color:theme.colors.gray[7],
    borderColor:theme.colors.gray[3],
    ":active":{
      backgroundColor:theme.primaryColor,
      color:theme.colors.mint_green[4]
    },
    ":hover":{
      backgroundColor:theme.colors.mint_green[2],
      color:theme.colors.mint_green[1]
    }
  }
}))

const reducer = searchSortReducer<IClinicHistoryRecord>;
const initialState:SearchSortState<IClinicHistoryRecord> = {
  data: [],
  filteredData: [],
  searchQuery: null,
  sortBy: "id",
  ascending: true,
  currentPage: 1,
  itemsPerPage: 3,
}
/**
 * ### History of clinic Page
 * 
 * The page is the log of every patients treatment history for the day
 * @param props data(serverProp)
 * @static Log of every treatment for the day
 */
function ClinicHistory(props) {
  const theme = useMantineTheme()
  const { classes, cx } = useLayoutStyle();
  const [section, setSection] = useState<'today' | 'yesterday' | 'this_week' | 'this_month'>('today');
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(()=>{
    dispatch({type:"LOAD", payload:{data:props.data}})
  },[props.data])

  return (
    <React.Fragment>
      <Head>
        <title>Clinic History - Transactions etc... | GPQ Clinic</title>
      </Head>
      <div className={classes.main}>
      <Title>History Treatment</Title>
        <Group noWrap spacing={0} position="right">
          <SegmentedControl
            value={section}
            onChange={(value: 'today' | 'yesterday' | 'this_week' | 'this_month') => setSection(value)}
            transitionTimingFunction="ease"
            fullWidth
            color={theme.colors.mint_green[9]}
            data={[
              { label: 'Today', value: 'today' },
              { label: 'Yesterday', value: 'yesterday' },
              { label: 'This Week', value: 'this_week' },
              { label: 'This Month', value: 'this_month' },
            ]}
          />
        </Group>
        
        <RegularTable columns={["pid", "Name", "Treatment", "Date"]} data={props.data} empty_message={`No History of Treatment for ${section.replace("_", " ")}`}/>
      </div>
    </React.Fragment>
  )
}
// export async function getServerSideProps(context) {
//   const data = [
//     {
//       "pid":"1",
//       "Name":"Johndel Encabo",
//       "Treatment":"Nagpabunot",
//       "Date":"Today"
//     },
//     {
//       "pid":"2",
//       "Name":"Johndel Encabo",
//       "Treatment":"Nagpabunot",
//       "Date":"Today"
//     },
//     {
//       "pid":"3",
//       "Name":"Johndel Encabo",
//       "Treatment":"Nagpabunot",
//       "Date":"Today"
//     },
//     {
//       "pid":"4",
//       "Name":"Johndel Encabo",
//       "Treatment":"Nagpabunot",
//       "Date":"Today"
//     },
//     {
//       "pid":"5",
//       "Name":"Johndel Encabo",
//       "Treatment":"Nagpabunot",
//       "Date":"Today"
//     },
//   ]
//   return {
//     props:{data:data}
//   }
// }
// export async function getServerSideProps(context) {
//   var data = []
//   try {
//     const res = await fetch("http://localhost:3000/api/history")
//     data = await res.json();

//   }catch (e){
//     showNotification({
//       title: "Error",
//       message: "Failed to fetch data",
//       color: "red",
//       icon: "exclamation-circle"

//     })
//     return {
//       props:{data:data}
//     }
//   }
// } 

export default ClinicHistory;
