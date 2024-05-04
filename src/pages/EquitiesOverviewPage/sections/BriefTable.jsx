import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const BriefTable = ({ data }) => {
  const leftColumns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "value", headerName: "Value", width: 200 },
  ];

  const rightColumns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "value", headerName: "Value", width: 200 },
  ];

  return (
    <Grid container spacing={2}>
      <Grid marginTop="2rem" item xs={6}>
        <Box style={{ height: 450, width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            Moving Averages
          </Typography>
          <DataGrid
            rows={data.left}
            columns={leftColumns}
            disableColumnMenu
            disableColumnSelector
            disableSelectionOnClick
            autoHeight
            hideFooter
          />
        </Box>
      </Grid>
      <Grid marginTop="2rem" item xs={6}>
        <Box style={{ height: 450, width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            Market Details
          </Typography>
          <DataGrid
            rows={data.right}
            columns={rightColumns}
            disableColumnMenu
            disableColumnSelector
            disableSelectionOnClick
            autoHeight
            hideFooter
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BriefTable;
