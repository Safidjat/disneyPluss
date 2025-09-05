import { createContext, useContext, useState } from "react"
import { scrollTo } from "../utilities/scroll";

const ScrollRestore=createContext(null)

function ScrollRestoreContext({children}) {
    const [mayScroll,setMayScroll]=useState(null);
    const [scrollYinfo,setScrollYinfo]=useState(null);

    function handleScrollY(){
        if(mayScroll){
            scrollTo(scrollYinfo)
            setMayScroll(null)
            setScrollYinfo(null)
        }
    }

    return (
        <ScrollRestore.Provider 
        value={{
            mayScroll,setMayScroll,scrollYinfo,
            setScrollYinfo,handleScrollY
        }}>
            {children}
        </ScrollRestore.Provider>
    )
}

export default ScrollRestoreContext
export const useScrollY=()=>useContext(ScrollRestore)


