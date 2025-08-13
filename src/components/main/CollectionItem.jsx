import { useEffect, useRef, useState } from "react";


function CollectionItem({item}) {
    const [hoveredElem,setHoveredElem]=useState(false)
    const vidRef = useRef(null);
    
     useEffect(() => {
        if(vidRef.current){
            vidRef.current.play()
        }
        return () => { 
            if(vidRef.current){
                vidRef.current.pause()
            }
        }
    }, []);

    return (
        <div 
        onMouseEnter={()=>setHoveredElem(true)}
        onMouseLeave={()=>setHoveredElem(false)}
        className="relative hover:z-[700] rounded-[10px] aspect-[367/206] shadow-formShadow hover:shadow-[0px_31px_45px_-2px_rgba(0,0,0,0.7)] overflow-hidden border-[3px] border-transparent hover:border-[#fbfbfb] hover:scale-[1.06] transition-all duration-[0.3s]">
            <img className="z-[600] absolute inset-0 object-cover" src={item.src} alt={item.alt}/>
            <video
            ref={vidRef}
            className={`${hoveredElem ? 'opacity-100':'opacity-0'} z-[500] size-full  absolute inset-0 object-fill `}
            autoPlay 
            loop 
            playsInline 
            muted>
                <source src={item.video} type="video/mp4" />
            </video>
        </div>
    )
}

export default CollectionItem
