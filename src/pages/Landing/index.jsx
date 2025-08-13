import { useEffect } from "react";
import { getMainSliders } from "../../services";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import LoadingVerify from "../../components/LoadingVerify";
import { PulseLoader } from "react-spinners";
import PageLoadError from "../../components/main/PageLoadError";
import LandingView from "../../components/main/LandingView";

function Landing() {
  const [sliders,setSliders]=useState([]);
  const [pageLoading,setPageLoading]=useState(true);
  const [pageError,setPageError]=useState(false);
  const{isLoading}=useAuth() 

  useEffect(()=>{
    getMainSliders()
    .then(res=>{
      if(res?.length>0){
        setSliders(res);
        setPageError(false);
      }else setPageError(true);
      setPageLoading(false);
    })
  },[])

  return (
    isLoading?<LoadingVerify />:
    pageLoading? 
    <div className="w-full h-[calc(100vh-168px)] flex justify-center items-center">
        <PulseLoader color={"#fff"} size={10} className="customLoader"/>
    </div>:
    pageError?<PageLoadError />:
    <LandingView sliders={sliders}/>
  )
}


export default Landing
