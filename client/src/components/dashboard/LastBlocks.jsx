import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getBlockList } from "../../hooks/useAxios";
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
import EngineeringIcon from "@mui/icons-material/Engineering";
import { BeddowsToLSK } from "../../utils/conversion-utils";
import LoadingSpinner from "../common/LoadingSpinner";
import useToast from "../../hooks/useToast";

const createCellData = (blockid, timestamp, generatorAddress, tempReward) => {
  const now = new Date();
  const currentTime = Math.floor(now.getTime() / 1000);
  const interval = currentTime - timestamp;

  let dateText;
  if (interval <= 0) dateText = "방금 전";
  else if (interval < 60) dateText = Math.floor(interval) + " 초 전";
  else dateText = Math.floor(interval / 60) + " 분 전";

  const reward = `${BeddowsToLSK(tempReward)} LSK`;
  return { blockid, date: dateText, generatorAddress, reward };
};

const LastBlocks = () => {
  const [rows, setRows] = useState([]);
  const { setToast } = useToast();

  const { data, isLoading } = useQuery(["block-list", Number(1)], () =>
    getBlockList(Number(1))
  );

  useEffect(() => {
    const blockList = [];
    data?.data.blocks.forEach((block) => {
      blockList.push(
        createCellData(
          block.id,
          block.timestamp,
          block.generatorAddress,
          block.reward
        )
      );
    });

    setRows(blockList);
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
            최근 생성된 블록
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
                          <EngineeringIcon />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Link
                            href={`/block/${row.blockid}`}
                            underline="hover"
                          >
                            {row.blockid.slice(0, 8)}...{row.blockid.slice(-7)}
                          </Link>
                          <Tooltip title="클립보드에 복사">
                            <IconButton
                              size="small"
                              aria-label="copy text"
                              onClick={(e) => copyText(e, row.blockid)}
                              sx={{ ml: "4px" }}
                            >
                              <ContentCopyIcon style={{ fontSize: "14px" }} />
                            </IconButton>
                          </Tooltip>
                          <br /> {row.date}
                        </TableCell>
                        <TableCell align="left">
                          generated by
                          <br />
                          <Link
                            href={`/account/${row.generatorAddress}`}
                            underline="hover"
                          >
                            {row.generatorAddress.slice(0, 8)}...
                            {row.generatorAddress.slice(-7)}
                          </Link>
                          <Tooltip title="클립보드에 복사">
                            <IconButton
                              size="small"
                              aria-label="copy text"
                              onClick={(e) => copyText(e, row.generatorAddress)}
                              sx={{ ml: "4px" }}
                            >
                              <ContentCopyIcon style={{ fontSize: "14px" }} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="right">{row.reward}</TableCell>
                      </>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button href="/transactions" variant="contained">
              트랜잭션 더 보기
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default LastBlocks;