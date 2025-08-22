import { useEffect, useLayoutEffect, useState } from "react";
import MoviesSeriesView from "../../components/main/MoviesSeriesView"
import { genres } from "../../services/componentsData";
import { useScrollY } from "../../context/ScrollRestoreContext";
import { getAllMovies } from "../../services";
import { selectRandom20 } from "../../utilities/selectRandom20";

function MoviesPage() {
    const [pageLoading,setPageLoading]=useState(true);
    const [pageError,setPageError]=useState(false);
    const [data,setData]=useState([]);
    const [random20,setRandom20]=useState([]);
    const {handleScrollY}=useScrollY();
    const filteredGenres=genres
                        .filter(item=>item.type.includes('movie'))
                        .sort((a, b) => a.name.localeCompare(b.name, 'en'))
    const [selectedValue,setSelectedValue]=useState(filteredGenres[0]?.num)
    const setViewData=(selVal,arr)=>{
        if(arr.length) return selectRandom20(arr.filter(item=>item.genres.find(genre=>genre.id===selVal)))
    };

    useEffect(()=>{
        getAllMovies()
        .then(res=>{
            if(res?.length>0){
                setData(res);
                setRandom20(setViewData(selectedValue,res))
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
        <MoviesSeriesView {...{setViewData,random20,setRandom20,pageError, pageLoading, type:'movie', selectedValue, setSelectedValue, data, filteredGenres }}/>
    )
}

export default MoviesPage
