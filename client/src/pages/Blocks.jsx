import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DataTable from '../components/DataTable';
import { getBlockList } from '../hooks/useAxios';

const columns = [
  { id: 'blockid', label: 'Block ID', minWidth: 170 },
  { id: 'height', label: 'Height', minWidth: 170 },
  { id: 'previousBlockId', label: 'Previous Block ID', minWidth: 170 },
  { id: 'updatedAt', label: 'Updated At', minWidth: 170 },
  { id: 'reward', label: 'Reward', minWidth: 170 },
];

const createCellData = (blockid, height, previousBlockId, updatedAt, reward) => {
  return { blockid, height, previousBlockId, updatedAt, reward };
};
const Blocks = () => {
  const { data, isLoading } = useQuery(['block-list', 1], () => getBlockList(1));
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const blockList = [];
    data?.data.blocks.forEach((block) => {
      blockList.push(createCellData(block.id, block.height, block.previousBlockID, block.updatedAt, block.reward));
    });
    setRows(blockList);
  }, [data]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Box>
      <Typography variant='h4' sx={{ fontWeight: '500', letterSpacing: '1px' }}>
        Blocks
      </Typography>
      <Box sx={{ mt: '12px' }}>
        <DataTable title='Blocks Table' pageId='block' rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Blocks;
