import { Paper, Typography, IconButton, Tooltip, Divider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router';
import useToast from '../hooks/useToast';

const Transaction = () => {
  const { transactionId } = useParams();
  const { setToast } = useToast();
  const truncate = (input) => {
    if (input.length > 15) return `${input.slice(0, 8)}...${input.slice(-7)}`;
    return input;
  };
  const copyText = (e, text) => {
    e.stopPropagation();
    setToast('클립보드에 복사되었습니다.');
    navigator.clipboard.writeText(text);
  };
  return (
    <Box>
      <Typography variant='h4' sx={{ fontWeight: '500' }}>
        Transaction details
      </Typography>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Box>
          <Typography variant='subtitle2'>Transaction ID</Typography>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            {transactionId}
            <Tooltip title='클립보드에 복사'>
              <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, transactionId)} sx={{ ml: '4px' }}>
                <ContentCopyIcon style={{ fontSize: '14px' }} />
              </IconButton>
            </Tooltip>
          </p>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant='subtitle2'>Sender</Typography>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            lskuodshspomsdv7sdtn8kwyasyachzoqhwkjqkdy
            <Tooltip title='클립보드에 복사'>
              <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, 'lskuodshspomsdv7sdtn8kwyasyachzoqhwkjqkdy')} sx={{ ml: '4px' }}>
                <ContentCopyIcon style={{ fontSize: '14px' }} />
              </IconButton>
            </Tooltip>
          </p>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant='subtitle2'>Recipient</Typography>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            lskuodshspomsdv7sdtn8kwyasyachzoqhwkjqkdy
            <Tooltip title='클립보드에 복사'>
              <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, 'lskuodshspomsdv7sdtn8kwyasyachzoqhwkjqkdy')} sx={{ ml: '4px' }}>
                <ContentCopyIcon style={{ fontSize: '14px' }} />
              </IconButton>
            </Tooltip>
          </p>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant='subtitle2'>Message</Typography>
          <p style={{ display: 'flex', alignItems: 'center' }}>나나나나나나</p>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Amount of transaction</Typography>
            <p>1,268.898 LSK</p>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Transaction Fee</Typography>
            <p>0.002 LSK</p>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Amount of transaction</Typography>
            <p>1,268.898 LSK</p>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Transaction Fee</Typography>
            <p>0.002 LSK</p>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Block Id</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              {truncate('ed567bbbdc1ffe9904b45f1f70d33b4f04457b8bbaf7eaf67396dfb33ade2dd5')}
              <Tooltip title='클립보드에 복사'>
                <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, 'ed567bbbdc1ffe9904b45f1f70d33b4f04457b8bbaf7eaf67396dfb33ade2dd5')} sx={{ ml: '4px' }}>
                  <ContentCopyIcon style={{ fontSize: '14px' }} />
                </IconButton>
              </Tooltip>
            </p>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Block height</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              20054831
              <Tooltip title='클립보드에 복사'>
                <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, '20054831')} sx={{ ml: '4px' }}>
                  <ContentCopyIcon style={{ fontSize: '14px' }} />
                </IconButton>
              </Tooltip>
            </p>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Confimations</Typography>
            <p>63881</p>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Date</Typography>
            <p>08 Nov 2022, 05:01:50 PM</p>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Transaction;
