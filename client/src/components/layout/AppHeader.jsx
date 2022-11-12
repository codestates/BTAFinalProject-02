import React, { useState } from 'react';
import { Button, Toolbar, AppBar, Tooltip, FormControl, Select, MenuItem, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import Logo from '../../assets/img/lisk-logo.svg';
import SearchIcon from '@mui/icons-material/Search';

const searchTypes = [
  { value: 'block', text: 'Block' },
  { value: 'transaction', text: 'Transaction' },
  { value: 'account', text: 'Account' },
];

const AppHeader = () => {
  const navigate = useNavigate();
  const moveToDashboard = () => navigate('/');

  const [type, setType] = useState('block');
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSelectChange = (e) => {
    setType(e.target.value);
  };
  const handleTextFieldChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const search = () => navigate(`/${type}/${searchKeyword}`);

  return (
    <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#101F33' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title='대시보드'>
            <Button variant='text' size='small' onClick={moveToDashboard}>
              <img src={Logo} className='filter-white' alt='near pocket logo' width='100px' />
            </Button>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
              <Select sx={{ bgcolor: '#fff', color: '#222' }} id='search-type-select' value={type} onChange={handleSelectChange}>
                {searchTypes.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ m: 1, width: '250px' }} variant='outlined' size='small'>
              <OutlinedInput
                id='search-text-box'
                placeholder='검색'
                value={searchKeyword}
                onChange={handleTextFieldChange}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') search();
                }}
                sx={{ bgcolor: '#fff', color: '#222' }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton aria-label='search' onClick={search} edge='end'>
                      {<SearchIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
