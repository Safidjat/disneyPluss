import { LazyLoadImage } from "react-lazy-load-image-component"
import { itemVariants } from "../../services/componentsData"
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

function Detail() {
    const [added,setAdded]=useState(false);
    const [modalShow, setModalShow] = useState(false);
    const{isLoggedIn}=useAuth() 
    let navigate = useNavigate()
    const location = useLocation();
    const {id}=useParams();
    const {setMayScroll}=useScrollY();

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
        <div className="relative h-[665.600px] grid place-items-center w-full">
            <div className="absolute inset-0 opacity-[0.5] z-[-1]">
                <LazyLoadImage
                    width="100%"
                    height="100%"
                    src='/assets/img/testtDetailinn.webp'
                    className="size-full object-cover"
                    effect="blur"
                />
            </div>
            <motion.div 
            variants={itemVariants}
            initial="hidden"   
            animate="visible"
            className="flex flex-col gap-[25px] w-full max-[423px]:px-[10px] px-[50px] min-[800px]:px-[80px] min-[1200px]:px-[100px]">
                <div className="aspect-[25/6] w-[55vw] min-[600px]:w-[450px]">
                    <img className="size-full object-cover" src="/assets/img/testtDetailin2.webp" />
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
                <h2 className="text-white text-[14px] font-[400] min-[800px]:text-[16px] min-[1000px]:text-[18px]">2024 • Animation, Adventure, Family, Comedy</h2>
                <p className="min-[1000px]:mr-[200px] text-white text-[14px] font-[400] min-[800px]:text-[16px] min-[1000px]:text-[18px]">After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.</p>
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

            <ModalTrailer modalShow={modalShow} setModalShow={setModalShow} />
        </div>
    )
}

export default Detail
