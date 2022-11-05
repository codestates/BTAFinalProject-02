import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router';

const Transaction = () => {
  const { transactionId } = useParams();
  return (
    <Box>
      <Typography variant='h4' sx={{ fontWeight: '500' }}>
        Transaction details
      </Typography>
      {transactionId}
    </Box>
  );
};

export default Transaction;
