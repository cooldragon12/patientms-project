import Head from "next/head"
import Image from "next/image";

// import {ReactComponent as loader} from '/public/images/GPQ_Clinic_Anim.svg';
export default function LoaderPage (){
    return (
    <>
      <Head><title>GPQ Clinic | Loading...</title></Head>
      <div style={{zIndex:8,width:"100%",height:"100%", position:"fixed",display:"flex",justifyContent:"center",alignItems:"center", top:0, left:0}}>
        <div style={{userSelect:"none",width:"50vw",height:"25vh",position:"relative",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <object type="image/svg+xml" data="/images/GPQ_Clinic_Anim.svg">svg-GPQ</object>
        </div>
      </div>
    </>
    )
}