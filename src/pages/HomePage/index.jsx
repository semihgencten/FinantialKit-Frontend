// File path: /path/to/HomePage.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getIndicesHome } from "@/actions/indiceActions";
import { getTopGainers, getTrendings } from "@/actions/stockActions";
import axios from "axios";
import { Link } from "react-router-dom";

const columns = [
  { field: "symbol", headerName: "Symbol", width: 120 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => (
      <Link to={`/equities/${params.row.symbol}/overview`}>{params.value}</Link>
    ),
  },
  { field: "price", headerName: "Last", width: 120 },
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
    field: "dailyMovement",
    headerName: "Change (%)",
    width: 100,
    renderCell: (params) => (
      <span style={{ color: params.value.includes("+") ? "green" : "red" }}>
        {params.value}
      </span>
    ),
  },
  { field: "dailyHigh", headerName: "High", width: 150 },
  { field: "dailyLow", headerName: "Low", width: 150 },
];

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [indices, setIndices] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [trendings, setTrendings] = useState([]);

  const [loadingIndices, setLoadingIndices] = useState(true);
  const [loadingTopGainers, setLoadingTopGainers] = useState(true);
  const [loadingTrendings, setLoadingTrendings] = useState(true);

  const [errorIndices, setErrorIndices] = useState(null);
  const [errorTopGainers, setErrorTopGainers] = useState(null);
  const [errorTrendings, setErrorTrendings] = useState(null);

  const fetchIndices = async () => {
    try {
      const response = await axios.get(`http://13.50.126.209:8000/api/indices`);
      let indicesData = response.data;
      setIndices(
        indicesData.map((item, index) => ({ id: index + 1, ...item })),
      );
      setLoadingIndices(false);
    } catch (error) {
      setErrorIndices("Failed to fetch indices data");
      setLoadingIndices(false);
    }
  };

  const fetchTopGainers = async () => {
    try {
      const data = await dispatch(getTopGainers());
      setTopGainers(
        data.payload.map((item, index) => ({ id: index + 1, ...item })),
      );
      setLoadingTopGainers(false);
    } catch (error) {
      setErrorTopGainers("Failed to fetch top gainers data");
      setLoadingTopGainers(false);
    }
  };

  const fetchTrendings = async () => {
    try {
      const data = await dispatch(getTrendings());
      setTrendings(
        data.payload.map((item, index) => ({ id: index + 1, ...item })),
      );
      setLoadingTrendings(false);
    } catch (error) {
      setErrorTrendings("Failed to fetch trending stocks data");
      setLoadingTrendings(false);
    }
  };

  useEffect(() => {
    fetchIndices();
    fetchTopGainers();
    fetchTrendings();
  }, [dispatch]);

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "60px 20px",
          textAlign: "center",
          color: "#555",
          marginBottom: "40px",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#000" }}
        >
          Welcome to Stock Market Insights
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#000" }}
        >
          Stay updated with the latest market trends and analysis.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/markets")}
          sx={{ marginTop: "20px" }}
        >
          Explore Markets
        </Button>
      </Box>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: "20px", borderRadius: "8px" }}>
            <Typography variant="h6" gutterBottom>
              Indices
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
              {loadingIndices ? (
                <CircularProgress />
              ) : errorIndices ? (
                <Typography variant="body1" color="error">
                  {errorIndices}
                </Typography>
              ) : (
                <DataGrid rows={indices} columns={columns} pageSize={10} />
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: "20px", borderRadius: "8px" }}>
            <Typography
              variant="body1"
              sx={{ fontSize: "16px", lineHeight: "1.5" }}
            >
              Our platform offers a{" "}
              <span style={{ color: "#1976d2", fontWeight: "bold" }}>
                comprehensive suite of tools
              </span>{" "}
              to help you navigate the stock market with ease. Enjoy features
              such as{" "}
              <span style={{ color: "#1976d2", fontWeight: "bold" }}>
                portfolio optimization
              </span>{" "}
              to maximize your returns and{" "}
              <span style={{ color: "#1976d2", fontWeight: "bold" }}>
                AI-supported news labeling
              </span>{" "}
              for the latest market insights.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4} style={{ marginTop: "40px" }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "20px", borderRadius: "8px" }}>
            <Typography variant="h6" gutterBottom>
              Trending Stocks
            </Typography>
            <div style={{ height: 600, width: "100%" }}>
              {loadingTrendings ? (
                <CircularProgress />
              ) : errorTrendings ? (
                <Typography variant="body1" color="error">
                  {errorTrendings}
                </Typography>
              ) : (
                <DataGrid rows={trendings} columns={columns} pageSize={10} />
              )}
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "20px", borderRadius: "8px" }}>
            <Typography variant="h6" gutterBottom>
              Top Gainers
            </Typography>
            <div style={{ height: 600, width: "100%" }}>
              {loadingTopGainers ? (
                <CircularProgress />
              ) : errorTopGainers ? (
                <Typography variant="body1" color="error">
                  {errorTopGainers}
                </Typography>
              ) : (
                <DataGrid rows={topGainers} columns={columns} pageSize={10} />
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
