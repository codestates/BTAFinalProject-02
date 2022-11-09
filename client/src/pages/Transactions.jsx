import { Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import DataTable from '../components/DataTable';
import { getTransactionList } from '../hooks/useAxios';
import { BeddowsToLSK, timestampToDate } from '../utils/conversion-utils';
import LoadingSpinner from '../components/common/LoadingSpinner';

const columns = [
  { id: 'transactionid', label: 'Transaction ID', width: 180 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'sender', label: 'Sender', width: 180 },
  { id: 'recipient', label: 'Recipient', width: 180 },
  { id: 'blockid', label: 'Block ID', width: 180 },
  { id: 'amount', label: 'Amount', minWidth: 100 },
  { id: 'fee', label: 'Fee', minWidth: 100 },
];

const createCellData = (transactionid, date, sender, recipient, blockid, tempAmount, tempFee) => {
  const amount = `${BeddowsToLSK(tempAmount)} LSK`;
  const fee = `${BeddowsToLSK(tempFee)} LSK`;
  return { transactionid, date, sender, recipient, blockid, amount, fee };
};

const Transactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const { data, isLoading, refetch } = useQuery(['transaction-list', 0], () => getTransactionList(0));
  useEffect(() => {
    const transactionList = [];
    data?.data.transactions.forEach((transaction) => {
      transactionList.push(createCellData(transaction.id, '', transaction.senderAddress, transaction.recipientAddress, transaction.blockID, transaction.amount, transaction.fee));
    });
    setPageCount(data?.data.count ? Math.ceil(data?.data.count / 20) : 1);
    setRows(transactionList);
  }, [data]);
  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: 1 });
    }
    setPage(Number(searchParams.get('page')));
    refetch();
  }, [searchParams, page]);
  const handlePaginationChange = (e, value) => {
    setSearchParams({ page: value });
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Typography variant='h4' sx={{ fontWeight: '500', letterSpacing: '1px' }}>
        Transactions
      </Typography>
      <Box sx={{ mt: '12px' }}>
        <DataTable title='Transactions Table' pageId='transaction' rows={rows} columns={columns} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <Pagination count={pageCount} page={page} onChange={handlePaginationChange} showFirstButton showLastButton variant='outlined' shape='rounded' color='primary' />
        </Box>
      </Box>
    </Box>
  );
};

export default Transactions;
