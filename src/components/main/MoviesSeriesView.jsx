import BlogView from "./BlogView"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useMatchMedia } from "../../hooks/use-match-media";
import { useAuth } from "../../context/AuthContext";
import { useScrollY } from "../../context/ScrollRestoreContext";
import PageLoadError from "./PageLoadError";
import { PulseLoader } from "react-spinners";
import Auth from "../../pages/Auth";
import LoadingVerify from "../LoadingVerify";

function MoviesSeriesView({setSearchParams,setViewData,only20,setOnly20,data,pageError,pageLoading,type,selectedValue,setSelectedValue,filteredGenres}) {
    const isLessTnan320=useMatchMedia('(max-width: 320px)')
    const{isLoading,isLoggedIn}=useAuth()
    const {setScrollYinfo}=useScrollY();


    return (
        isLoading?<LoadingVerify />:
        !isLoggedIn?<Auth />:
        pageError?<PageLoadError />:
        pageLoading? 
        <div className="w-full h-[calc(100vh-168px)] flex justify-center items-center">
            <PulseLoader color={"#fff"} size={10} className="customLoader"/>
        </div>:
        <div className="w-full max-[210px]:px-[16px] pt-[40px] p-[60px] flex flex-col gap-[50px]">
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
                            setOnly20(setViewData(newValue,data));
                            setSearchParams({ genreId: newValue });
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
            <BlogView blogData={only20} setScrollYinfo={setScrollYinfo} />
        </div>
    )
}

export default MoviesSeriesView
