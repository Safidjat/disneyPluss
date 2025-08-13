import { useEffect, useState } from "react"

export const useMatchMedia=(query)=>{
    const [matches,setMatches]=useState(window.matchMedia(query).matches);

    useEffect(()=>{
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const handler=(e)=>setMatches(e.matches);
        mediaQuery.addEventListener("change",handler);

        return ()=>mediaQuery.removeEventListener("change",handler);
    },[query])

    return matches
}