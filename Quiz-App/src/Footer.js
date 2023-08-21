import React from 'react'
import { Box, Typography } from '@mui/material';


function Footer() {
    return (
        <Box position="static" sx={{
            flexGrow: 1,
            position: "fixed",
            bottom: 0,
            width: '100%',
            size:"large",
            edge:"start",
            arialabel:"menu",
            left: 0,
        }}>

            <footer style={{ backgroundColor: '#9F009F' }}>
                <div>
                    
                <Typography fontFamily={'italic'} fontSize={'16px'} component="div" variant="body2" color="white" align="center">
                    <span style={{float: 'left' }}>&nbsp;What's Next Question </span>
                    <span style={{display: 'inline-block', width: '1rem'}}></span>
                    <span style={{float: 'center'}}>Let's Do Some Testing</span>
                    <span style={{float: 'right'}}>What's Next Question &nbsp;</span>
                </Typography>
                </div>
            </footer>
        </Box>
    );
}

export default Footer;