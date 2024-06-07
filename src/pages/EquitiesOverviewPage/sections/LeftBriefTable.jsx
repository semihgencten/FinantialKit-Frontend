// File path: src/pages/sections/LeftBriefTable.js

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const LeftBriefTable = ({ data }) => {
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "value", headerName: "Value", width: 200 },
  ];

  return (
    <Box style={{ height: 500, width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Moving Averages
      </Typography>
      <DataGrid
        rows={data}
        columns={columns}
        disableColumnMenu
        disableColumnSelector
        disableSelectionOnClick
        hideFooter
      />
    </Box>
  );
};

export default LeftBriefTable;
