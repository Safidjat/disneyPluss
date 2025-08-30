import { useLayoutEffect } from "react";
import BlogView from "../../components/main/BlogView"
import { useAuth } from "../../context/AuthContext";
import Auth from "../Auth";
import LoadingVerify from "../../components/LoadingVerify";
import { useWishList } from "../../context/WishlistContext";
import { useScrollY } from "../../context/ScrollRestoreContext";
import { Button } from "@mui/material";

function WishlistPage() {
    const{isLoading,isLoggedIn}=useAuth();
    const {wishBasket,clearWishes}=useWishList();
    const {handleScrollY,setScrollYinfo}=useScrollY();

    useLayoutEffect(()=>{
        if (wishBasket.basket.length > 0) {
            handleScrollY();
        }
    }, [wishBasket]);

    return (
        isLoading?<LoadingVerify />:
        !isLoggedIn?<Auth />:
        <div className="w-full max-[210px]:px-[16px] p-[60px] flex flex-col gap-[30px]">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-[18px] min-[800px]:text-[25px] font-bold text-white">My List</h1>
                {
                    wishBasket.basket.length>0&&
                    <Button
                    onClick={clearWishes}
                    variant="outlined" 
                    sx={{
                        '@media (max-width: 365px)': {
                        width: '80px',
                        fontSize: '10px',
                        textAlign:'center',
                        px:'5px'  
                        },
                        width: '150px',
                        fontSize:'14px',
                        fontWeight: '400',
                        px: '15px',
                        py: '5px',
                        borderColor: 'white', 
                        color: 'white',       
                        borderRadius: '8px',
                        '&:hover': {
                        backgroundColor: 'white',
                        color: '#030408',
                        borderColor: 'white',
                        },
                    }}
                    >
                    CLEAR
                    </Button>
                }
            </div>
            <div className="min-h-[567.6px]">
                {
                    wishBasket.basket.length>0
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
