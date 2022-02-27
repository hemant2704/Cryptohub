import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Crypto from './components/Crypto';
import News from './components/News';
import CryptoDetails from './components/CryptoDetails';
import Footer from './components/Footer'
const App = () => {
  return (
    <div className='app'>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar/>
        <Box component="main" sx={{ flexGrow: 1, p: '0.5rem',mt:'4rem' }}>
          <Routes>
            <Route exact path='/Cryptohub/' element={<HomePage />} />
            <Route exact path='/Cryptohub/cryptocurrencies' element={<Crypto />} />
            <Route exact path='/Cryptohub/crypto/:coinId' element={<CryptoDetails />} />
            <Route exact path='/Cryptohub/news' element={<News />} />
          </Routes>
        </Box>
      </Box>
      <Footer/>
    </div>
  );
}

export default App;
