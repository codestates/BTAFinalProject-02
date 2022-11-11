import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { BeddowsToLSK, timestampToDate } from "../../utils/conversion-utils";
import LoadingSpinner from "../common/LoadingSpinner";
import { getTransactionList } from "../../hooks/useAxios";

const createCellData = (
  txId,
  timestamp,
  sender,
  recipient,
  tempAmount,
  tempFee
) => {
  const date = timestampToDate(timestamp);
  const amount = `${BeddowsToLSK(tempAmount)} LSK`;
  const fee = `${BeddowsToLSK(tempFee)} LSK`;
  return { transactionid: txId, date, sender, recipient, amount, fee };
};

const LastTransactions = () => {
  const [rows, setRows] = useState([]);
  const { data, isLoading, refetch } = useQuery(
    ["transaction-list", Number(1)],
    () => getTransactionList(Number(1))
  );

  useEffect(() => {
    const transactionList = [];
    data?.data.transactions.forEach((transaction) => {
      transactionList.push(
        createCellData(
          transaction.id,
          transaction.timestamp,
          transaction.senderAddress,
          transaction.recipientAddress,
          transaction.amount,
          transaction.fee
        )
      );
    });
    setRows(transactionList);
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Card sx={{ width: "100%", overflow: "hidden" }}>
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            최근 생성된 트랜잭션
          </Typography>
          <TableContainer sx={{ mt: 1, maxHeight: 440 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {rows &&
                  rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <>
                        <TableCell component="th" scope="row">
                          <SyncAltIcon />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Link
                            href={`/transaction/${row.transactionid}`}
                            underline="hover"
                          >
                            {row.transactionid.slice(0, 8)}...
                            {row.transactionid.slice(-7)}
                          </Link>
                          <br /> {row.date}
                        </TableCell>
                        <TableCell align="left">
                          from : &nbsp;
                          <Link
                            href={`/account/${row.recipient}`}
                            underline="hover"
                          >
                            {row.recipient.slice(0, 8)}...
                            {row.recipient.slice(-7)}
                          </Link>
                          <br />
                          to : &nbsp;
                          <Link
                            href={`/account/${row.sender}`}
                            underline="hover"
                          >
                            {row.sender.slice(0, 8)}...${row.sender.slice(-7)}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <span style={{ fontWeight: "bold" }}>
                            {row.amount}
                          </span>
                          <br /> fee: {row.fee}
                        </TableCell>
                      </>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button href="/transactions" variant="contained">
              블록 더 보기
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default LastTransactions;
