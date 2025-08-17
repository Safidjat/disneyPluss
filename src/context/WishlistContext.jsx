import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext";

const WishList=createContext(null)

function WishlistContext({children}) {
    const{userName,isLoggedIn}=useAuth();
    const [wishBasket,setwishBasket]=useState({user:null,basket:[]});

    useEffect(()=>{
        if(isLoggedIn){
            setwishBasket(JSON.parse(localStorage.getItem(`wishBasket_${userName}`)) || {user:userName,basket:[]})
        }
    },[userName])

    useEffect(()=>{
        localStorage.setItem(`wishBasket_${userName}`,JSON.stringify(wishBasket))
    },[wishBasket])

    function removeFromWishes(iD){
        setwishBasket(prev=> {
            const newBasket=prev.basket.filter(item=>item.id!=iD);
            return {
                ...prev,
                basket:newBasket
            }
        })
    }
    function clearWishes(){
        setwishBasket({
            user:userName,
            basket:[]
        })
    }
    function addToWishes(id,poster_path){
        setwishBasket({
            user:userName,
            basket:[{id,poster_path},...wishBasket.basket]
        })
    }

    return (

        <WishList.Provider value={{wishBasket,setwishBasket,removeFromWishes,clearWishes,addToWishes}}>
            {children}
        </WishList.Provider>
        
    )
}

export default WishlistContext
export const useWishList=()=>useContext(WishList)
