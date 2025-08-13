import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function PageLoadError() {
    return (
        <div className="w-full h-[calc(100vh-168px)] grid place-items-center">
            <motion.div 
            initial={{opacity: 0, y:20, scale:.97}}
            animate={{
                opacity: 1,
                y:0, 
                scale:1,
                transition: {
                    duration: .8,
                    ease: "easeOut",
                }
            }}
            className="flex w-full flex-col items-center justify-center gap-[20px]">
                <LazyLoadImage
                    alt="error-img"
                    width="100%"
                    height="100%"
                    src={'/assets/img/error-img.png'}
                    wrapperClassName="w-[50%]! min-[590px]:w-[40%]! aspect-[20/11]" 
                    effect="blur"
                />
                <div className="flex flex-col items-center gap-[10px]">
                    <h1 className="text-center text-white min-[590px]:text-[25px] uppercase font-bold">OOPS! Connection with the server failed!</h1>
                    <p className="text-center text-white text-[12px] min-[590px]:text-[16px] max-w-[520px]">Check your internet connection or refresh the page.</p>
                </div>
            </motion.div>
        </div>
    )
}

export default PageLoadError
