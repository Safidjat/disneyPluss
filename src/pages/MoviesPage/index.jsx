import { useEffect, useLayoutEffect, useState } from "react";
import MoviesSeriesView from "../../components/main/MoviesSeriesView"
import { genres } from "../../services/componentsData";
import { useScrollY } from "../../context/ScrollRestoreContext";
import { getAllMovies } from "../../services";
import { useSearchParams } from "react-router-dom";

function MoviesPage() {
    const [pageLoading,setPageLoading]=useState(true);
    const [pageError,setPageError]=useState(false);
    const [data,setData]=useState([]);
    const [show,setShow]=useState([]);
    const {handleScrollY}=useScrollY();
    const [searchParams, setSearchParams] = useSearchParams();
    const genreIdFromUrl = searchParams.get('genreId');
    const pageNumFromUrl = searchParams.get('page');
    const viewChoice=searchParams.get('viewChoice');
    const filteredGenres=genres
                        .filter(item=>item.type.includes('movie'))
                        .sort((a, b) => a.name.localeCompare(b.name, 'en'))
    const [selectedValue,setSelectedValue]=useState( genreIdFromUrl ? +genreIdFromUrl : filteredGenres[0]?.num)
    const setViewData=(selVal,arr)=>{
        if(arr.length) return arr.filter(item=>item.genres.find(genre=>genre.id===selVal))
    };
    const [viewType,setViewType]=useState(viewChoice ? viewChoice : 'restricted');


    useEffect(()=>{
        getAllMovies()
        .then(res=>{
            if(res?.length>0){
                setData(res);
                setShow(setViewData(selectedValue,res))
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
        <MoviesSeriesView {...{pageNumFromUrl,viewType,setViewType,setSearchParams,setViewData,show,setShow,pageError, pageLoading, type:'movie', selectedValue, setSelectedValue, data, filteredGenres }}/>
    )
}

export default MoviesPage
