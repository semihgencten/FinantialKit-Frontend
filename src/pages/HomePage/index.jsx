import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "symbol", headerName: "Symbol", width: 120 },
  { field: "companyName", headerName: "Name", width: 200 },
  { field: "lastprice", headerName: "Last", width: 120 },
  {
    field: "changeAmount",
    headerName: "Change",
    width: 100,
    renderCell: (params) => (
      <span style={{ color: params.value >= 0 ? "green" : "red" }}>
        {params.value >= 0 ? `+${params.value}` : params.value}
      </span>
    ),
  },
  {
    field: "changePercentage",
    headerName: "Change (%)",
    width: 100,
    renderCell: (params) => (
      <span style={{ color: params.value.includes("+") ? "green" : "red" }}>
        {params.value}
      </span>
    ),
  },
  { field: "volume", headerName: "Volume", width: 150 },
];
const indicesRows = [
  {
    id: 1,
    symbol: "DJI",
    companyName: "Dow Jones",
    lastprice: 34000,
    changeAmount: -50,
    changePercentage: "-0.15%",
    volume: 10000,
  },
  {
    id: 2,
    symbol: "SPX",
    companyName: "S&P 500",
    lastprice: 4200,
    changeAmount: 10,
    changePercentage: "+0.24%",
    volume: 15000,
  },
  {
    id: 3,
    symbol: "FTSE",
    companyName: "FTSE 100",
    lastprice: 7000,
    changeAmount: 20,
    changePercentage: "+0.29%",
    volume: 12000,
  },
  {
    id: 4,
    symbol: "NIKKEI",
    companyName: "Nikkei 225",
    lastprice: 29000,
    changeAmount: -30,
    changePercentage: "-0.10%",
    volume: 9000,
  },
  {
    id: 5,
    symbol: "HSI",
    companyName: "Hang Seng",
    lastprice: 29000,
    changeAmount: -10,
    changePercentage: "-0.03%",
    volume: 11000,
  },
  {
    id: 6,
    symbol: "ASX",
    companyName: "ASX 200",
    lastprice: 7000,
    changeAmount: 15,
    changePercentage: "+0.21%",
    volume: 10000,
  },
  {
    id: 7,
    symbol: "CAC",
    companyName: "CAC 40",
    lastprice: 6500,
    changeAmount: 5,
    changePercentage: "+0.08%",
    volume: 9500,
  },
  {
    id: 8,
    symbol: "DAX",
    companyName: "DAX 30",
    lastprice: 15500,
    changeAmount: -20,
    changePercentage: "-0.13%",
    volume: 8500,
  },
  {
    id: 9,
    symbol: "BSE",
    companyName: "BSE Sensex",
    lastprice: 50000,
    changeAmount: 25,
    changePercentage: "+0.05%",
    volume: 10500,
  },
  {
    id: 10,
    symbol: "RTSI",
    companyName: "RTSI Index",
    lastprice: 1500,
    changeAmount: 10,
    changePercentage: "+0.67%",
    volume: 8000,
  },
];

const trendingStocksRows = [
  {
    id: 1,
    symbol: "AAPL",
    companyName: "Apple Inc.",
    lastprice: 150,
    changeAmount: 5,
    changePercentage: "+0.03%",
    volume: 25000,
  },
  {
    id: 2,
    symbol: "TSLA",
    companyName: "Tesla, Inc.",
    lastprice: 800,
    changeAmount: 30,
    changePercentage: "+0.15%",
    volume: 35000,
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
    symbol: "GOOGL",
    companyName: "Alphabet Inc.",
    lastprice: 2000,
    changeAmount: -25,
    changePercentage: "-1.25%",
    volume: 22000,
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
    symbol: "NVDA",
    companyName: "Nvidia Corporation",
    lastprice: 100,
    changeAmount: -20,
    changePercentage: "-0.71%",
    volume: 15600,
  },
  {
    id: 7,
    symbol: "BABA",
    companyName: "Alibaba Group",
    lastprice: 200,
    changeAmount: 8,
    changePercentage: "+0.60%",
    volume: 28000,
  },
  {
    id: 8,
    symbol: "META",
    companyName: "Facebook, Inc.",
    lastprice: 300,
    changeAmount: -7,
    changePercentage: "-0.36%",
    volume: 18000,
  },
  {
    id: 9,
    symbol: "V",
    companyName: "Visa Inc.",
    lastprice: 220,
    changeAmount: 12,
    changePercentage: "+0.55%",
    volume: 19000,
  },
  {
    id: 10,
    symbol: "JPM",
    companyName: "JPMorgan Chase",
    lastprice: 160,
    changeAmount: -5,
    changePercentage: "-0.03%",
    volume: 15000,
  },
];

const topGainersRows = [
  {
    id: 1,
    symbol: "NFLX",
    companyName: "Netflix, Inc.",
    lastprice: 550,
    changeAmount: 40,
    changePercentage: "+1.25%",
    volume: 22000,
  },
  {
    id: 2,
    symbol: "DIS",
    companyName: "The Walt Disney Company",
    lastprice: 180,
    changeAmount: 25,
    changePercentage: "+0.96%",
    volume: 19000,
  },
  {
    id: 3,
    symbol: "CSCO",
    companyName: "Cisco Systems, Inc.",
    lastprice: 60,
    changeAmount: 8,
    changePercentage: "+0.84%",
    volume: 21000,
  },
  {
    id: 4,
    symbol: "PG",
    companyName: "Procter & Gamble Co.",
    lastprice: 140,
    changeAmount: 15,
    changePercentage: "+0.68%",
    volume: 17000,
  },
  {
    id: 5,
    symbol: "CRM",
    companyName: "Salesforce.com, Inc.",
    lastprice: 240,
    changeAmount: 10,
    changePercentage: "+0.56%",
    volume: 16000,
  },
  {
    id: 6,
    symbol: "KO",
    companyName: "The Coca-Cola Company",
    lastprice: 55,
    changeAmount: 3,
    changePercentage: "+0.55%",
    volume: 14000,
  },
  {
    id: 7,
    symbol: "INTC",
    companyName: "Intel Corporation",
    lastprice: 65,
    changeAmount: 3,
    changePercentage: "+0.49%",
    volume: 15000,
  },
  {
    id: 8,
    symbol: "WMT",
    companyName: "Walmart Inc.",
    lastprice: 140,
    changeAmount: 5,
    changePercentage: "+0.35%",
    volume: 18000,
  },
  {
    id: 9,
    symbol: "BA",
    companyName: "The Boeing Company",
    lastprice: 240,
    changeAmount: 5,
    changePercentage: "+0.21%",
    volume: 13000,
  },
  {
    id: 10,
    symbol: "T",
    companyName: "AT&T Inc.",
    lastprice: 30,
    changeAmount: 0,
    changePercentage: "0.00%",
    volume: 11000,
  },
];
// ... (same data arrays as before)

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "60px 20px",
          textAlign: "center",
          backgroundImage: `url('path/to/banner-image.jpg')`, // Replace with your banner image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#555",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Stock Market Insights
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Stay updated with the latest market trends and analysis.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/markets")}
        >
          Explore Markets
        </Button>
      </Box>
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h4">Home Page</Typography>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Indices
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={indicesRows}
            columns={columns}
            pageSize={10}
            checkboxSelection
          />
        </div>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Trending Stocks
            </Typography>
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={trendingStocksRows}
                columns={columns}
                pageSize={10}
                checkboxSelection
              />
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Top Gainers
            </Typography>
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={topGainersRows}
                columns={columns}
                pageSize={10}
                checkboxSelection
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
