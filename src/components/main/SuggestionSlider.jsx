import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { useRef } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useMatchMedia } from '../../hooks/use-match-media';
import { imgUrl } from '../../services/componentsData';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function SuggestionSlider({data}) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const{isLoggedIn}=useAuth()
  
    return (
            <div className='relative w-full pb-[60px] pt-[20px] overflow-hidden'>
                <button 
                ref={prevRef}
                className='absolute w-[7%] min-[600px]:w-[5%] group grid place-items-center top-0 bottom-0 left-0 h-full z-[100]  cursor-pointer'
                role="button"
                >
                    <FaChevronCircleLeft className='max-[700px]:text-[20px] max-[890px]:text-[25px] max-[1200px]:text-[30px] min-[1200px]:text-[38px] group-hover:opacity-100 opacity-60 text-white transition-all duration-300 ease-in-out' />
                </button>

                <button 
                ref={nextRef}
                className='absolute w-[7%] min-[600px]:w-[5%] group grid place-items-center top-0 bottom-0 right-0 h-full z-[100]  cursor-pointer'
                role="button"
                >
                    <FaChevronCircleRight  className='max-[700px]:text-[20px] max-[890px]:text-[25px] max-[1200px]:text-[30px] min-[1200px]:text-[38px] group-hover:opacity-100 opacity-60 text-white transition-all duration-300 ease-in-out' />
                </button>
        
                <Swiper 
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.update();
                }}
                modules={[Navigation]}
                speed={600}
                loop={data.length>8}
                loopAdditionalSlides={4} 
                initialSlide={1} 
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    400: {
                        slidesPerView: 2,
                    },
                    600: {
                        slidesPerView: 3,
                    },
                    900: {
                        slidesPerView: 4,
                    },                    
                    1100: {
                        slidesPerView: 5,
                    },                   
                }}    
                spaceBetween={20}         
                className="mySwiper px-[7.5%]! min-[600px]:px-[5.5%]!">
                    {
                        data.length>0&&
                        data.map(item=>(
                            <SwiperSlide  key={item.id} className='max-[400px]:w-[85%] w-full'>
                                <Link to={isLoggedIn?('/detail/' + item.id):'/auth'} className='block relative shadow-formShadow rounded-[10px] w-full aspect-[185/278] overflow-hidden border-[3px] border-transparent hover:border-[#fbfbfb] hover:scale-[1.04] ease-in-out transition-all duration-[0.3s] cursor-pointer'>
                                    <div className='absolute inset-0 size-full'>
                                        <LazyLoadImage
                                            width="100%"
                                            height="100%"
                                            src={imgUrl+item?.poster_path}
                                            className="size-full object-cover"
                                            effect="blur"
                                        />
                                        {/* <img className='size-full object-cover' src={imgUrl+item.poster_path}/> */}
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
    )
}

export default SuggestionSlider 