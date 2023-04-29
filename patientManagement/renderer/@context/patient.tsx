import React,{ useReducer, createContext, useEffect} from "react";
import { PatientOverview, Patients } from "../schema/patient";
import { API_URL } from "../server";
import { getPatientOverview } from "../server/request";
import { notifications } from "@mantine/notifications";
import searchSortReducer, { SearchSortAction, SearchSortState } from "../components/reducer/SearchSort";
import { IconAlertCircle } from "@tabler/icons-react";

export interface IPatientContext {
    state: SearchSortState<PatientOverview>;
    dispatch: React.Dispatch<SearchSortAction<PatientOverview>>
    fetchPatients: () => void; // for easy reload, if they needed to reload the data
}
const initialData: SearchSortState<PatientOverview>= {
        data: [],
        filteredData: [],
        searchQuery: null,
        sortBy: "id",
        ascending: true,
        currentPage: 1,
        itemsPerPage: 3,
};

export const PatientsContext = createContext<IPatientContext>({
    state: initialData,
    dispatch: () => {},
    fetchPatients: () => {},
})

const reducer = searchSortReducer<PatientOverview>;

export const PatientsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialData);

    const fetchPatients = async () => {
        try{
            const res = await getPatientOverview();
            const data = await res.json();
            
            dispatch({ type: "LOAD", payload: {data:data} });
            
        }catch (e ){
            console.log(e)
            notifications.show({
                title: "Error",
                message: "Failed to fetch patients",
                color: "red",
                icon: <IconAlertCircle />,
            })
        }
    }
    
    useEffect(()=>{
        fetchPatients();
    },[])
    return (
        <PatientsContext.Provider value={{ state, dispatch, fetchPatients }}>
            {children}
        </PatientsContext.Provider>
    )
}