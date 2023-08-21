import React, { useState } from 'react';
import Main from './components/Main';
import { Container } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Questions from './components/Questions';
import Footer from './Footer';
import Background from './components/Background';
import { useLocation, NavLink } from 'react-router-dom';
import YourExams from './components/YourExams';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onRegister = (formData) => {
    // Registration code goes here
    console.log(formData);
    setIsLoggedIn(true);
  };

  const onLogin = (formData) => {
    // Login code goes here
    console.log(formData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Header />
      <Background />
      <Container>
        <Routes>
          <Route path="/" element={<Register onRegister={onRegister} />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/main" element={isLoggedIn ? <Main /> : <Navigate to="/" />} />
          <Route path="/:categoryName/:categoryLink" element={<Questions />} />
          <Route path="/yourExams" element={<YourExams />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
