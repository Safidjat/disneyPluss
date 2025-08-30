import BlogView from "./BlogView"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useMatchMedia } from "../../hooks/use-match-media";
import { useAuth } from "../../context/AuthContext";
import { useScrollY } from "../../context/ScrollRestoreContext";
import PageLoadError from "./PageLoadError";
import { PulseLoader } from "react-spinners";
import Auth from "../../pages/Auth";
import LoadingVerify from "../LoadingVerify";
import { Button, Pagination } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { scrollToId } from "../../utilities/scroll";

function MoviesSeriesView({pageNumFromUrl,viewType,setViewType,setSearchParams,setViewData,show,setShow,data,pageError,pageLoading,type,selectedValue,setSelectedValue,filteredGenres}) {
    const isLessTnan320=useMatchMedia('(max-width: 320px)')
    const isLessTnan490=useMatchMedia('(max-width: 490px)')
    const isBetween600And920 =useMatchMedia('((min-width: 600px) and (max-width: 920px))')
    const{isLoading,isLoggedIn}=useAuth()
    const {setScrollYinfo}=useScrollY();
    const pageSize=20;
    const [currentPage,setCurrentPage]=useState(pageNumFromUrl ? +pageNumFromUrl : 1)
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            const blogElement = document.getElementById('blog');
            if (blogElement&&viewType!='restricted') {
                scrollToId(blogElement);
            }
        }
    }, [currentPage]); 

    const handleViewChoice=()=>{
        const newView=viewType=='restricted'?'unrestricted':'restricted'
        setSearchParams(prev => {
            const allParams = Object.fromEntries(prev.entries());
            return {
                ...allParams,   
                viewChoice:newView,
                page:1
            };
        });
        setViewType(newView)
        setCurrentPage(1)
    }

    return (
        isLoading?<LoadingVerify />:
        !isLoggedIn?<Auth />:
        pageError?<PageLoadError />:
        pageLoading? 
        <div className="w-full h-[calc(100vh-168px)] flex justify-center items-center">
            <PulseLoader color={"#fff"} size={10} className="customLoader"/>
        </div>:
        <div className="min-h-[609px] w-full max-[210px]:px-[16px] pt-[40px] p-[60px] flex flex-col gap-[50px]">
            <div className="flex flex-col gap-[15px] items-start min-[600px]:items-center min-[600px]:flex-row min-[600px]:justify-between min-[700px]:justify-start min-[700px]:gap-[30px]">
                <h1 className="text-[18px] min-[800px]:text-[25px] font-bold text-white">Select your favorite {type} category:</h1>
                <div className="relative w-[200px] max-[320px]:w-[120px] ">
                    {
                        !isLessTnan320 && !isBetween600And920 &&
                        <div className="min-[600px]:max-[700px]:right-[3px] pointer-events-none absolute top-[9px] max-[320px]:top-[4px] right-[11px] max-[320px]:right-[5px] flex items-center cursor-pointer">
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
                            setShow(setViewData(newValue,data));
                            setCurrentPage(1)
                            setSearchParams(prev => {
                                const allParams = Object.fromEntries(prev.entries());
                                return {
                                    ...allParams, 
                                    genreId: newValue,
                                    page:1
                                };
                            });                            
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
                <div className="flex items-center rounded-[50px] cursor-pointer  border border-[#767676] transition-all duration-[0.3s]">
                    <Button 
                    onClick={handleViewChoice}
                    sx={{
                        '@media (max-width: 320px)': {
                            paddingInline:'10px',  
                            paddingBlock:'5px'
                        },
                        '@media (max-width: 1000px)': {
                            fontSize:'11px',
                        },
                        paddingInline:'15px',
                        paddingBlock:'10px',
                        color:'white',
                        fontSize:'13px',
                        fontWeight:'400',
                        borderBottomLeftRadius:'50px',
                        borderTopLeftRadius:'50px',
                        textWrap:'nowrap',
                        backgroundColor:`${viewType==='restricted'?'#31333c':'#31333C0D'}`,
                    }}
                    variant="contained">View 20</Button>
                    <div className="self-stretch w-[1px] bg-[#767676]"></div>
                    <Button 
                    onClick={handleViewChoice}
                    sx={{
                        '@media (max-width: 320px)': {
                            paddingInline:'10px',  
                            paddingBlock:'5px'
                        },
                        '@media (max-width: 1000px)': {
                            fontSize:'11px',
                        },
                        paddingInline:'15px',
                        paddingBlock:'10px',
                        color:'white',
                        fontSize:'13px',
                        fontWeight:'400',
                        borderBottomRightRadius:'50px',
                        borderTopRightRadius:'50px',
                        textWrap:'nowrap',
                        backgroundColor:`${viewType==='unrestricted'?'#31333c':'#31333C0D'}`,
                    }}
                    variant="contained">View all</Button>
                </div>
            </div>                
            <BlogView blogData={viewType==='restricted'?show.slice(0,20):show.slice(currentPage*pageSize-pageSize,currentPage*pageSize)} setScrollYinfo={setScrollYinfo} />
            {
                viewType==='unrestricted'&&
                <Pagination 
                count={Math.ceil(show.length/pageSize)}
                page={currentPage}
                onChange={(_,pageNum)=>{
                    setCurrentPage(pageNum)
                    setSearchParams(prev => {
                        const allParams = Object.fromEntries(prev.entries());
                        return {
                            ...allParams,
                            page:pageNum
                        };
                    });                    
                }} 
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: '#f9f9f9', 
                    },
                    '@media (max-width: 490px)': {
                        '& .MuiPaginationItem-root': {
                            fontSize:'12px',
                        },
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#f9f9f9',
                    },

                }}
                size={isLessTnan490 ? "small" : "medium"} 
                className="m-auto"/>
            }
        </div>
    )
}

export default MoviesSeriesView
