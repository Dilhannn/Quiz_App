import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import whatNext from '../assets/whatNext.png';
import { useLocation } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Header() {
  const location = useLocation();
  const firstName = localStorage.getItem('formData')
    ? JSON.parse(localStorage.getItem('formData')).firstName
    : '';

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#9F009F' }}>
        <Toolbar>
          <a href="/main">
            <img src={whatNext} alt="Logo" style={{ height: 80, width: 200 }} />
          </a>
          {!isLoginPage && !isRegisterPage && (
            <Typography variant="body1" style={{ marginRight: '10px', fontWeight: 'bold', fontSize: "20px", color:"#FFDF68" }}>
              Welcome, {firstName}
            </Typography>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            {!isLoginPage && !isRegisterPage && (
              <>
                <Button style={{ fontFamily: 'italic' }} color="inherit" href="/login">
                  Login
                </Button>
                <Button style={{ fontFamily: 'italic' }} color="inherit" href="/">
                  Register
                </Button>
              </>
            )}
            {!isLoginPage && !isRegisterPage && (
              <Button color="inherit" href='/'>
                <ExitToAppIcon />
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
