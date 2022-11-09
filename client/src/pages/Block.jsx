import { Paper, Typography, IconButton, Tooltip, Divider, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getBlockByHeight, getBlockById } from '../hooks/useAxios';
import { BeddowsToLSK, timestampToDate } from '../utils/conversion-utils';
import useToast from '../hooks/useToast';

const columns = [
  { id: 'index', label: 'Index' },
  { id: 'transactionId', label: 'Transaction ID' },
];

const Block = () => {
  const { id } = useParams();
  const { setToast } = useToast();

  const { data, isLoading } = useQuery(['block', id], () => (id.length <= 8 ? getBlockByHeight(Number(id)) : getBlockById(id)));
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
        Block details
      </Typography>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Box>
          <Typography variant='subtitle2'>Block ID</Typography>
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
            <Typography variant='subtitle2'>Height</Typography>
            <p>{data?.data.height}</p>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Max Height Previously Forged</Typography>
            <p>{data?.data.maxHeightPreviouslyForged}</p>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Previous Block ID</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              {truncate(data?.data.previousBlockID)}
              <Tooltip title='클립보드에 복사'>
                <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, data?.data.previousBlockID)} sx={{ ml: '4px' }}>
                  <ContentCopyIcon style={{ fontSize: '14px' }} />
                </IconButton>
              </Tooltip>
            </p>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Seed Reveal</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              {truncate(data?.data.seedReveal)}
              <Tooltip title='클립보드에 복사'>
                <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, data?.data.seedReveal)} sx={{ ml: '4px' }}>
                  <ContentCopyIcon style={{ fontSize: '14px' }} />
                </IconButton>
              </Tooltip>
            </p>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Reward</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>{`${BeddowsToLSK(data?.data.reward)} LSK`}</p>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography variant='subtitle2'>Timestamp</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>{timestampToDate(new Date(data?.data.timestamp))}</p>
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
        <TableContainer>
          <Table stickyHeader aria-label='Transaction List'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align='center'>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.payload.map((item, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell align='center'>{index + 1}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link href={`/transaction/${item}`} underline='hover'>
                          {truncate(item)}
                          <Tooltip title='클립보드에 복사'>
                            <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, item)} sx={{ ml: '4px' }}>
                              <ContentCopyIcon style={{ fontSize: '14px' }} />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Block;
