import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const RightBriefTable = ({ data }) => {
  const columns = [
    { field: "name", headerName: "Name", width: 125 },
    { field: "value", headerName: "Value", width: 100 },
  ];

  return (
    <Grid marginTop="2rem" item xs={12}>
      <Box style={{ height: 450, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Market Details
        </Typography>
        <DataGrid
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "#555",
            background: "#f7f7f7",
          }}
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

export default RightBriefTable;
