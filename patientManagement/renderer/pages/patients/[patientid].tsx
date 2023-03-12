import { useRouter } from "next/router"
const PatientProfile = ()=>{
    const router = useRouter();
    const {patientid} = router.query
    
    return (
        <>
        Patient {patientid}
        </>
    )
}

export default PatientProfile;