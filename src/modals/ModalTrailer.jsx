import { Backdrop, Fade, Modal } from "@mui/material"
import { youTubeUrl } from "../services/componentsData"

function ModalTrailer({modalShow,setModalShow,trailers}) {
    function theLatestTrailer(){
        const now = new Date();
        return [...trailers].sort((a,b)=>Math.abs(new Date(a.published_at)-now)-Math.abs(new Date(b.published_at)-now))[0]
    }
    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalShow}
        onClose={()=>setModalShow(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }
          },
        }}
      >
        <Fade in={modalShow}>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[70%] aspect-[16/9] h-[365.600px]">
            <iframe 
            className="size-full" 
            src={youTubeUrl+theLatestTrailer()?.key}
            title="YouTube video player" >
            </iframe>
          </div>
        </Fade>
      </Modal>
    )
}
export default ModalTrailer
