import { Paper, Typography, IconButton, Tooltip, Divider, Link } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getTransactionById } from '../hooks/useAxios';
import { BeddowsToLSK, timestampToDate } from '../utils/conversion-utils';
import useToast from '../hooks/useToast';

const Transaction = () => {
  const { id } = useParams();
  const { setToast } = useToast();

  const { data, isLoading } = useQuery(['transaction', id], () => getTransactionById(id));
  console.log(data);

  const truncate = (input) => {
    if (input.length > 15) return `${input.slice(0, 8)}...${input.slice(-7)}`;
    return input;
  };
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
        Transaction details
      </Typography>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Box>
          <Typography variant='subtitle2'>Transaction ID</Typography>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            {data?.data.id}
            <Tooltip title='클립보드에 복사'>
              <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, data?.data.id)} sx={{ ml: '4px' }}>
                <ContentCopyIcon style={{ fontSize: '14px' }} />
              </IconButton>
            </Tooltip>
          </p>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Sender Address</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <Link href={`/account/${data?.data.senderAddress}`} underline='hover'>
                {data?.data.senderAddress}
              </Link>
              <Tooltip title='클립보드에 복사'>
                <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, data?.data.senderAddress)} sx={{ ml: '4px' }}>
                  <ContentCopyIcon style={{ fontSize: '14px' }} />
                </IconButton>
              </Tooltip>
            </p>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Sender Publickey</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              {truncate(data?.data.senderPublicKey)}
              <Tooltip title='클립보드에 복사'>
                <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, data?.data.senderPublicKey)} sx={{ ml: '4px' }}>
                  <ContentCopyIcon style={{ fontSize: '14px' }} />
                </IconButton>
              </Tooltip>
            </p>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Recipient Address</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <Link href={`/account/${data?.data.recipientAddress}`} underline='hover'>
                {data?.data.recipientAddress}
              </Link>
              <Tooltip title='클립보드에 복사'>
                <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, data?.data.recipientAddress)} sx={{ ml: '4px' }}>
                  <ContentCopyIcon style={{ fontSize: '14px' }} />
                </IconButton>
              </Tooltip>
            </p>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Recipient Publickey</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              {data?.data.recipientPublicKey && (
                <>
                  {truncate(data?.data.recipientPublicKey)}
                  <Tooltip title='클립보드에 복사'>
                    <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, data?.data.recipientPublicKey)} sx={{ ml: '4px' }}>
                      <ContentCopyIcon style={{ fontSize: '14px' }} />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </p>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant='subtitle2'>Message</Typography>
          <p style={{ display: 'flex', alignItems: 'center' }}>{data?.data.data ? data?.data.data : 'no data'}</p>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Amount of transaction</Typography>
            <p>{`${BeddowsToLSK(data?.data.amount)} LSK`}</p>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Transaction Fee</Typography>
            <p>{`${BeddowsToLSK(data?.data.fee)} LSK`}</p>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Block Id</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <Link href={`/block/${data?.data.blockID}`} underline='hover'>
                {truncate(data?.data.blockID)}
              </Link>
              <Tooltip title='클립보드에 복사'>
                <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, data?.data.blockID)} sx={{ ml: '4px' }}>
                  <ContentCopyIcon style={{ fontSize: '14px' }} />
                </IconButton>
              </Tooltip>
            </p>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Block height</Typography>
            <p>
              <Link href={`/block/${data?.data.blockHeight}`} underline='hover'>
                {data?.data.blockHeight}
              </Link>
            </p>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Timestamp</Typography>
            <p>{data?.data.timestamp ? timestampToDate(new Date(data?.data.timestamp)) : ''}</p>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Transaction;
