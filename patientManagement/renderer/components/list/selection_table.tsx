import React, {useState, useEffect} from 'react';
import { Table, ScrollArea, Checkbox,  UnstyledButton, Group, Skeleton } from '@mantine/core';
import { Patient } from '../../schema/patient';
import { useStyles } from './';
// With Selection Table Component
 const SelectionTable = ({columns=[], data=[], empty_message=""}) =>{
    const [scrolled, setScrolled] = useState(false);
    const [selection, setSelection] = useState([]);
    const [selectOpen, setSelectOpen] = useState(false);
    const [loading, setLoading] = useState(true);
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

            return (<tr key={row}>
                {
                    columns.map((column, index)=><td key={row+""+column}><Skeleton height={8} mt={7} radius="xl"/></td>)
                }
                </tr>)})
    const rows = data.map((row)=>{
        const keys = Object.keys(row)
        const selected = selection.includes(row.patient_id)
        
        return(
            <tr onDoubleClick={()=>toggleSelect(row.patient_id)} onClick={()=>{if (selectOpen) toggleRow(row.patient_id)}} key={row.patient_id} className={cx({ [classes.rowSelected]: selected })}>
                {
                    
                    keys.map((value, index)=> {
                        if (index < columns.length)
                        return (
                            <td key={row[value]}>{row[value]}</td>
                        )})
                    }
                    {
                        selectOpen ? <td>
                        <Checkbox
                            checked={selected}
                            readOnly
                            transitionDuration={0}
                        />
                        </td>: <></>
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
                    <tr>
                        
                        {
                            columns.map((column, index)=>
                            <th key={column+ " " +index}>{column}</th>
                            )
                        }
                        {
                            selectOpen ? <th><Group>
                            <Checkbox
                            onChange={toggleAll}
                            checked={selection.length === data.length}
                            indeterminate={selection.length > 0 && selection.length !== data.length}
                            transitionDuration={0}
                            />
                            <UnstyledButton className={classes.sideButtonCheck} onClick={toggleCancelSelect}>Cancel</UnstyledButton>
                            </Group>
                            </th>: <></>
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
export default SelectionTable;