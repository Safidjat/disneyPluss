import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { imgUrl } from "../../services/componentsData"
import { motion } from 'framer-motion';
import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useAuth } from "../../context/AuthContext";
import Auth from "../Auth";
import { useScrollY } from "../../context/ScrollRestoreContext";
import ModalTrailer from "../../modals/ModalTrailer";
import PageLoadError from "../../components/main/PageLoadError";
import { PulseLoader } from "react-spinners";
import LoadingVerify from "../../components/LoadingVerify";
import { getDetailsById } from "../../services";
import { useWishList } from "../../context/WishlistContext";
import Popover from '@mui/material/Popover';

function Detail() {
    const [modalShow, setModalShow] = useState(false);
    const{isLoggedIn,isLoading}=useAuth() 
    const [detail,setDetail]=useState({});
    const [trailers,setTrailers]=useState([]);
    const [pageLoading,setPageLoading]=useState(true);
    const [pageError,setPageError]=useState(false);
    let navigate = useNavigate()
    const location = useLocation();
    const {id}=useParams();
    const {setMayScroll}=useScrollY();
    const {wishBasket,removeFromWishes,addToWishes}=useWishList()
    const [open, setOpen] = useState(null);


    useEffect(()=>{
        getDetailsById(id)
        .then((res)=>{
            if(Object.keys(res).length){
                setDetail(res);
                setTrailers(res?.videos?.results?.filter(item=>item?.type=='Trailer'||item?.type=='Teaser'));
                setPageError(false);
            }else setPageError(true);
            setPageLoading(false);
        })
    },[id])

    const handlePopoverOpen = (event) => {
        if(!trailers?.length) setOpen(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setOpen(null);
    };
    function handleBack(){
        if(location.key!=='default'){
            navigate(-1);
            setMayScroll(true);
        }
        else navigate('/')
    }
    function handleBasket(){
        if(wishBasket.basket.find(item=>item.id==id)) removeFromWishes(id)
        else addToWishes(id,detail?.poster_path)
    }
    function handleTrailerShow(){
        if(trailers?.length) setModalShow(true)
    }
    
    return (
        isLoading?<LoadingVerify />:
        !isLoggedIn?<Auth />:
        pageLoading? 
        <div className="w-full min-h-[calc(100vh-168px)] flex justify-center items-center">
            <PulseLoader color={"#fff"} size={10} className="customLoader"/>
        </div>:
        pageError?<PageLoadError />:
        <div className="relative h-[665.600px] grid place-items-center w-full">
            <div className="absolute inset-0 opacity-[0.5] z-[-1]">
                <LazyLoadImage
                    width="100%"
                    height="100%"
                    src={imgUrl+(detail?.backdrop_path||detail?.belongs_to_collection?.backdrop_path||detail?.poster_path)}
                    className="size-full object-cover"
                    effect="blur"
                />
            </div>
            <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, ease: "easeOut",delay: 0.7 }}
            className="flex flex-col items-start gap-[25px] w-full max-[423px]:px-[10px] px-[50px] min-[800px]:px-[80px] min-[1200px]:px-[100px]">
                {
                    detail?.topImg_path
                    ?
                    <div className="w-[25%] max-[800px]:w-[45%]">
                        <img className="size-full object-contain" src={imgUrl + detail?.topImg_path} />
                    </div> 
                    :
                    <h1 className="text-[35px] max-[400px]:text-[20px] text-left text-white font-bold w-full">{detail?.title}</h1>
                }
                <div className="flex items-center gap-[clamp(5px,2vw,10px)] text-[12px] min-[800px]:text-[14px] min-[1000px]:text-[16px]">
                    <Button 
                    startIcon={<PlayArrowRoundedIcon fontSize="small"/>}
                    sx={{
                        width:'clamp(60px, 18vw, 100px)',
                        height:'clamp(22px, 37px, 37px)',
                        borderRadius:'4px',
                        textTransform:'uppercase',
                        backgroundColor: '#f9f6ee',
                        color:'black',
                        transitionDuration:'0.3s',
                        '&:hover': {
                            backgroundColor: '#0009',
                            color:'#f9f6ee',
                        },
                        fontSize: '12px',
                        '@media (min-width: 800px)': {
                            fontSize: '14px', 
                        },
                        '@media (min-width: 1000px)': {
                            fontSize: '16px', 
                        },
                        '@media (max-width: 400px)': {
                            '& .MuiButton-startIcon': {
                                marginRight: '2px', 
                            } 
                        },
                        '@media (max-width: 300px)': {
                            width:'100px',
                        },
                        '@media (max-width: 290px)': {
                            fontSize: '10px',
                            width:'70px',
                        }, 
                    }}

                    variant="contained">
                        Play
                    </Button>
                    <div>
                        <Button 
                        onClick={handleTrailerShow}
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        startIcon={<PlayArrowRoundedIcon fontSize="small" />}
                        sx={{
                            width:'clamp(60px, 22vw, 150px)',
                            height:'clamp(22px, 37px, 37px)',
                            borderRadius:'4px',
                            textTransform:'uppercase',
                            backgroundColor: '#0009',
                            color:'#f9f6ee',
                            transitionDuration:'0.3s',
                            '&:hover': {
                                backgroundColor: 'black',
                            },
                            fontSize: '12px',
                            '@media (min-width: 800px)': {
                                fontSize: '14px', 
                            },
                            '@media (min-width: 1000px)': {
                                fontSize: '16px', 
                            },
                            '@media (max-width: 400px)': {
                                '& .MuiButton-startIcon': {
                                    marginRight: '2px', 
                                } 
                            },
                            '@media (max-width: 300px)': {
                                width:'100px',
                            },
                            '@media (max-width: 290px)': {
                                fontSize: '10px',
                                width:'80px',
                            },
                        }}
                        variant="contained" disableElevation>
                            Trailer
                        </Button>
                        <Popover
                            id="mouse-over-popover"
                            sx={{ pointerEvents: 'none' }}
                            open={open}
                            anchorEl={open}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                            slotProps={{
                                paper: {
                                    sx: {
                                        padding: '10px',
                                        marginTop:'5px'
                                    }
                                }
                            }}
                        >
                            <h3 className="text-center min-w-[60px]">No video for this one.🥲</h3>
                        </Popover>
                    </div>
                    <IconButton
                    onClick={handleBasket}
                    component={Link}
                    to=""
                    sx={{
                        width: '37px',
                        height: '37px',
                        backgroundColor: '#0009',
                        color:'#f9f6ee',
                        transitionDuration:'0.3s',
                        '&:hover': {
                            backgroundColor: 'black',
                        },
                        fontSize: '21px' 
                    }}
                    >
                        {
                            wishBasket.basket.find(item=>item.id==id)
                            ?
                            <CheckRoundedIcon fontSize="small" />
                            :
                            <AddRoundedIcon fontSize="small" />
                        }
                    </IconButton>
                </div>
                <h2 className="text-white text-[14px] font-[400] min-[800px]:text-[16px] min-[1000px]:text-[18px]">{detail?.release_date?.slice(0,4) || detail?.first_air_date?.slice(0,4)} • {detail?.genres?.map(item=>item.name).join(', ')}</h2>
                <p className="min-[1000px]:mr-[200px] text-white text-[14px] font-[400] min-[800px]:text-[16px] min-[1000px]:text-[18px]">{detail?.overview}</p>
                <IconButton
                onClick={handleBack} 
                sx={{
                    width: '37px',
                    height: '37px',
                    backgroundColor: '#0009',
                    color:'#f9f6ee',
                    transitionDuration:'0.3s',
                    '&:hover': {
                        backgroundColor: 'black',
                    },
                    fontSize: '21px' 
                }}
                >
                    <ArrowBackIosNewRoundedIcon fontSize="small" />
                </IconButton>
            </motion.div>
            {modalShow&&<ModalTrailer modalShow={modalShow} trailers={trailers} setModalShow={setModalShow} />}
        </div>
    )
}

export default Detail
