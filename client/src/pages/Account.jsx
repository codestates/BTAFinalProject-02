import { Paper, Typography, IconButton, Tooltip, Divider, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getAccountInfo, getAccountTransactions } from '../hooks/useAxios';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useToast from '../hooks/useToast';

const Account = () => {
  const { address } = useParams();
  const { setToast } = useToast();

  const { data, isLoading } = useQuery(['block', address], () => getAccountInfo(address));
  console.log(data);
  const copyText = (e, text) => {
    e.stopPropagation();
    setToast('클립보드에 복사되었습니다.');
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Typography variant='h4' sx={{ fontWeight: '500' }}>
        Account
      </Typography>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Box>
          <Typography variant='subtitle2'>Address</Typography>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            {data?.data.address}
            <Tooltip title='클립보드에 복사'>
              <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, data?.data.address)} sx={{ ml: '4px' }}>
                <ContentCopyIcon style={{ fontSize: '14px' }} />
              </IconButton>
            </Tooltip>
          </p>
        </Box>
        <Divider />
      </Paper>
    </Box>
  );
};

export default Account;
