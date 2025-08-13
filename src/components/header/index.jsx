import { Avatar, Button, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import { useMatchMedia } from "../../hooks/use-match-media"
import { useAuth } from "../../context/AuthContext"
import LogoutIcon from '@mui/icons-material/Logout';
import HamburgerMenu from "./HamburgerMenu";
import NormMenu from "./NormMenu";
import { motion } from 'framer-motion';

function Header() {
  const isLessTnan900=useMatchMedia('(max-width: 900px)')
  const{isLoggedIn,setLoggedIn,userName,isLoading}=useAuth() 

  return (
    !isLoading&&
    <header className="bg-bgDark z-[900] h-[64px] sticky top-0 shadow-md">
      <div className="h-[64px] bg-[#030408] fixed left-0 top-0 right-0 z-[-2]"></div>
      <motion.div 
      initial={{opacity: 0}}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
          ease: "easeOut",
        }
      }}
      className="px-[16px] min-[600px]:px-[24px] size-full flex items-center justify-between "
      >
        <div className="flex items-center gap-[15px]">
          <Link to={'/'}><img src="/assets/img/disney-logo.svg" className="mr-[15px] h-[50px]" alt="disney" /></Link>
          {
            !isLessTnan900 && isLoggedIn && 
            <NormMenu />
          }
        </div>
        <div>
          {
            isLoading?
            '' :
            !isLoggedIn ?
            <Button
              variant="outlined" 
              component={Link}      
              to={'/auth'}
              sx={{
                '@media (max-width: 290px)': {
                  width: '80px',
                  fontSize: '11px',
                  textAlign:'center',
                  px:'5px'  
                },
                width: '150px',
                fontSize:'14px',
                fontWeight: '400',
                px: '15px',
                py: '5px',
                borderColor: 'white', 
                color: 'white',       
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#030408',
                  borderColor: 'white',
                },
              }}
            >
              GET STARTED
            </Button>
            :
            <div
            className="flex items-center">
              {
                isLessTnan900  
                ? <HamburgerMenu />
                : <h3 className="text-white text-[14px] font-[400] mr-[12px]">{userName || ''}</h3>
              }
              <Avatar 
              sx={{ 
                bgcolor: '#bdbdbd',
                width:'40px',
                height:'40px',
                marginRight:'12px'
              }}>
                {userName?.[0].toUpperCase()}
              </Avatar>
              <IconButton
                onClick={()=>{
                  localStorage.removeItem('disneyToken');
                  setLoggedIn(false)
                }}
                component={Link}
                to="/auth"
                sx={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid white', 
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'white',
                        color: '#030408',
                    },
                }}
              >
                  <LogoutIcon sx={{width:"21px",height:'21px'}} />
              </IconButton>
            </div>
          }
        </div>
      </motion.div>
    </header>
  )
}

export default Header
