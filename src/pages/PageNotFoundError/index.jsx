import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion';

function PageNotFoundError() {

    return (
        <div className="p-[60px] h-[100vh] w-full grid place-items-center">
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
                <div className="w-[50%] min-[590px]:w-[40%] aspect-[20/11]">
                    <img
                        src={'/assets/img/error-img.png'}
                        className="size-full object-cover"
                    />
                </div>
                <div className="flex flex-col items-center gap-[10px]">
                    <h1 className="text-center text-white min-[590px]:text-[25px] font-bold">OOPS! PAGE NOT FOUND</h1>
                    <p className="text-center text-white text-[12px] min-[590px]:text-[16px] max-w-[520px]">You must have picked the wrong door because we have not been able to lay our eyes on the page you are searching for.</p>
                </div>
                <Button component={Link} to={'/'} variant="contained" disableElevation>
                    Back to home
                </Button>
            </motion.div>
        </div>
    )
}

export default PageNotFoundError
