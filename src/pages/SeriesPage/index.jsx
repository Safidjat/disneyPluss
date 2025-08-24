import { useEffect, useLayoutEffect, useState } from "react";
import MoviesSeriesView from "../../components/main/MoviesSeriesView"
import { useScrollY } from "../../context/ScrollRestoreContext";
import { genres } from "../../services/componentsData";
import { getAllSeries } from "../../services";
import { useSearchParams } from "react-router-dom";

function SeriesPage() {
    const [pageLoading,setPageLoading]=useState(true);
    const [pageError,setPageError]=useState(false);
    const [data,setData]=useState([]);
    const [only20,setOnly20]=useState([]);
    const {handleScrollY}=useScrollY();
    const [searchParams, setSearchParams] = useSearchParams();
    const genreIdFromUrl = searchParams.get('genreId');
    const filteredGenres=genres
                        .filter(item=>item.type.includes('series'))
                        .sort((a, b) => a.name.localeCompare(b.name, 'en'))
    const [selectedValue,setSelectedValue]=useState(genreIdFromUrl ? +genreIdFromUrl : filteredGenres[0]?.num)
    const setViewData=(selVal,arr)=>{
        if(arr.length) return arr.filter(item=>item.genres.find(genre=>genre.id===selVal)).slice(0,20)
    };


    useEffect(()=>{
        getAllSeries()
        .then(res=>{
            if(res?.length>0){
                setData(res);
                setOnly20(setViewData(selectedValue,res))
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
        <MoviesSeriesView {...{setSearchParams,setViewData,only20,setOnly20,pageError, pageLoading, type:'series', selectedValue, setSelectedValue, data, filteredGenres }}/>
    )
}

export default SeriesPage
