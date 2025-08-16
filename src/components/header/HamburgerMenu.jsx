import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Button } from '@mui/material';
import CustomDisneyHamburger from './СustomHamburger';
import { menuData } from '../../services/componentsData';
import { Link } from 'react-router-dom';

function HamburgerMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        if (anchorEl){
            setAnchorEl(null);
        } else{
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    borderRadius: '50%',
                    padding: 0,
                    minWidth: '48px',
                    minHeight:'48px',
                    color: 'white',
                }}
            >
                <CustomDisneyHamburger toggled={open}/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                     paper: {
                        elevation: 0,
                        sx: {
                            backgroundColor: '#030408',
                            fontWeight: '400',
                            borderRadius: '18px',
                            color: 'white',
                            boxShadow:'#070811',
                            marginRight:'20px',
                            marginTop:'1px',
                            width:'160px',
                            boxShadow: '0px -4px 20px -4px #161824',
                        },
                    },
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                {
                    menuData.map(item=>(
                        <MenuItem key={item.id}
                            component={Link}
                            to={item.linkTo}
                            sx={{
                                paddingBlock: '22px',
                                paddingLeft:'35px',
                                fontSize: '14px',
                            }}
                            onClick={handleClose}>
                            <div className='w-full flex items-center gap-[10px]'>
                                {item.icon}
                                <span className='uppercase'>{item.name}</span>
                            </div>
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
}

export default HamburgerMenu

