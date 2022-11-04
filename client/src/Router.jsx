import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layout';
import Blocks from './pages/Blocks';
import Main from './pages/Main';
import Transaction from './pages/Transaction';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<MainLayout />}>
          <Route path='' element={<Main />} />
          <Route path='Blocks' element={<Blocks />} />
          <Route path='Transaction' element={<Transaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
