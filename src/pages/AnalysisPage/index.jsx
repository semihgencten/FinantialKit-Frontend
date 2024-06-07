import React, { useState } from "react";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
const initialRows = [
  {
    id: 1,
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 429.04,
    change: 0.87,
    volume: 21453,
    marketCap: 3189,
    pe: 37.17,
  },
  {
    id: 2,
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 192.35,
    change: 0.69,
    volume: 42309,
    marketCap: 2951,
    pe: 29.91,
  },
  {
    id: 3,
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 953.86,
    change: 0.64,
    volume: 32893,
    marketCap: 2385,
    pe: 79.91,
  },
  {
    id: 4,
    symbol: "GOOG",
    name: "Alphabet Inc.",
    price: 179.54,
    change: 0.61,
    volume: 14706,
    marketCap: 2208,
    pe: 27.54,
  },
  {
    id: 5,
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 177.85,
    change: 0.53,
    volume: 16989,
    marketCap: 2207,
    pe: 27.28,
  },
  {
    id: 6,
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 183.15,
    change: -0.21,
    volume: 50839,
    marketCap: 1906,
    pe: 51.44,
  },
  {
    id: 7,
    symbol: "META",
    name: "Meta Platforms, Inc.",
    price: 464.63,
    change: -0.9,
    volume: 11742,
    marketCap: 1179,
    pe: 26.69,
  },
  {
    id: 8,
    symbol: "BRK.B",
    name: "Berkshire Hathaway Inc. New",
    price: 414.37,
    change: 0.33,
    volume: 2741,
    marketCap: 895,
    pe: 12.23,
  },
  {
    id: 9,
    symbol: "BRK.A",
    name: "Berkshire Hathaway Inc.",
    price: 625150,
    change: 0.3,
    volume: 11912,
    marketCap: 895636,
    pe: 12.3,
  },
  {
    id: 10,
    symbol: "LLY",
    name: "Eli Lilly and Company",
    price: 803.17,
    change: 2.55,
    volume: 4334,
    marketCap: 763337,
    pe: 120.28,
  },
];

const columns = [
  { field: "symbol", headerName: "Symbol", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 250,
    renderCell: (params) => (
      <Link to="/equities/NVDA/overview">{params.value}</Link>
    ),
  },
  { field: "price", headerName: "Price", width: 130 },
  { field: "change", headerName: "Change %", width: 130 },
  { field: "volume", headerName: "Volume", width: 150 },
  { field: "marketCap", headerName: "Market cap", width: 150 },
  { field: "pe", headerName: "P/E", width: 100 },
];

