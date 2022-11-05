import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import useToast from '../../hooks/useToast';
const ToastModal = () => {
  const { text } = useToast();
  const { setToast } = useToast();

  if (text) {
    return <Snackbar open anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setToast('')} message={text} />;
  } else {
    return <></>;
  }
};

export default ToastModal;
