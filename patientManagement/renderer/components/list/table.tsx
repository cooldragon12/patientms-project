import React, {useState} from 'react';
import { Table, ScrollArea, createStyles } from '@mantine/core';
import { Patient } from '../../schema/patient';

const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colors.mint_green[0],
        

        transition: 'box-shadow 150ms ease',

        '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderBottom: `.2rem solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
        }`,
        },
    },

    table:{
        borderRadius: theme.radius.md,
        // borderColor: theme.colors.mint_green[3]
        "tbody":{
        "tr":{
            ":hover":{
                backgroundColor: theme.colors.gray[0],
                color:theme.colors.mint_green[8],
                cursor:"pointer"
            },
            transitionProperty: "background-color,color",
            transitionDuration:"100ms",
            transitionTimingFunction:"ease-in"
            
        }}
    },
    scrolled: {
        boxShadow: theme.shadows.sm,
    },

    rowSelected:{
        backgroundColor:theme.colors.mint_green[8]
    }
}));
export const RegularTable = ({columns=[], data=[]}) =>{
    const [scrolled, setScrolled] = useState(false);
    const [selection, setSelection] = useState(['1']);
    const { classes, cx } = useStyles();
    const rows = data.map((row:Patient)=>{
        const keys = Object.keys(row)
        const selected = selection.includes(row.patient_id)
        return(
            <tr key={row.patient_id}>
                {
                    keys.map((value, index)=>(
                        <td key={row[value]}>{row[value]}</td>
                    ))
                }
            </tr>
        
    )});
    const emptyRows = (
        <tr>
            {columns.map((column, index)=>(
                <td key={index}>Walang Laman</td>
        ))}

        </tr>
    );
    return (
        <ScrollArea h={600} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table withBorder={true} verticalSpacing="sm" horizontalSpacing="sm" className={classes.table}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        {
                        columns.map((column)=>
                            <th>{column}</th>
                        )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data ? rows:emptyRows
                    }
                </tbody>
            </Table>
        </ScrollArea>
    )
}

export const SelectionTable = ({columns=[], data=[]}) =>{
    const [scrolled, setScrolled] = useState(false);
    const [selection, setSelection] = useState(['1']);
    const { classes, cx } = useStyles();
    const toggleRow = (id: string) =>
        setSelection((current) =>
        current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
    const toggleAll = () =>
        setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));
    const rows = data.map((row:Patient)=>{
        const keys = Object.keys(row)
        const selected = selection.includes(row.patient_id)
        return(
            <tr key={row.patient_id} className={cx({ [classes.rowSelected]: selected })}>
                {
                    
                }
                {
                    
                    keys.map((value, index)=>(
                        <td key={row[value]}>{row[value]}</td>
                    ))
                }
            </tr>
        
    )});
    const emptyRows = (
        <tr>
            {columns.map((column, index)=>(
                <td key={index}>Walang Laman</td>
        ))}

        </tr>
    );
    return (
        <ScrollArea h={600} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table withBorder={true} verticalSpacing="sm" horizontalSpacing="sm" className={classes.table}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        {
                        columns.map((column)=>
                            <th>{column}</th>
                        )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data ? rows:emptyRows
                    }
                </tbody>
            </Table>
        </ScrollArea>
    )
}