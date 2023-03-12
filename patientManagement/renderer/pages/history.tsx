import React, {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { createStyles, Button, Group, rem,SegmentedControl, Title, useMantineTheme} from '@mantine/core';

import { RegularTable }from '../components/list/table';

const useLayoutStyle = createStyles((theme)=>({
  main:{
    display:"flex",
    flexDirection:"column",
    gap:".5rem"
  },
  gButton:{
    justifyContent:"end"
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

function ClinicHistory(props) {
  const theme = useMantineTheme()
  const { classes, cx } = useLayoutStyle();
  const [section, setSection] = useState<'today' | 'yesterday' | 'this_week' | 'this_month'>('today');
  return (
    <React.Fragment>
      <Head>
        <title>Clinic History - Transactions etc... | GPQ Clinic</title>
      </Head>
      <div className={classes.main}>
      <Title>History Treatment</Title>

        <Group noWrap spacing={0} className={classes.gButton}>
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
        
        <RegularTable columns={["pid", "Name", "Treatment", "Date"]} data={props.data}/>
      </div>
    </React.Fragment>
  )
}
export async function getServerSideProps(context) {
  const data = [
    {
      "pid":"1",
      "Name":"Johndel Encabo",
      "Treatment":"Nagpabunot",
      "Date":"Today"
    },
    {
      "pid":"2",
      "Name":"Johndel Encabo",
      "Treatment":"Nagpabunot",
      "Date":"Today"
    },
    {
      "pid":"3",
      "Name":"Johndel Encabo",
      "Treatment":"Nagpabunot",
      "Date":"Today"
    },
    {
      "pid":"4",
      "Name":"Johndel Encabo",
      "Treatment":"Nagpabunot",
      "Date":"Today"
    },
    {
      "pid":"5",
      "Name":"Johndel Encabo",
      "Treatment":"Nagpabunot",
      "Date":"Today"
    },
  ]
  return {
    props:{data:data}
  }
}
// export async const getServerSideProps = (context) {

//   return {
//     props:{},
//   }
// } 

export default ClinicHistory;
