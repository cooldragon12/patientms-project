import { API_URL } from "./";

export const defaultContext:RequestInit = {
    mode:"cors",
    credentials: "include",
    cache:"no-cache",
    headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "Access-Control-Allow-Origin": 'https://cooldragon12-ubiquitous-space-eureka-g57r6wgj4p5fpwg9-8000.preview.app.github.dev'
    },
    
}

export const getClinicHistory = async () =>{
    const response = await fetch(API_URL+`/clinic-history/`,defaultContext);
    return response
}
export const getThroughLink = async (link?:string) =>{
    const response = await fetch(link,defaultContext);
    return response
}

export const getPatientOverview = async () => {
    try{
        const response = await fetch(`${API_URL}/patients/overview`,defaultContext);
        return response
    }catch (e){
        throw e
    }
}

export const getPatientDetail = async (id?:string) => {
    const response = await fetch(`${API_URL}/patients/${id}`,defaultContext);
    return response
}

export const postPatient = async (link?:string,data?:{}) => {
    const response = await fetch(link,{method:"POST",body:JSON.stringify(data),...defaultContext});
    return response
}

export const putPatient = async (link?:string,data?:any) => {
    const response = await fetch(link,{method:"PUT",body:JSON.stringify(data),...defaultContext});
    return response
}
export const patchPatient = async (link?:string,data?:any) => {
    const response = await fetch(link,{method:"PATCH",body:JSON.stringify(data),...defaultContext});
    return response
}

export const deletePatient = async (id?:string) => {
    const response = await fetch(API_URL+`/patients/${id}/`,{method:"DESTROY",...defaultContext});
    return response
}

export const getTreatments = async (id:string) => {
    const response = await fetch(API_URL+`/patients/${id}/treatments/`,defaultContext);
    return response
}

export const postTreatment = async (link?:string,data?:any) => {
    const response = await fetch(link,{method:"POST",body:JSON.stringify(data),...defaultContext});
    return response
}
export const putTreatment = async (link?:string,data?:any) => {
    const response = await fetch(link,{method:"PUT",body:JSON.stringify(data),...defaultContext});
    return response
}

export const patchTreatment = async (link?:string,data?:any) => {
    const response = await fetch(link,{method:"PATCH",body:JSON.stringify(data),...defaultContext});
    return response
}

