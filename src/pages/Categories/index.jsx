import { Link, useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useEffect, useLayoutEffect, useState } from "react";
import LoadingVerify from "../../components/LoadingVerify";
import { PulseLoader } from "react-spinners";
import PageLoadError from "../../components/main/PageLoadError";
import { getMainCategories } from "../../services";
import Auth from "../Auth";
import { useScrollY } from "../../context/ScrollRestoreContext";
import BlogView from "../../components/main/BlogView";

function Categories() {
    const{isLoading,isLoggedIn}=useAuth()
    const [categoryData,setCategoryData]=useState({});
    const [pageLoading,setPageLoading]=useState(true);
    const [pageError,setPageError]=useState(false);
    const {id}=useParams();
    const {handleScrollY,setScrollYinfo}=useScrollY();
    
    useEffect(()=>{
        getMainCategories(id)
        .then(res=>{
            if(Object.keys(res).length){
            setCategoryData(res);
            setPageError(false);
            }else setPageError(true);
            setPageLoading(false);
        })
    },[id])

    // useEffect(()=>{
    //     setTimeout(() => {
    //         handleScrollY();
    //     }, 1000); 
    // },[categoryData])

    useLayoutEffect(()=>{
        if (categoryData?.data?.length) {
            handleScrollY();
        }
    }, [categoryData]);

    return (
        !isLoggedIn?<Auth />:
        isLoading?<LoadingVerify />:
        pageLoading? 
        <div className="w-full h-[calc(100vh-168px)] flex justify-center items-center">
            <PulseLoader color={"#fff"} size={10} className="customLoader"/>
        </div>:
        pageError?<PageLoadError />:
        <div className="w-full max-[210px]:px-[16px] p-[60px] flex flex-col gap-[30px]">
            <h1 className="text-[18px] min-[800px]:text-[25px] font-bold text-white">{categoryData?.title}</h1>
            <BlogView blogData={categoryData?.data} setScrollYinfo={setScrollYinfo}/>
        </div>
    )
}

export default Categories
