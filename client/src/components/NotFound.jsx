import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import NotFoundImg from '../assets/img/empty-box.png';
const NotFound = ({ text }) => {
  return (
    <Box sx={{ paddingTop: '120px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img src={NotFoundImg} alt='Not Found' width='300px' />
      </Box>
      <Typography sx={{ mt: '36px', fontWeight: 'bold' }} align='center' variant='h4'>
        {text}
      </Typography>
    </Box>
  );
};

export default NotFound;
