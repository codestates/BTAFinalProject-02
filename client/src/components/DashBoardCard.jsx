import React from "react";
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

const DashBoardCard = ({ title, text, rows }) => {
  return (
    <Card sx={{ width: "100%", overflow: "hidden" }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        {title === "Last Transactions" || title === "Last Blocks" ? (
          <TableContainer sx={{ mt: 1 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {rows && rows.map((row) => (
                  <TableRow
                    key={row.txid}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.txid}
                    </TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.sender}</TableCell>
                    <TableCell align="right">{row.recipient}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.fee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h4" color="inherit">
            {text}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DashBoardCard;
