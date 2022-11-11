import React, { useEffect, useState } from "react";
import "./App.css";
import { Router } from "react-chrome-extension-router";
import CreatePassword from "./pages/CreatePassword";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { haveWallet, isLocked } from "./utils/storage";

const App = () => {
  const [walletExist, changeWalletExist] = useState(false);
  const [locked, changeLocked] = useState(true);
  const init = () => {
    haveWallet((res) => {
      changeWalletExist(res);
      if (res)
        isLocked((res) => {
          changeLocked(res);
        });
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Router>
      {walletExist ? !locked ? <Home /> : <LoginPage /> : <CreatePassword />}
    </Router>
  );
};

export default App;
