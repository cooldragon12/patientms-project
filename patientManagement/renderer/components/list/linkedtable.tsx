import React, {useEffect, useState} from 'react';
import { Table, ScrollArea, createStyles,Menu, Checkbox, Button, UnstyledButton, Group, Skeleton } from '@mantine/core';
import { Patient } from '../../schema/patient';
import { useStyles } from '.';
import Link from 'next/link';
import { IconDotsVertical, IconLink} from '@tabler/icons-react';


export const LinkedSelectionTable = ({columns=[], data=[], empty_message="", selection=[],setSelection}, props) =>{
    const [scrolled, setScrolled] = useState(false);
    const [selectOpen, setSelectOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    // Data state
    
    // Style
    const { classes, cx } = useStyles();
    const toggleSelect = (id:string)=>{
        setSelectOpen(true)
        
        toggleRow(id)
        
    }
    const toggleCancelSelect = ()=> {setSelectOpen(false); toggleDeselect()};
    const toggleDeselect = ()=> setSelection([]);

    const toggleRow = (id: string) =>{
        setSelection((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        )};
    const toggleAll = () =>
        setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.patient_id)));
    const rows_skelelon = columns.map((row, index)=>{

        return (<tr key={row + "s"}>
            {
                columns.map((column, index)=><td key={row+""+column}><Skeleton  height={8} mt={7} radius="xl"/></td>)
            }
            </tr>)})
    const rows = data.map((row, i)=>{
        const keys = Object.keys(row)
        const selected = selection.includes(row.patient_id)
        
        return(
            
            <tr key={row.patient_id +"-" +i} onDoubleClick={()=>toggleSelect(row.patient_id)} onClick={()=>{if (selectOpen) toggleRow(row.patient_id)}}  className={cx({ [classes.rowSelected]: selected })}>
                {
                    
                    keys.map((value, index)=> {
                        if (index < columns.length)
                        return (
                            <td key={row[value]}>
                                
                                    <Link key={row.patient_id} href={row.patient_url}>
                                        <a>{row[value]}</a>
                                    </Link>
                                
                            </td>
                        )})
                    }
                    {
                        selectOpen ? <td>
                        <Checkbox
                            checked={selected}
                            readOnly
                            transitionDuration={0}
                            radius="xl"
                        />
                        </td>: <td align='center'>
                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                    <IconDotsVertical size={15}/>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                    <Menu.Label>Operations</Menu.Label>
                                        <Menu.Item onClick={() => toggleSelect(row.patient_id)}>Select</Menu.Item>
                                        <Menu.Item rightSection={<IconLink/>}  key={row.patient_id +"-"+"link"} >Open</Menu.Item>
                                    <Menu.Divider />
                                        <Menu.Item onClick={() => props.editHandler}>Edit</Menu.Item>
                                        <Menu.Item onClick={() => props.deleteHandler}>Delete</Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </td>
                    }
                   
                    
            </tr>
           
                
        
    )});
    useEffect(()=>{
        
        setTimeout(()=>setLoading(false), 500);
        // setLoading(false);
    }, [data])
    return (
        <ScrollArea h={600} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table withBorder={true} verticalSpacing="sm" horizontalSpacing="sm" className={classes.table}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr key={"Header Patient"}>
                        
                        {
                            columns.map((column, index)=>
                            <th key={column+ " " +index}>
                                <Skeleton visible={loading} radius="md">
                                    {column}
                                </Skeleton >
                            </th>
                            )
                        }
                        {
                            selectOpen ? <th key={10} style={{width:"13%"}}><Group>
                            <Checkbox
                            onChange={toggleAll}
                            checked={selection.length === data.length}
                            indeterminate={selection.length > 0 && selection.length !== data.length}
                            transitionDuration={0}
                            radius="xl"
                            />
                            <UnstyledButton className={classes.sideButtonCheck} onClick={toggleCancelSelect}>Cancel</UnstyledButton>
                            </Group>
                            </th>: <th key={10}  style={{width:"13%"}}></th>
                        }
                    </tr>
                </thead>
                <tbody>
                {
                
                        data && !loading? rows:rows_skelelon
                }
                </tbody>
                
            </Table>
            {
                data.length === 0 ? <div className={classes.emptyState}><h2>{empty_message}</h2></div>:<></>
            }
                
        </ScrollArea>
    )
}