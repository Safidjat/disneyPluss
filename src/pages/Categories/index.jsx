import { Link, useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useEffect, useLayoutEffect, useState } from "react";
import LoadingVerify from "../../components/LoadingVerify";
import { PulseLoader } from "react-spinners";
import PageLoadError from "../../components/main/PageLoadError";
import { getMainCategories } from "../../services";
import { imgUrl } from "../../services/componentsData";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Auth from "../Auth";
import { useScrollY } from "../../context/ScrollRestoreContext";

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
        isLoading?<LoadingVerify />:
        !isLoggedIn?<Auth />:
        pageLoading? 
        <div className="w-full h-[calc(100vh-168px)] flex justify-center items-center">
            <PulseLoader color={"#fff"} size={10} className="customLoader"/>
        </div>:
        pageError?<PageLoadError />:
        <div className="w-full max-[210px]:px-[16px] p-[60px] flex flex-col gap-[30px]">
            <h1 className="text-[18px] min-[800px]:text-[25px] font-bold text-white">{categoryData?.title}</h1>
            <div className="flex flex-wrap w-full gap-[16px]">
                {
                    categoryData?.data.map(item=>(
                        <Link key={item.id} to={'/detail/' + item.id} onClick={()=>setScrollYinfo(parseFloat(window.scrollY.toFixed(2)))} className="aspect-[2/3] overflow-hidden shadow-formShadow rounded-[10px] border-[3px] border-transparent hover:border-[#fbfbfb] ease-in-out transition-all duration-[0.3s] w-full min-[600px]:w-[calc((100%-32px)/3)] min-[900px]:w-[calc((100%-48px)/4)] min-[1200px]:w-[calc((100%-80px)/6)]">
                            <LazyLoadImage
                                width="100%"
                                height="100%"
                                src={imgUrl+item?.poster_path}
                                className="size-full object-cover"
                                effect="blur"
                            />
                            {/* <img className="size-full object-cover" src={imgUrl+item?.poster_path} alt={item?.original_name} /> */}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
