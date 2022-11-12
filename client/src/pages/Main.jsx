import React from "react";
import { Grid, Typography } from "@mui/material";
import LastTransactions from "../components/dashboard/LastTransactions";
import LastBlocks from "../components/dashboard/LastBlocks";

const Main = () => {
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "500", letterSpacing: "1px" }}
          >
            Dashboard
          </Typography>
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
