import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router';

const Block = () => {
  const { blockId } = useParams();
  return (
    <Box>
      <Typography variant='h4' sx={{ fontWeight: '500' }}>
        Block details
      </Typography>
      {blockId}
    </Box>
  );
};

export default Block;
