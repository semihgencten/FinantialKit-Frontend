import { Box } from "@mui/material";
// import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { CountryDropdown } from "@/pages/MarketsPage/sections";
import { IndexDropdown } from "./sections";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const columns = [
  { field: "symbol", headerName: "Symbol", width: 120 },
  {
    field: "companyName",
    headerName: "Name",
    width: 250,
    renderCell: (params) => (
      <Link to="/equities/NVDA/overview">{params.value}</Link>
    ),
  },
  { field: "lastprice", headerName: "Last", width: 150 },
  { field: "changeAmount", headerName: "Change", width: 150 },
  { field: "changePercentage", headerName: "Change (%)", width: 150 },
  { field: "volume", headerName: "Volume", width: 150 },
];

const rows = [
  {
    id: 1,
    symbol: "NVDA",
    companyName: "Nvidia",
    lastprice: 100,
    changeAmount: -20,
    changePercentage: "-0.71%",
    volume: 15600,
  },
  {
    id: 2,
    symbol: "AAPL",
    companyName: "Apple Inc.",
    lastprice: 150,
    changeAmount: 5,
    changePercentage: "+0.03%",
    volume: 25000,
  },
  {
    id: 3,
    symbol: "AMZN",
    companyName: "Amazon.com Inc.",
    lastprice: 3200,
    changeAmount: -15,
    changePercentage: "-0.47%",
    volume: 18000,
  },
  {
    id: 4,
    symbol: "TSLA",
    companyName: "Tesla, Inc.",
    lastprice: 800,
    changeAmount: 30,
    changePercentage: "+0.15%",
    volume: 35000,
  },
  {
    id: 5,
    symbol: "MSFT",
    companyName: "Microsoft Corporation",
    lastprice: 250,
    changeAmount: 10,
    changePercentage: "+0.04%",
    volume: 20000,
  },
  {
    id: 6,
    symbol: "GOOGLE",
    companyName: "Alphabet Inc. (Google)",
    lastprice: 2000,
    changeAmount: -25,
    changePercentage: "-1.25%",
    volume: 22000,
  },
  {
    id: 7,
    symbol: "META",
    companyName: "Facebook, Inc.",
    lastprice: 300,
    changeAmount: -7,
    changePercentage: "-0.36%",
    volume: 18000,
  },
  {
    id: 8,
    symbol: "BABA",
    companyName: "Alibaba Group Holding Limited",
    lastprice: 200,
    changeAmount: 8,
    changePercentage: "+0.60%",
    volume: 28000,
  },
  {
    id: 9,
    symbol: "JNJ",
    companyName: "Johnson & Johnson",
    lastprice: 170,
    changeAmount: -3,
    changePercentage: "-0.02%",
    volume: 15000,
  },
  {
    id: 10,
    symbol: "V",
    companyName: "Visa Inc.",
    lastprice: 220,
    changeAmount: 12,
    changePercentage: "+0.55%",
    volume: 19000,
  },
];

const MarketsPage = () => {
  return (
    <div>
      <Box sx={{ textAlign: "center" }}>
        <h2>Markets Page</h2>;
      </Box>
      <div>
        <CountryDropdown></CountryDropdown>
        <IndexDropdown></IndexDropdown>
      </div>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="text">Add To Watchlist</Button>
          <Button variant="contained">Add To Portfolio</Button>
        </Stack>
      </div>
    </div>
  );
};

export default MarketsPage;
