import React from 'react';
import { Button, Toolbar, AppBar, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

const AppHeader = () => {
  const navigate = useNavigate();
  const moveToDashboard = () => navigate('/');

  return (
    <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#101F33' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title='대시보드'>
            <Button variant='text' size='small' onClick={moveToDashboard}>
              Lisk
            </Button>
          </Tooltip>
        </Box>

        <Box>
          <Tooltip title='회원가압'>
            <Button variant='contained' size='small'>
              회원가입
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
