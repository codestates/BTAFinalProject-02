import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const DashBoardCard = ({ title, text }) => {
  return (
    <Card sx={{ width: "100%", overflow: "hidden" }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4" color="inherit">
            {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashBoardCard;
