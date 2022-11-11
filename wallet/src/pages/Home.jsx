import React, { useEffect, useState } from "react";
import { Link } from "react-chrome-extension-router";
import Button from "@mui/material/Button";
import Layout from "../components/layout/Layout";
import Transaction from "./Transaction";
import { getAccount } from "../utils/storage";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { transactions } from "@liskhq/lisk-client";

const Home = () => {
  const [account, changeAccount] = useState({});

  useEffect(() => {
    getAccount((res) => {
      console.log(res);
      changeAccount(res);
    });
  }, []);
  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginTop: "20px" }}>
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontWeight: "bolder",
                fontSize: "16px",
                marginLeft: "20px",
              }}
            >
              Account
            </span>
            <div
              style={{
                cursor: "pointer",
                fontSize: "16px",
                marginRight: "20px",
                lineHeight: "16px",
                verticalAlign: "middle",
              }}
            >
              {account.address
                ? account.address.slice(0, 8) +
                  "..." +
                  account.address.slice(-7)
                : ""}
              <ContentCopyIcon onClick={() => copyInvoice(invoice)} />
            </div>
          </span>
          <hr style={{ marginTop: "20px", backgroundColor: "#dada" }} />
        </div>
        <div style={{ marginTop: "45px" }}>
          <img width="50px" height="50px" src="lisk.png" alt="lisk gas" />
          <h2>LSK</h2>
          <h3>
            {account.balance
              ? transactions.convertBeddowsToLSK(account.balance).toString()
              : "0"}{" "}
            LSK
          </h3>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link component={Transaction} style={{ textDecoration: "none" }}>
          <Button variant="contained">전송</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
