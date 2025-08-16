import { createContext, useContext, useEffect, useState } from "react"

const WishList=createContext(null)

function WishlistContext({children}) {
    const [wishBasket,setwishBasket]=useState(JSON.parse(localStorage.getItem('wishBasket')) || [])

    useEffect(()=>{
        localStorage.setItem('wishBasket',JSON.stringify(wishBasket))
    },[wishBasket])

    function removeFromWishes(iD){
        setwishBasket(prev=> prev.filter(item=>item.id!=iD))
    }
    function clearWishes(){
        setwishBasket([])
    }
    function addToWishes(id,poster_path){
        setwishBasket([{id,poster_path},...wishBasket])
    }

    return (

        <WishList.Provider value={{wishBasket,setwishBasket,removeFromWishes,clearWishes,addToWishes}}>
            {children}
        </WishList.Provider>
        
    )
}

export default WishlistContext
export const useWishList=()=>useContext(WishList)
