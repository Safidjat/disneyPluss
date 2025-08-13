import { useEffect, useRef} from "react"

function Intro({showMain,setShowMain}) {
    const videoRef = useRef(null);
    const timerRef = useRef(null);
    
    useEffect(()=>{
        const hasSeenIntro=JSON.parse(sessionStorage.getItem('hasSeenIntro'));
        if(hasSeenIntro){
            setShowMain(true)
        }else{
            sessionStorage.setItem('hasSeenIntro','true')
        }
        return ()=>{
            if (videoRef.current) {        
                videoRef.current.pause(); 
            }
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    },[])

    const handleVideo=()=>{
        const prolong=0.5;
        videoRef.current.playbackRate=prolong;
        const videoDurationMs=videoRef.current.duration*1000*(1/prolong) + 2000;
        timerRef.current=setTimeout(()=>{
            setShowMain(true)
        },videoDurationMs)
    }

    if(showMain) return null
    return (
        <div className="fixed inset-0">
            <video 
            ref={videoRef}
            onLoadedMetadata={handleVideo} 
            className="size-full z-999 object-fill desk:object-cover" autoPlay muted playsInline data-user-paused="true">
                <source src="/assets/mp4/disney-intro.mp4" type="video/mp4" />
            </video>
        </div>
    )
}

export default Intro
