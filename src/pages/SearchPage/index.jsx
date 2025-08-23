import SearchIcon from '@mui/icons-material/Search';
import { useScrollY } from '../../context/ScrollRestoreContext';
import { useEffect, useLayoutEffect, useState } from 'react';
import LoadingVerify from '../../components/LoadingVerify';
import Auth from '../Auth';
import { PulseLoader } from 'react-spinners';
import PageLoadError from '../../components/main/PageLoadError';
import { getAllDetails } from '../../services';
import { useAuth } from '../../context/AuthContext';
import BlogView from '../../components/main/BlogView';
import { selectRandom20 } from '../../utilities/selectRandom20';
import { useSearchCriteries } from '../../context/SearchRestoreContext';

function SearchPage() {
    const{storage,isFromDetail,setIsFromDetail}=useSearchCriteries() 
    const{isLoading,isLoggedIn}=useAuth()
    const {handleScrollY,setScrollYinfo}=useScrollY();
    const [pageLoading,setPageLoading]=useState(true);
    const [pageError,setPageError]=useState(false);
    const [allData,setAllData]=useState([]);
    const [random20,setRandom20]=useState([]);
    const [search,setSearch]=useState(isFromDetail?storage.searchText:'');
    
    useEffect(()=>{
        getAllDetails()
        .then(res=>{
            if(res?.length>0){
                setAllData(res);
                setRandom20(selectRandom20(res));
                setPageError(false);
            }else setPageError(true);
            setPageLoading(false);
        })
        return ()=>{
                setIsFromDetail(false);
        }
    },[]) 

    useLayoutEffect(()=>{
        if (allData?.length) {
            handleScrollY();
        }
    }, [allData]);

    
    function axtar(){
        const newData= allData.filter(item=>{
            if(item?.original_title) return item?.original_title?.toLowerCase().includes(search.trim().toLowerCase())
            else if(item?.title) return item?.title?.toLowerCase().includes(search.trim().toLowerCase())
            else return item?.name?.toLowerCase().includes(search.trim().toLowerCase())
        })
        if(isFromDetail) {
            // const result=[];
            // storage.frozenRandomView.forEach(iD=>{
            //     result.push(allData.find(item=>item.id==iD))
            // })
            
            // return result            
            return storage.frozenRandomView
        }
        else if(search.trim()=='') return random20
        else return selectRandom20(newData)
    }

    return (
        isLoading?<LoadingVerify />:
        !isLoggedIn?<Auth />:
        pageLoading? 
        <div className="w-full h-[calc(100vh-168px)] flex justify-center items-center">
            <PulseLoader color={"#fff"} size={10} className="customLoader"/>
        </div>:
        pageError?<PageLoadError />:
        <div className="min-h-[567.6px]">
            <div className="w-full grid place-items-center py-[20px] min-[700px]:py-[40px] min-[1200px]:py-[60px]">
                <div className="bg-[#4b4e5a] rounded-[8px] flex items-center gap-[10px] w-[85%] min-[700px]:w-[90%] min-[1200px]:w-[95%] p-[10px] min-[700px]:p-[15px] min-[1200px]:p-[20px]" >
                    <SearchIcon fontSize='medium' sx={{color:'white'}} />
                    <input 
                    type="text" 
                    value={search}
                    onInput={e => {setSearch(e.target.value);setIsFromDetail(false);}}
                    className="outline-none w-full h-[32px] min-[700px]:h-[35px] min-[1200px]:h-[38px] bg-[#4b4e5a] placeholder:text-[#97989f] text-white text-[16px] font-[500] min-[700px]:text-[18px] min-[1200px]:text-[20px]"
                    placeholder="Search for movies or series..."
                    />
                </div>
            </div>
            <div className="w-full max-[210px]:px-[16px] p-[60px] pt-[30px] flex flex-col gap-[30px]">
                <h1 className="text-[18px] min-[800px]:text-[25px] font-bold text-white">{search.trim()=='' ? 'Explore' : `Search results for ${search}`}</h1>
                <div>
                    {
                        !axtar().length>0
                        ?
                        <h3 className='text-center w-full pt-[20px] text-[14px] font-[500] text-white'>No movie or series containing your search term was found.</h3>
                        :
                        <BlogView blogData={axtar()} setScrollYinfo={setScrollYinfo} search={search} />
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchPage
