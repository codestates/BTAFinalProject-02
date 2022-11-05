import React from "react";
import { Grid, Typography } from "@mui/material";
import DashBoardCard from "../components/DashBoardCard";
import LastTransactions from "../components/LastTransactions";
import LastBlocks from "../components/LastBlocks";

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
          <DashBoardCard title="Blockheight" text={data.blockheight} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashBoardCard title="Finalized Blockheight" text={data.finalizedBlockheight} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashBoardCard title="Total Supply" text={data.txLastOneDay} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashBoardCard title="Transactions In The Last 24h" text={data.txSupply} />
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
