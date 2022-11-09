import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppHeader from './components/layout/AppHeader';
import Blocks from './pages/Blocks';
import Main from './pages/Main';
import { Box } from '@mui/system';
import Transactions from './pages/Transactions';
import AppDrawer from './components/layout/AppDrawer';
import { Toolbar } from '@mui/material';
import Block from './pages/Block';
import Transaction from './pages/Transaction';
const Router = () => {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <AppHeader />
        <AppDrawer drawerWidth={280} />
        <Box component='main' sx={{ flexGrow: 1, p: 3, bgcolor: '#f2f7fb' }}>
          <Toolbar />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='blocks' element={<Blocks />} />
            <Route path='block/:id' element={<Block />} />
            <Route path='transactions' element={<Transactions />} />
            <Route path='transaction/:id' element={<Transaction />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default Router;
