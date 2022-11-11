import { Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DataTable from '../components/DataTable';
import { getBlockList } from '../hooks/useAxios';
import { BeddowsToLSK, timestampToDate } from '../utils/conversion-utils';

const columns = [
  { id: 'height', label: 'Height', minWidth: 170 },
  { id: 'blockid', label: 'Block ID', minWidth: 170 },
  { id: 'previousBlockId', label: 'Previous Block ID', minWidth: 170 },
  { id: 'date', label: 'Updated At', minWidth: 170 },
  { id: 'transactionCount', label: 'Transactions', minWidth: 170 },
  { id: 'reward', label: 'Reward', minWidth: 170 },
];

const createCellData = (height, blockid, previousBlockId, timestamp, transactionCount, tempReward) => {
  const date = timestampToDate(new Date(timestamp));
  const reward = `${BeddowsToLSK(tempReward)} LSK`;
  return { height, blockid, previousBlockId, date, transactionCount, reward };
};

const Blocks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const { data, isLoading, refetch } = useQuery(['block-list', Number(page)], () => getBlockList(Number(page)));
  useEffect(() => {
    const blockList = [];
    data?.data.blocks.forEach((block) => {
      blockList.push(createCellData(block.height, block.id, block.previousBlockID, block.timestamp, block.payload.length, block.reward));
    });
    setPageCount(data?.data.count ? Math.ceil(data?.data.count / 20) : 1);
    setRows(blockList);
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
        Blocks
      </Typography>
      <Box sx={{ mt: '12px' }}>
        <DataTable title='Blocks Table' rows={rows} columns={columns} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <Pagination count={pageCount} page={page} onChange={handlePaginationChange} showFirstButton showLastButton variant='outlined' shape='rounded' color='primary' />
        </Box>
      </Box>
    </Box>
  );
};

export default Blocks;
