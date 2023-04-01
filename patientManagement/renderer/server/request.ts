
import { API_URL } from "./";

const defaultContext:RequestInit = {
    mode:"cors",
    cache:"no-cache",
    headers:{"":""},
}

export const getClinicHistory = async () =>{
    const response = await fetch(`${API_URL}/api/clinic-history/`,defaultContext);
    return response
}

export const getPatientOverview = async () => {
    const response = await fetch(`${API_URL}/api/patients/overview/`,defaultContext);
    return response
}

export const getPatientDetail = async (link?:string) => {
    const response = await fetch(link,defaultContext);
    return response
}

export const postPatient = async (link?:string,data?:any) => {
    const response = await fetch(link,{method:"POST",body:data,...defaultContext});
    return response
}
export const putPatient = async (link?:string,data?:any) => {
    const response = await fetch(link,{method:"PUT",body:data,...defaultContext});
    return response
}
export const patchPatient = async (link?:string,data?:any) => {
    const response = await fetch(link,{method:"PATCH",body:data,...defaultContext});
    return response
}
export const deletePatient = async (id?:string) => {
    const response = await fetch(`${API_URL}/api/patients/${id}/`,{method:"DESTROY",...defaultContext});
    return response
}
export const getTreatments = async (id:string) => {
    const response = await fetch(`${API_URL}/api/patients/${id}/treatments/`,defaultContext);
    return response
}

export const postTreatment = async (link?:string,data?:any) => {
    const response = await fetch(link,{method:"POST",body:data,...defaultContext});
    return response
}
export const putTreatment = async (link?:string,data?:any) => {
    const response = await fetch(link,{method:"PUT",body:data,...defaultContext});
    return response
}

export const patchTreatment = async (link?:string,data?:any) => {
    const response = await fetch(link,{method:"PATCH",body:data,...defaultContext});
    return response
}

