import React from 'react';
import Router from './Router';
import AlertModal from './components/common/AlertModal';

const App = () => {
  return (
    <>
      <AlertModal />
      <Router />
    </>
  );
};

export default App;
