import React from "react";
import { Grid, Typography } from "@mui/material";
import DashBoardCard from "../components/dashboard/DashBoardCard";
import LastTransactions from "../components/dashboard/LastTransactions";
import LastBlocks from "../components/dashboard/LastBlocks";

const createData = (blockheight, finalizedBlockheight, txLastOneDay, txSupply) => {
  return { blockheight, finalizedBlockheight, txLastOneDay, txSupply };
};

const data = createData("17,748,454", "17,748,279", "146,296,935 Ⱡ", "17");

const Main = () => {
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h4" sx={{ fontWeight: "500", letterSpacing: "1px" }} 
          >
            Dashboard
          </Typography>
        </Grid>

        {/* row 2 */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashBoardCard title="블록 개수" text={data.blockheight} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashBoardCard title="확정 블록 개수" text={data.finalizedBlockheight} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashBoardCard title="총 공급량" text={data.txLastOneDay} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashBoardCard title="최근 24시간 동안 거래 내역" text={data.txSupply} />
        </Grid>

        {/* row 3 */}
        <Grid item xs={12} sm={6} sx={{ mb: -2.25 }}>
          <LastTransactions />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: -2.25 }}>
          <LastBlocks />
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
