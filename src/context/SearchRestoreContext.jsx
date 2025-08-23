import { createContext, useContext, useState } from "react"

const SearchRestore=createContext(null)

function SearchRestoreContext({children}) {
    const [storage,setStorage]=useState({
        searchText:'',
        frozenRandomView:[]
    })
    const [isFromDetail,setIsFromDetail]=useState(false)

    return (
        <SearchRestore.Provider 
        value={{
            storage,setStorage,
            isFromDetail,setIsFromDetail
        }}>
            {children}
        </SearchRestore.Provider>
    )
}

export default SearchRestoreContext
export const useSearchCriteries=()=>useContext(SearchRestore)


