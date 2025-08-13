import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation,Pagination,Autoplay,A11y } from 'swiper/modules';
import { motion,AnimatePresence } from 'framer-motion';
import { useMatchMedia } from '../../hooks/use-match-media';
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useRef, useState } from 'react';
import { topSliderData } from '../../services/componentsData';

function TopSliderMovies() {
    const [currentImg,setCurrentImg]=useState(0);
    const isLessThan600=useMatchMedia('(max-width: 600px)');
    const prevRef = useRef(null);
    const nextRef = useRef(null);

  
    return (
        <div
        className="pt-[20px] pb-[50px] overflow-hidden w-full">
            <div className='relative '>
                <button 
                ref={prevRef}
                className='absolute max-[600px]:w-[7%] min-[600px]:w-[5%] group grid place-items-center top-0 bottom-0 left-0 h-full z-[100]  cursor-pointer'
                role="button"
                >
                    <FaChevronCircleLeft className='max-[700px]:text-[20px] max-[890px]:text-[25px] max-[1200px]:text-[30px] min-[1200px]:text-[38px] group-hover:opacity-100 opacity-60 text-white transition-all duration-300 ease-in-out' />
                </button>

                <button 
                ref={nextRef}
                className='absolute max-[600px]:w-[7%] min-[600px]:w-[5%] group grid place-items-center top-0 bottom-0 right-0 h-full z-[100]  cursor-pointer'
                role="button"
                >
                    <FaChevronCircleRight  className='max-[700px]:text-[20px] max-[890px]:text-[25px] max-[1200px]:text-[30px] min-[1200px]:text-[38px] group-hover:opacity-100 opacity-60 text-white transition-all duration-300 ease-in-out' />
                </button>
        
                <Swiper 
                onSlideChange={(swiper)=>setCurrentImg(swiper.realIndex)}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                modules={[Navigation,Pagination,Autoplay,A11y]} //A11y screenreaders
                loop={true}
                speed={600}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false, 
                }}
                centeredSlides={true}
                slidesPerView={'auto'}     
                spaceBetween={20}         
                pagination={{ clickable: true }}  
                className="mySwiper">
                    {
                        topSliderData?.map((item,i)=>(
                            <SwiperSlide  key={item.id} style={{width:isLessThan600?'85%':'89%'}}>
                                <div className='relative w-full shadow-formShadow rounded-[10px] aspect-[90/23] border-[3px] border-transparent hover:border-[#fbfbfb] hover:scale-[1.02] transition-all duration-[0.3s] cursor-pointer'>
                                    <div className='size-full rounded-[10px] overflow-hidden'><img className='size-full object-cover' src={item.img} alt={item.alt}/></div>
                                        <div className='absolute inset-0 rounded-[10px] overflow-hidden'>
                                            <AnimatePresence initial={false}>
                                                {
                                                    currentImg==i &&
                                                    <motion.img
                                                        key={`overlay-${i}`} 
                                                        src={item.overlay}
                                                        initial={{ x: 0, opacity: 0 }}
                                                        animate={{ x: -15, opacity: 1 }}
                                                        exit={{ x: 0, opacity: 0 }}
                                                        transition={{ duration: 2, ease: "easeInOut" }}
                                                        className="size-full object-cover"
                                                    />
                                                }
                                            </AnimatePresence>
                                        </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default TopSliderMovies
