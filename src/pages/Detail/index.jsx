import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { imgUrl, itemVariants } from "../../services/componentsData"
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

function Detail() {
    const [added,setAdded]=useState(false);
    const [modalShow, setModalShow] = useState(false);
    const{isLoggedIn,isLoading}=useAuth() 
    const [detail,setDetail]=useState({});
    const [pageLoading,setPageLoading]=useState(true);
    const [pageError,setPageError]=useState(false);
    let navigate = useNavigate()
    const location = useLocation();
    const {id}=useParams();
    const {setMayScroll}=useScrollY();

    useEffect(()=>{
        getDetailsById(id)
        .then((res)=>{
            if(Object.keys(res).length){
                setDetail(res);
                setPageError(false);
            }else setPageError(true);
            setPageLoading(false);
        })
    },[id])

    function handleBack(){
        if(location.key!=='default'){
            navigate(-1);
            setMayScroll(true);
        }
        else navigate('/')
    }
    function handleAddToWishlist(){
        setAdded(prev=>!prev)
    }


    return (
        !isLoggedIn?<Auth />:
        isLoading?<LoadingVerify />:
        pageLoading? 
        <div className="w-full h-[calc(100vh-168px)] flex justify-center items-center">
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
            transition={{ duration: .7, ease: "easeOut" }}
            className="flex flex-col items-start gap-[25px] w-full max-[423px]:px-[10px] px-[50px] min-[800px]:px-[80px] min-[1200px]:px-[100px]">
                <div className="w-[25%] max-[800px]:w-[45%]">
                    <img className="size-full object-contain" src={imgUrl + detail?.topImg_path} />
                </div>
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
                        '@media (max-width: 290px)': {
                            fontSize: '10px',
                        }, 
                    }}

                    variant="contained">
                        Play
                    </Button>
                    <Button 
                    onClick={()=>setModalShow(true)}
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
                        '@media (max-width: 290px)': {
                            fontSize: '10px',
                        },
                    }}
                    variant="contained" disableElevation>
                        Trailer
                    </Button>
                    <IconButton
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
                            added?<CheckRoundedIcon onClick={handleAddToWishlist} fontSize="small" />:<AddRoundedIcon onClick={handleAddToWishlist} fontSize="small" />
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

            <ModalTrailer modalShow={modalShow} trailers={detail?.videos?.results?.filter(item=>item?.type=='Trailer'||item?.type=='Teaser')} setModalShow={setModalShow} />
        </div>
    )
}

export default Detail
