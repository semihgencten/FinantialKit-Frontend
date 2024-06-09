import React, { useState, useEffect } from "react";
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
import axios from "axios";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "symbol", headerName: "Symbol", width: 150 },
    { field: "companyName", headerName: "Company Name", width: 200 ,
      renderCell: (params) => (
          <Link to={`/equities/${params.row.symbol}/overview`}>{params.value}</Link>
        ),
    },
    { field: "lastPrice", headerName: "Last Price", width: 130 },
    { field: "changeAmount", headerName: "Change Amount", width: 150 },
    { field: "changePercentage", headerName: "Change Percentage", width: 180 },
    { field: "volume", headerName: "Volume", width: 130 },
    { field: "marketCap", headerName: "Market Cap", width: 150 },
    { field: "peRatio", headerName: "PE Ratio", width: 130 },
  ];

const AnalysisPage = () => {
  const [rows, setRows] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [changeAmount, setChangeAmount] = useState("");
  const [changePercentage, setChangePercentage] = useState("");
  const [volume, setVolume] = useState("");
  const [marketCap, setMarketCap] = useState("");
  const [peRatio, setPeRatio] = useState("");

  useEffect(() => {
    handleFilterChange();
  }, []);

  const handleFilterChange = async (newPriceRange) => {
    let query = "http://13.50.126.209:8000/api/stocks/?";
    console.log("handlee");
    console.log(priceRange);
    if (priceRange) {
      if (newPriceRange === "800") query += "last_price_min=800";
      else if (newPriceRange === "300-800") query += "last_price_min=300&last_price_max=800";
      else if (newPriceRange === "300") query += "last_price_max=300";
    }
    if (changeAmount) {
      if (changeAmount === "5") query += "&change_amount_max=5";
      else if (changeAmount === "5-30") query += "&change_amount_min=5&change_amount_max=30";
      else if (changeAmount === "30") query += "&change_amount_min=30";
    }
    if (changePercentage) {
      if (changePercentage === "30") query += "&change_percentage_min=30";
      else if (changePercentage === "20") query += "&change_percentage_min=20";
      else if (changePercentage === "10") query += "&change_percentage_min=10";
      else if (changePercentage === "5") query += "&change_percentage_min=5";
      else if (changePercentage === "0-5") query += "&change_percentage_max=5";
    }
    if (volume) {
      if (volume === "10M") query += "&volume_min=10000000";
      else if (volume === "1M") query += "&volume_min=1000000";
      else if (volume === "100K") query += "&volume_min=100000";
    }
    if (marketCap) {
      if (marketCap === "200B") query += "&market_cap_min=200000000";
      else if (marketCap === "10B-200B") query += "&market_cap_min=10000000&market_cap_max=200000000";
      else if (marketCap === "10B") query += "&market_cap_min=10000000";
      else if (marketCap === "2B") query += "&market_cap_min=2000000";
    }
    if (peRatio) {
      if (peRatio === "50") query += "&pe_ratio_min=50";
      else if (peRatio === "25-50") query += "&pe_ratio_min=25&pe_ratio_max=50";
      else if (peRatio === "15-25") query += "&pe_ratio_min=15&pe_ratio_max=25";
      else if (peRatio === "25") query += "&pe_ratio_max=25";
      else if (peRatio === "15") query += "&pe_ratio_max=15";
    }

    try {
      const response = await axios.get(query);
      const dataWithId = response.data.map((item, index) => ({
        ...item,
        id: item.id || index, // Use existing id if available, otherwise use index
      }));
      setRows(dataWithId);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Filter Page
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Price</InputLabel>
            <Select
              value={priceRange}
              onChange={(e) => {
                const newPriceRange = e.target.value;
                setPriceRange(newPriceRange); // Schedule state update
                console.log(e.target.value);
                handleFilterChange(newPriceRange);
              }}
            >
              <MenuItem value="800">800 and above</MenuItem>
              <MenuItem value="300-800">300 to 800</MenuItem>
              <MenuItem value="300">300 and below</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Change Amount</InputLabel>
            <Select
              value={changeAmount}
              onChange={(e) => {
                setChangeAmount(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="5">5 and below</MenuItem>
              <MenuItem value="5-30">5 to 30</MenuItem>
              <MenuItem value="30">30 and above</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Change Percentage</InputLabel>
            <Select
              value={changePercentage}
              onChange={(e) => {
                setChangePercentage(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="30">30 and above</MenuItem>
              <MenuItem value="20">20 and above</MenuItem>
              <MenuItem value="10">10 and above</MenuItem>
              <MenuItem value="5">5 and above</MenuItem>
              <MenuItem value="0-5">0 to 5</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Volume</InputLabel>
            <Select
              value={volume}
              onChange={(e) => {
                setVolume(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="10M">Above 10M</MenuItem>
              <MenuItem value="1M">Above 1M</MenuItem>
              <MenuItem value="100K">Above 100,000</MenuItem>
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
              <MenuItem value="200B">200B and above</MenuItem>
              <MenuItem value="10B-200B">10B to 200B</MenuItem>
              <MenuItem value="10B">10B and above</MenuItem>
              <MenuItem value="2B">2B and above</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth>
            <InputLabel>P/E Ratio</InputLabel>
            <Select
              value={peRatio}
              onChange={(e) => {
                setPeRatio(e.target.value);
                handleFilterChange();
              }}
            >
              <MenuItem value="50">50 and above</MenuItem>
              <MenuItem value="25-50">25 to 50</MenuItem>
              <MenuItem value="15-25">15 to 25</MenuItem>
              <MenuItem value="25">25 and below</MenuItem>
              <MenuItem value="15">15 and below</MenuItem>
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
