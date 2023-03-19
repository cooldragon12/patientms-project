import React, {useState, useEffect} from 'react';
import { Table, ScrollArea, createStyles, Checkbox, Button, UnstyledButton, Group, Skeleton } from '@mantine/core';
import { Patient } from '../../schema/patient';
/**
 * Styles for the table
 */
export const useStyles = createStyles((theme) => ({
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
                    color:theme.colors.mint_green[4],

                    cursor:"pointer"
                },
                transitionProperty: "background-color,color",
                transitionDuration:"100ms",
                transitionTimingFunction:"ease-in",
            },
            "td":{
                "a":{
                    color:theme.colors.mint_green[9],
                    transitionProperty: "background-color,color",
                    transitionDuration:"100ms",
                    transitionTimingFunction:"ease-in",
                    ":hover":{
                        color:theme.colors.mint_green[4],
                    }
                }
            }
    }
    },
    scrolled: {
        boxShadow: theme.shadows.sm,
    },

    rowSelected:{
        // backgroundColor:theme.colors.mint_green[0],
        backgroundColor: theme.colors.gray[1],
        ":hover":{

            color:theme.colors.mint_green[8],
        }
    },
    
    sideButtonCheck:{
        fontSize: "11px",
        backgroundColor: theme.colors.mint_green[8],
        color:theme.colors.mint_green[0],
        padding: "0.2rem 0.5rem",
        borderRadius: "0.2rem",
        transitionProperty: "background-color,color",
        transitionDuration:"50ms",
        transitionTimingFunction:"ease-in",
        ":hover":{
            backgroundColor: theme.colors.mint_green[5],
            // color:theme.colors.mint_green[9],
            // cursor:"pointer"
        },
        margin:0,
    },
    emptyState:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        // fontSize:theme.fontSizes.xl,
        color:theme.colors.gray[6],
        height:"100%",
        width:"100%",
        // fontWeight:theme.fontWeights.semibold
    }
}));
// Regular Table Component
export const RegularTable = ({columns=[], data=[], empty_message=""}) =>{
    const [scrolled, setScrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const { classes, cx } = useStyles();
    const rows = data.map((row)=>{
        const keys = Object.keys(row)
        return(
            <tr key={"row-"+row.patient_id}>
                {
                    keys.map((value, index)=>{if (index < columns.length)
                    return (
                        <td key={row[value]}>{row[value]}</td>
                    )})
                }
            </tr>
        
    )});
    const rows_skelelon = columns.map((row, index)=>{

        return (<tr key={row}>
            {
                columns.map((column, index)=><td key={row+""+column}><Skeleton  height={8} mt={7} radius="xl"/></td>)
            }
            </tr>)})
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
                            <th key={column + "-" + index}>{column}</th>
                        )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data && !loading ? rows:rows_skelelon
                    }
                </tbody>
            </Table>
            {
                data.length === 0 && !loading? <div className={classes.emptyState}><h2>{empty_message}</h2></div>:<></>
            }
        </ScrollArea>
    )
}