const AnalysisPage = () => {
  const [rows, setRows] = useState(initialRows);
  const [market, setMarket] = useState("");
  const [index, setIndex] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [change, setChange] = useState("");
  const [marketCap, setMarketCap] = useState("");
  const [sector, setSector] = useState("");
  const [analystRating, setAnalystRating] = useState("");
  // New state variables for additional filters
  const [dividendYield, setDividendYield] = useState("");
  const [revenueGrowth, setRevenueGrowth] = useState("");
  const [peGrowth, setPeGrowth] = useState("");
  const [peRatio, setPeRatio] = useState("");
  const [returnOnEquity, setReturnOnEquity] = useState("");
  const [priceToBook, setPriceToBook] = useState("");
  const [grossMargin, setGrossMargin] = useState("");
  const handleFilterChange = () => {
    let filteredRows = initialRows;

    // Apply filters here based on selected values
    if (market) {
      filteredRows = filteredRows.filter((row) => row.symbol === market);
    }
    if (index) {
      filteredRows = filteredRows.filter((row) => row.symbol.includes(index));
    }
    if (priceRange) {
      filteredRows = filteredRows.filter(
        (row) => row.price >= parseFloat(priceRange),
      );
    }
    if (change) {
      filteredRows = filteredRows.filter(
        (row) => row.change >= parseFloat(change),
      );
    }
    if (marketCap) {
      filteredRows = filteredRows.filter(
        (row) => row.marketCap >= parseFloat(marketCap),
      );
    }
    if (sector) {
      filteredRows = filteredRows.filter((row) => row.symbol.includes(sector));
    }
    if (analystRating) {
      filteredRows = filteredRows.filter((row) =>
        row.symbol.includes(analystRating),
      );
    }
    if (dividendYield) {
      filteredRows = filteredRows.filter(
        (row) => row.dividendYield >= parseFloat(dividendYield),
      );
    }
    if (revenueGrowth) {
      filteredRows = filteredRows.filter(
        (row) => row.revenueGrowth >= parseFloat(revenueGrowth),
      );
    }
    if (peGrowth) {
      filteredRows = filteredRows.filter(
        (row) => row.peGrowth >= parseFloat(peGrowth),
      );
    }
    if (peRatio) {
      filteredRows = filteredRows.filter(
        (row) => row.peRatio >= parseFloat(peRatio),
      );
    }
    if (returnOnEquity) {
      filteredRows = filteredRows.filter(
        (row) => row.returnOnEquity >= parseFloat(returnOnEquity),
      );
    }
    if (priceToBook) {
      filteredRows = filteredRows.filter(
        (row) => row.priceToBook >= parseFloat(priceToBook),
      );
    }
    if (grossMargin) {
      filteredRows = filteredRows.filter(
        (row) => row.grossMargin >= parseFloat(grossMargin),
      );
    }
    setRows(filteredRows);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Filter Page
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Market</InputLabel>
            <Select
              value={market}
              onChange={(e) => {
                setMarket(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="MSFT">US</MenuItem>
              <MenuItem value="AAPL">UK</MenuItem>
              <MenuItem value="NVDA">China</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Index</InputLabel>
            <Select
              value={index}
              onChange={(e) => {
                setIndex(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="S&P 500">S&P 500</MenuItem>
              <MenuItem value="Dow Jones">Dow Jones</MenuItem>
              <MenuItem value="NASDAQ">NASDAQ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Price</InputLabel>
            <Select
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="100">Above 100</MenuItem>
              <MenuItem value="500">Above 500</MenuItem>
              <MenuItem value="1000">Above 1000</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Change %</InputLabel>
            <Select
              value={change}
              onChange={(e) => {
                setChange(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="0.5">Above 0.5%</MenuItem>
              <MenuItem value="1">Above 1%</MenuItem>
              <MenuItem value="5">Above 5%</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Market Cap</InputLabel>
            <Select
              value={marketCap}
              onChange={(e) => {
                setMarketCap(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="1000">Above 1B</MenuItem>
              <MenuItem value="5000">Above 5B</MenuItem>
              <MenuItem value="10000">Above 10B</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Sector</InputLabel>
            <Select
              value={sector}
              onChange={(e) => {
                setSector(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Analyst Rating</InputLabel>
            <Select
              value={analystRating}
              onChange={(e) => {
                setAnalystRating(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="Buy">Buy</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Sell">Sell</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Dividend Yiel</InputLabel>
            <Select
              value={analystRating}
              onChange={(e) => {
                setAnalystRating(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="Buy">Buy</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Sell">Sell</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Revenue Growth</InputLabel>
            <Select
              value={analystRating}
              onChange={(e) => {
                setAnalystRating(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="Buy">Buy</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Sell">Sell</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>PEG</InputLabel>
            <Select
              value={analystRating}
              onChange={(e) => {
                setAnalystRating(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="Buy">Buy</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Sell">Sell</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>P/E</InputLabel>
            <Select
              value={analystRating}
              onChange={(e) => {
                setAnalystRating(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="Buy">Buy</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Sell">Sell</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>ROE</InputLabel>
            <Select
              value={analystRating}
              onChange={(e) => {
                setAnalystRating(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="Buy">Buy</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Sell">Sell</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Price To Book</InputLabel>
            <Select
              value={analystRating}
              onChange={(e) => {
                setAnalystRating(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="Buy">Buy</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Sell">Sell</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Gross Margin</InputLabel>
            <Select
              value={analystRating}
              onChange={(e) => {
                setAnalystRating(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="Buy">Buy</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Sell">Sell</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </div>
    </Box>
  );
};

export default AnalysisPage;
