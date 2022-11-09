import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useToast from '../hooks/useToast';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton, Link, Tooltip } from '@mui/material';

const linkList = {
  blockid: 'block',
  previousBlockId: 'block',
  transactionid: 'transaction',
  height: 'block',
  sender: 'account',
  recipient: 'account',
};

const DataTable = ({ title, rows, columns }) => {
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader size='small' aria-label={title}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ width: column.width, minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} sx={{ py: 1 }}>
                        {linkList[column.id] ? (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link href={`/${linkList[column.id]}/${value}`} underline='hover'>
                              {truncate(value)}
                            </Link>
                            <Tooltip title='클립보드에 복사'>
                              <IconButton size='small' aria-label='copy text' onClick={(e) => copyText(e, value)} sx={{ ml: '4px' }}>
                                <ContentCopyIcon style={{ fontSize: '14px' }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        ) : column.format && typeof value === 'number' ? (
                          column.format(value)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;
