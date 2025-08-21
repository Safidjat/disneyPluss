import BlogView from "./BlogView"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useMatchMedia } from "../../hooks/use-match-media";
import { selectRandom20 } from "../../utilities/selectRandom20";
import { useAuth } from "../../context/AuthContext";
import { useScrollY } from "../../context/ScrollRestoreContext";
import PageLoadError from "./PageLoadError";
import { PulseLoader } from "react-spinners";
import Auth from "../../pages/Auth";
import LoadingVerify from "../LoadingVerify";
import { useEffect, useState } from "react";

function MoviesSeriesView({pageError,pageLoading,type,selectedValue,setSelectedValue,data,filteredGenres}) {
    const isLessTnan320=useMatchMedia('(max-width: 320px)')
    const{isLoading,isLoggedIn}=useAuth()
    const {setScrollYinfo}=useScrollY();
    const setViewData=(selVal)=>{
        if(data.length) return selectRandom20(data.filter(item=>item.genres.find(genre=>genre.id===selVal)))
    };
    const [random20,setRandom20]=useState([]);

    useEffect(()=>{
        setRandom20(setViewData(selectedValue))
    },[data])

    
    console.log(selectedValue,data.filter(item=>item.genres.find(genre=>genre.id===28)))


    return (
        isLoading?<LoadingVerify />:
        !isLoggedIn?<Auth />:
        pageError?<PageLoadError />:
        <div className="min-h-[567.6px] w-full max-[210px]:px-[16px] pt-[40px] p-[60px] flex flex-col gap-[50px]">
            <div className="flex flex-col gap-[15px] items-start min-[600px]:items-center min-[600px]:flex-row min-[600px]:justify-between min-[700px]:justify-start min-[700px]:gap-[30px]">
                <h1 className="text-[18px] min-[800px]:text-[25px] font-bold text-white">Select your favorite {type} category:</h1>
                <div className="relative w-[200px] max-[320px]:w-[120px] ">
                    {
                        !isLessTnan320&&
                        <div className="absolute top-[9px] max-[320px]:top-[4px] right-[11px] max-[320px]:right-[5px] flex items-center cursor-pointer">
                            <div className="h-[18px] w-[1px] bg-[#f9f9f9]"></div>
                            <ArrowDropDownIcon fontSize="medium" sx={{color:'#808080'}} />
                        </div>
                    }
                    <select 
                    value={selectedValue} 
                    onChange={
                        (e)=>{
                            const newValue = +e.target.value; 
                            setSelectedValue(newValue);      
                            setRandom20(setViewData(newValue));
                        }
                    } 
                    id="typeSelect" className="size-full truncate py-[10px] px-[20px] max-[320px]:px-[10px] max-[320px]:py-[5px] rounded-[50px] group cursor-pointer [text-align-last:center] text-[13px] font-[400] bg-[#31333c] hover:bg-[#31333C0D] border border-[#767676] text-white transition-all duration-[0.3s] appearance-none outline-none ">
                        {
                            filteredGenres
                            .map(item=>(
                                <option key={item.id} value={item.num} className="group-hover:bg-[#98999d] bg-[#31333c]">{item.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            {
                pageLoading? 
                <div className="w-full h-[calc(100vh-168px)] flex justify-center items-center">
                    <PulseLoader color={"#fff"} size={10} className="customLoader"/>
                </div>:
                <BlogView blogData={random20} setScrollYinfo={setScrollYinfo} />
            }
        </div>
    )
}

export default MoviesSeriesView
