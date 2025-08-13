import { motion } from 'framer-motion';
import TopSliderMovies from './TopSliderMovies';
import Collections from './Collections';
import SuggestionSlider from './SuggestionSlider';
import { itemVariants, mainVariants } from '../../services/componentsData';

function LandingView({sliders}) {

    return (
        <motion.div
        variants={mainVariants}
        initial="hidden"
        animate="visible"
        >
        <motion.div
            variants={itemVariants}
        >
            <TopSliderMovies />
        </motion.div>
        <motion.div
            variants={itemVariants}
        >
            <Collections />
        </motion.div>
            {
                sliders.length>0 &&
                <motion.div
                variants={itemVariants}
                className="w-full">
                    {
                    sliders?.map(item=>(
                        <div key={item.id} className="flex flex-col">
                            <h2 className="max-[340px]:px-[40px] px-[60px] text-white text-[18px] min-[800px]:text-[25px] font-bold ">{item.title}</h2>
                            <SuggestionSlider data={item.data} />
                        </div>
                    ))
                    }
                </motion.div>
            }
        </motion.div>
    )
}

export default LandingView
