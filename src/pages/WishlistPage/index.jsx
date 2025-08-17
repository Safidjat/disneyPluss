import { useEffect, useLayoutEffect } from "react";
import BlogView from "../../components/main/BlogView"
import { useAuth } from "../../context/AuthContext";
import Auth from "../Auth";
import LoadingVerify from "../../components/LoadingVerify";
import { useWishList } from "../../context/WishlistContext";
import { useScrollY } from "../../context/ScrollRestoreContext";
import { scrollTo } from "../../utilities/scroll";

function WishlistPage() {
    const{isLoading,isLoggedIn}=useAuth();
    const {wishBasket}=useWishList();
    const {handleScrollY,setScrollYinfo}=useScrollY();

    

    useLayoutEffect(() => {
        scrollTo(0, false);
    }, []); 

    useEffect(() => {
        if (wishBasket.basket.length > 0) {
            handleScrollY(); 
        }
    }, [wishBasket]);


    return (
        !isLoggedIn?<Auth />:
        isLoading?<LoadingVerify />:
        <div className="w-full max-[210px]:px-[16px] p-[60px] flex flex-col gap-[30px]">
            <h1 className="text-[18px] min-[800px]:text-[25px] font-bold text-white">My List</h1>
            <div className="min-h-[609.600px]">
                {
                    wishBasket.basket.length
                    ?
                    <BlogView blogData={wishBasket.basket} setScrollYinfo={setScrollYinfo}/>
                    :
                    <h1 className="text-white font-[400] text-[14px] min-[600px]:text-[18px] min-[1000px]:text-[20px]">Your watch list is empty. Why don't you add something in here? 💫</h1>
                }
            </div>
        </div>
    )
}

export default WishlistPage
