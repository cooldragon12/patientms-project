import React, { useReducer, useEffect } from "react";
import {
    Group,
    Stack,
    Text,
   } from "@mantine/core";
import { LinkedSelectionTable } from "../../list";
import searchSortReducer, { SearchSortState } from "../../reducer/SearchSort";
import { TreatmentRecordOverview } from "../../../schema/treatment";
import { IconAlertCircle } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { PopUpTable } from "../../list/popup_table";
import TreatmentDetail from "../Treatment/TreatmentDetail";
const initialData: SearchSortState<TreatmentRecordOverview>= {
    data: [],
    filteredData: [],
    searchQuery: null,
    sortBy:"id",
    ascending: true,
    currentPage: 1,
    itemsPerPage: 3,
  };
const treatmentReducer = searchSortReducer<TreatmentRecordOverview>;

const TreatmentHistoryCard = ({link}:{link:string}) => {
    const [selection, setSelection] = React.useState<string[]>([]);
    const [state, dispatch ] = useReducer(treatmentReducer, initialData);
    const sorthandler = (id:keyof TreatmentRecordOverview) => {
        dispatch({ type: "SORT", payload: { key:id } });
    }
    const dataHandler = async ()=>{
        try{
            const res = await fetch(link);
            const data = await res.json();
            dispatch({ type: "LOAD", payload: {data:data} });
        }catch (e ){
            console.log(e)
            notifications.show({
                title: "Error",
                message: "Failed to fetch Patient Treatment History",
                color: "red",
                icon: <IconAlertCircle/>,
            })
        }
    }
    useEffect(()=>{
        dataHandler();
    },[])
    return (
        <>
        <Stack spacing={"sm"}>
            <Group>
                <Text weight="bolder" variant={"text"} size={"xl"}>
                Treatment History
                </Text>
            </Group>
            <PopUpTable
                
                setSelection={setSelection}
                selection={selection}
                empty_message="No Treatment Record yet!!"
                data={state.filteredData}
                columns={[{label:"ID", value:"id"}, {label:"Tooth No.", value:"tooth_no"}, {label:"Procedure", value:"procedure"}, {label:"Date", value:"date"}, {label:"Balance", value:"balance"}]}
                sortHandler={sorthandler}
                ascending={state.ascending}
                sortBy={state.sortBy}
                Content={TreatmentDetail}
            />
        </Stack>
      </>
    )
}

export default TreatmentHistoryCard;