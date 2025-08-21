import { useEffect, useLayoutEffect, useState } from "react";
import MoviesSeriesView from "../../components/main/MoviesSeriesView"
import { genres } from "../../services/componentsData";
import { useScrollY } from "../../context/ScrollRestoreContext";
import { getAllMovies } from "../../services";

function MoviesPage() {
    const [pageLoading,setPageLoading]=useState(true);
    const [pageError,setPageError]=useState(false);
    
    const [data,setData]=useState([]);
    const {handleScrollY}=useScrollY();
    const filteredGenres=genres
                        .filter(item=>item.type.includes('movie'))
                        .sort((a, b) => a.name.localeCompare(b.name, 'en'))
    const [selectedValue,setSelectedValue]=useState(filteredGenres[0]?.num)
    

    useEffect(()=>{
        getAllMovies()
        .then(res=>{
            if(res?.length>0){
                setData(res);
                setPageError(false);
            }else setPageError(true);
            setPageLoading(false);
        })
    },[])

    useLayoutEffect(()=>{
        if (data?.length) {
            handleScrollY();
        }
    }, [data]);

    return (
        <MoviesSeriesView {...{pageError, pageLoading, type:'movie', selectedValue, setSelectedValue, data, filteredGenres }}/>
    )
}

export default MoviesPage
