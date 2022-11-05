import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { id: 'sender', label: 'Sender', width: 180 },
  { id: 'recipient', label: 'Recipient', width: 180 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'amount', label: 'Amount', minWidth: 100 },
  { id: 'fee', label: 'Fee', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
];

const createCellData = (sender, recipient, date, amount, fee, status) => {
  return { sender, recipient, date, amount, fee, status };
};

const rows = [
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
  createCellData('e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6', 'lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f', '5/11/2022 - 08:00:10', '2.84878587 LSK', '0.0025 LSK', 'suceess'),
];

const Transaction = () => {
  return (
    <Box>
      <Typography variant='h4' sx={{ fontWeight: '500', letterSpacing: '1px' }}>
        Transactions
      </Typography>
      <Box sx={{ mt: '12px' }}>
        <DataTable title='Blocks Table' rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Transaction;
