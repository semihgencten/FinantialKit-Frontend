import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const LeftBriefTable = ({ data }) => {
  const columns = [
    { field: "name", headerName: "Name", width: 250 },
    { field: "value", headerName: "Value", width: 250 },
  ];

  return (
    <Grid marginTop="2rem" item xs={6}>
      <Box style={{ height: 450, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Moving Averages
        </Typography>
        <DataGrid
          rows={data}
          columns={columns}
          disableColumnMenu
          disableColumnSelector
          disableSelectionOnClick
          autoHeight
          hideFooter
        />
      </Box>
    </Grid>
  );
};

export default LeftBriefTable;
