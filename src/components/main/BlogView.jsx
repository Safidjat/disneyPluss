import { imgUrl } from "../../services/componentsData";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function BlogView({blogData,setScrollYinfo}) {
    
    return (
        <div className="flex flex-wrap w-full gap-[16px]">
            {
                blogData.length&&
                blogData.map(item=>(
                    <Link key={item?.id} to={'/detail/' + item?.id} onClick={()=>setScrollYinfo(parseFloat(window.scrollY.toFixed(2)))} className="aspect-[2/3] overflow-hidden shadow-formShadow rounded-[10px] border-[3px] border-transparent hover:border-[#fbfbfb] ease-in-out transition-all duration-[0.3s] w-full min-[600px]:w-[calc((100%-32px)/3)] min-[900px]:w-[calc((100%-48px)/4)] min-[1200px]:w-[calc((100%-80px)/6)]">
                        <LazyLoadImage
                            width="100%"
                            height="100%"
                            src={imgUrl+item?.poster_path}
                            className="size-full object-cover"
                            effect="blur"
                        />
                        {/* <img className="size-full object-cover" src={imgUrl+item?.poster_path} alt={item?.original_name} /> */}
                    </Link>
                ))
            }
        </div>
    )
}

export default BlogView
