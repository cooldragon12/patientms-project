


const defaultContext:RequestInit = {
    mode:"cors",
    cache:"no-cache",
    headers:{"":""},
}

export  const POST  = async (url:string, data)=>{
    const context:RequestInit = {
        method:"POST",
        body:data,
        ...defaultContext
    }

    const  response = await fetch(url, context)

    return response;
}
export const GET =  async (url:string, data:any = null )=>{
    const context:RequestInit = {
        method:"GET",
        body:data,
        ...defaultContext
    }

    const  response = await fetch(url, context)

    return response;
}

export const PATCH = async (url:string, data)=>{
    const context:RequestInit = {
        method:"PATCH",
        body:data,
        ...defaultContext
    }

    const  response = await fetch(url, context)

    return response;
}

export const PUT = async (url:string, data)=>{
    const context:RequestInit = {
        method:"PUT",
        body:data,
        ...defaultContext
    }

    const  response = await fetch(url, context)

    return response;
}

export const DELETE= async (url:string, data)=>{
    const context:RequestInit = {
        method:"DELETE",
        body:data,
        ...defaultContext
    }

    const  response = await fetch(url, context)

    return response;
}