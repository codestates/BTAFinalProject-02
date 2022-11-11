import React, { useEffect, useState } from "react";
import { Link, goTo } from "react-chrome-extension-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Home from "./Home";
import Layout from "../components/layout/Layout";
import { useInput } from "../hooks/useInput";
import { getAccount, sendTransaction } from "../utils/storage";
import { transactions } from "@liskhq/lisk-client";

const Transaction = () => {
  const [sendAmount, onChangeSendAmount] = useInput("");
  const [recipientAddress, onChangeRecipientAddress] = useInput("");
  const [account, changeAccount] = useState({});
  const onClickSubmit = () => {
    sendTransaction(recipientAddress, sendAmount, (res) => {
      if (res) goTo(Home);
    });
  };

  useEffect(() => {
    getAccount((res) => {
      changeAccount(res);
    });
  }, []);
  return (
    <Layout>
      <div style={{ marginTop: "16px", position: "relative" }}>
        <Link component={Home}>
          <ArrowBackIcon style={{ width: "16px", marginLeft: "30px" }} />
        </Link>
        <span
          style={{
            fontSize: "20px",
            position: "absolute",
            left: "150px",
            fontWeight: "bolder",
          }}
        >
          보내기
        </span>
        <hr style={{ marginTop: "17px", backgroundColor: "#dada" }} />
      </div>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <TextField
          required
          label="받는 주소"
          onChange={onChangeRecipientAddress}
          id="outlined-required"
          defaultValue=""
          style={{ margin: "10px auto", width: "280px" }}
        />
        <TextField
          id="outlined-number"
          label="LSK 수량"
          type="number"
          onChange={onChangeSendAmount}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ margin: "10px auto", width: "280px" }}
          helperText={
            <h5 style={{ margin: 0 }}>
              나의 잔액 :{" "}
              {account.balance
                ? transactions.convertBeddowsToLSK(account.balance)
                : ""}{" "}
              LSK
            </h5>
          }
        />
        <div style={{ paddingTop: "10px" }}>
          <Button variant="contained" onClick={onClickSubmit}>
            확인
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Transaction;
