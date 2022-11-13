import { Paper, Typography, IconButton, Tooltip, Divider, Pagination } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import DataTable from '../components/DataTable';
import { getAccountInfo, getAccountTransactions } from '../hooks/useAxios';
import { BeddowsToLSK, timestampToDate } from '../utils/conversion-utils';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useToast from '../hooks/useToast';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { useSearchParams } from 'react-router-dom';
import NotFound from '../components/NotFound';

const columns = [
  { id: 'transactionid', label: 'Transaction ID', minWidth: 180 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'sender', label: 'Sender', minWidth: 180 },
  { id: 'recipient', label: 'Recipient', minWidth: 180 },
  { id: 'blockid', label: 'Block ID', minWidth: 180 },
  { id: 'amount', label: 'Amount', minWidth: 100 },
  { id: 'fee', label: 'Fee', minWidth: 100 },
];

const createCellData = (transactionid, date, sender, recipient, blockid, tempAmount, tempFee) => {
  const amount = `${BeddowsToLSK(tempAmount)} LSK`;
  const fee = `${BeddowsToLSK(tempFee)} LSK`;
  return { transactionid, date, sender, recipient, blockid, amount, fee };
};

const Account = () => {
  const { address } = useParams();
  const { setToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const accountQuery = useQuery(['account', address], () => getAccountInfo(address));
  const transactionQuery = useQuery(['accountTransaction', address, Number(page)], () => getAccountTransactions(address, Number(page)));
  useEffect(() => {
    const transactionList = [];
    transactionQuery.data?.data.transactions.forEach((transaction) => {
      transactionList.push(createCellData(transaction.id, '', transaction.senderAddress, transaction.recipientAddress, transaction.blockID, transaction.amount, transaction.fee));
    });
    setPageCount(transactionQuery.data?.data.count ? Math.ceil(transactionQuery.data?.data.count / 20) : 1);
    setRows(transactionList);
  }, [transactionQuery.data]);
  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: 1 });
    }
    setPage(Number(searchParams.get('page')));
    transactionQuery.refetch();
  }, [searchParams, page]);
  const handlePaginationChange = (e, value) => {
    setSearchParams({ page: value });
  };
  const copyText = (e, text) => {
    e.stopPropagation();
    setToast('클립보드에 복사되었습니다.');
    navigator.clipboard.writeText(text);
  };

  if (accountQuery.isLoading || transactionQuery.isLoading) {
    return <LoadingSpinner />;
  }
  if (accountQuery.isError || !accountQuery.data?.data) {
    return <NotFound text='해당 계정을 찾을 수 없습니다. 확인 부탁드립니다.' />;
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
            {accountQuery.data?.data.address}
            <Tooltip title='클립보드에 복사'>
              <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, accountQuery.data?.data.address)} sx={{ ml: '4px' }}>
                <ContentCopyIcon style={{ fontSize: '14px' }} />
              </IconButton>
            </Tooltip>
          </p>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flexBasis: '33.33%' }}>
            <Typography variant='subtitle2'>Total Balance</Typography>
            <p>{`${BeddowsToLSK(accountQuery.data?.data.token.balance)} LSK`}</p>
          </Box>
          <Box sx={{ flexBasis: '33.33%' }}>
            <Typography variant='subtitle2'>Nonce</Typography>
            <p>{accountQuery.data?.data.sequence.nonce}</p>
          </Box>
          <Box sx={{ flexBasis: '33.33%' }}>
            <Typography variant='subtitle2'>Transaction</Typography>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <NorthIcon style={{ fontSize: '18px', color: 'red' }} />
              <span style={{ marginLeft: '6px', marginRight: '16px' }}>{accountQuery.data?.data.transactionCount.out}</span>
              <SouthIcon style={{ fontSize: '18px', color: 'green' }} />
              <span style={{ marginLeft: '6px' }}>{accountQuery.data?.data.transactionCount.in}</span>
            </p>
          </Box>
        </Box>
      </Paper>
      <Box sx={{ mt: 2 }}>
        <DataTable title='Transactions Table' rows={rows} columns={columns} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <Pagination count={pageCount} page={page} onChange={handlePaginationChange} showFirstButton showLastButton variant='outlined' shape='rounded' color='primary' />
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
