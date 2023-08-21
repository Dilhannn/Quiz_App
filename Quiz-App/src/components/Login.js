import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };
  
    const navigate = useNavigate();
  
    const handleLogin = (event) => {
      event.preventDefault();
  
      const storedFormData = JSON.parse(localStorage.getItem("formData"));
  
      if (
        storedFormData &&
        formData.email === storedFormData.email &&
        formData.password === storedFormData.password
      ) {
        navigate("/main");
      } else {
        alert("Email or password is incorrect");
      }
    };
    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            color="secondary"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            color="secondary"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button style={{borderColor:'#9F009F',color:'#9F009F'}} type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            
            <Grid item>
              <Link to="/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}