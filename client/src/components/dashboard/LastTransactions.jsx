import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { BeddowsToLSK } from "../../utils/conversion-utils";
import LoadingSpinner from "../common/LoadingSpinner";
import { getTransactionList } from "../../hooks/useAxios";
import useToast from "../../hooks/useToast";

const createCellData = (
  txId,
  timestamp,
  sender,
  recipient,
  tempAmount,
  tempFee
) => {
  const now = new Date();
  const currentTime = Math.floor(now.getTime() / 1000);
  const interval = currentTime - timestamp;

  let dateText;
  if (interval < 60) dateText = Math.floor(interval) + " 초 전";
  else if (interval < 60 * 60) dateText = Math.floor(interval / 60) + " 분 전";
  else if (interval < 60 * 60 * 24)
    dateText = Math.floor(interval / (60 * 60)) + " 시간 전";
  else dateText = Math.floor(interval / (60 * 60 * 24)) + " 일 전";

  const amount = `${BeddowsToLSK(tempAmount)} LSK`;
  const fee = `${BeddowsToLSK(tempFee)} LSK`;
  return { txId, date: dateText, sender, recipient, amount, fee };
};

const LastTransactions = () => {
  const [rows, setRows] = useState([]);
  const { setToast } = useToast();
  const { data, isLoading } = useQuery(["transaction-list", Number(1)], () =>
    getTransactionList(Number(1))
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

  const copyText = (e, text) => {
    e.stopPropagation();
    setToast("클립보드에 복사되었습니다.");
    navigator.clipboard.writeText(text);
  };

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
          <TableContainer sx={{ mt: 1, maxHeight: 550 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {rows &&
                  rows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <>
                        <TableCell component="th" scope="row">
                          <SyncAltIcon />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Link
                            href={`/transaction/${row.txId}`}
                            underline="hover"
                          >
                            {row.txId.slice(0, 8)}...
                            {row.txId.slice(-7)}
                          </Link>
                          <Tooltip title="클립보드에 복사">
                            <IconButton
                              size="small"
                              aria-label="copy text"
                              onClick={(e) => copyText(e, row.txId)}
                              sx={{ ml: "4px" }}
                            >
                              <ContentCopyIcon style={{ fontSize: "14px" }} />
                            </IconButton>
                          </Tooltip>
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
                          <Tooltip title="클립보드에 복사">
                            <IconButton
                              size="small"
                              aria-label="copy text"
                              onClick={(e) => copyText(e, row.recipient)}
                              sx={{ ml: "4px" }}
                            >
                              <ContentCopyIcon style={{ fontSize: "14px" }} />
                            </IconButton>
                          </Tooltip>
                          <br />
                          to : &nbsp;
                          <Link
                            href={`/account/${row.sender}`}
                            underline="hover"
                          >
                            {row.sender.slice(0, 8)}...${row.sender.slice(-7)}
                          </Link>
                          <Tooltip title="클립보드에 복사">
                            <IconButton
                              size="small"
                              aria-label="copy text"
                              onClick={(e) => copyText(e, row.sender)}
                              sx={{ ml: "4px" }}
                            >
                              <ContentCopyIcon style={{ fontSize: "14px" }} />
                            </IconButton>
                          </Tooltip>
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
