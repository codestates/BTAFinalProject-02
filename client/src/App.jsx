import React from 'react';
import Router from './Router';
import AlertModal from './components/common/AlertModal';
import ToastModal from './components/common/ToastModal';
import { Box } from '@mui/system';
import './App.css';
const App = () => {
  return (
    <Box>
      <AlertModal />
      <ToastModal />
      <Router />
    </Box>
  );
};

export default App;
