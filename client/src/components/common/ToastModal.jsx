import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import useToast from '../../hooks/useToast';
const ToastModal = () => {
  const { text } = useToast();
  const { setToast } = useToast();

  return <Snackbar open={text ? true : false} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={() => setToast('')} message={text} />;
};

export default ToastModal;
