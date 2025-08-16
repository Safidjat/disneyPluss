import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { menuData } from "../../services/componentsData"

function NormMenu() {
  return (
    <div className="flex items-center gap-5">
      {
        menuData.map(item=>(
            <Button
            key={item.id}
            component={Link}
            to={item.linkTo}
            startIcon={item.icon}
            sx={{
                padding:'6px 8px',
                borderRadius:'4px',
                color:'white',
                transition:'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover':{
                    backgroundColor: '#040910',
                },
                '& .MuiButton-startIcon':{
                    marginRight: '10px', 
                }
            }}
            >
                <Box
                component="span"
                sx={{
                    position:'relative', 
                    textTransform:'uppercase',
                    fontSize:'14px',
                    fontWeight:500,
                    '&::after': {
                        content:'""',
                        position:'absolute',
                        bottom:-4, 
                        left:0,
                        height:'3px',
                        width:'0',
                        backgroundColor:'white',
                        // transform:'scaleX(0)',
                        // transformOrigin:'left',
                        transition:'all 0.3s ease-in-out',
                        },
                        '.MuiButton-root:hover &::after': {
                            width:'100%'
                        // transform:'scaleX(1)',
                    }
                }}
                >
                    {item.name}
                </Box>
            </Button>
        ))
      }
    </div>
  )
}

export default NormMenu
