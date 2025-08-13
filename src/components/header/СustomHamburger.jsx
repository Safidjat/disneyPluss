import { Box } from '@mui/material';

function CustomDisneyHamburger({ toggled}) {
  const baseBarStyles = {
    background: 'currentColor',
    position: 'absolute',
    transition: 'transform 0.4s cubic-bezier(0, 0, 0, 1), opacity 0.4s cubic-bezier(0, 0, 0, 1)',
  };

  return (
    <Box sx={{position: 'relative',width:'100%',height:'100%',transition: '0.4s cubic-bezier(0, 0, 0, 1)'}}>
{/* verx */}
      <Box sx={{
        ...baseBarStyles,
        height:'2px',width:'10px',
        left: '14px', top: '-7px',
        borderRadius: '9em 0px 0px 9em',
        transform: toggled ? `rotate(45deg) translate(2.6px, 0.5px)` : 'none',
      }} />
      <Box sx={{
        ...baseBarStyles,
        height:'2px',width:'10px',
        left: '24px', top: `-7px`,
        borderRadius: '0em 9px 9px 0em',
        borderRadius: '0em 9px 9px 0em',
        transform: toggled ? `rotate(-45deg) translate(-2.8px, 0.6px)` : 'none',
      }} />
{/* seredina */}
      <Box sx={{
        ...baseBarStyles,
        height:'1.5px',width:'10px',
        left: '14px', top: `-1px`,
        borderRadius: '9em 0px 0px 9em',
        transform: toggled ? 'scaleX(1.5)' : 'none',
        opacity: toggled ? 0 : 1,
      }} />
      <Box sx={{
        ...baseBarStyles,
        height:'1.5px',width:'10px',
        left: '24px', top: `-1px`,
        borderRadius: '0em 9px 9px 0em',
        transform: toggled ? 'scaleX(1.5)' : 'none',
        opacity: toggled ? 0 : 1,
      }} />
{/* niz */}
      <Box sx={{
        ...baseBarStyles,
        height:'2px',width:'10px',
        left: '14px', top: `5px`,
        borderRadius: '9em 0px 0px 9em',
        transform: toggled ? `rotate(-45deg) translate(2.6px, -0.7px)` : 'none',
      }} />
      <Box sx={{
        ...baseBarStyles,
        height:'2px',width:'10px',
        left: '24px', top: `5px`,
        borderRadius: '0em 9px 9px 0em',
        transform: toggled ? `rotate(45deg) translate(-2.8px, -1px)` : 'none',
      }} />
    </Box>
  );
}

export default CustomDisneyHamburger;