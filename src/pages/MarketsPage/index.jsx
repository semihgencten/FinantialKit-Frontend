// File path: /path/to/MarketsPage.jsx

import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { CountryDropdown } from "@/pages/MarketsPage/sections";
import { IndexDropdown } from "./sections";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { getStocks } from "@/actions/stockActions";
import { useDispatch } from "react-redux";

const columns = [
  { field: "symbol", headerName: "Symbol", width: 120 },
  {
    field: "companyName",
    headerName: "Name",
    width: 250,
    renderCell: (params) => (
      <Link to={`/equities/${params.row.symbol}/overview`}>{params.value}</Link>
    ),
  },
  { field: "lastPrice", headerName: "Last", width: 150 },
  { field: "changeAmount", headerName: "Change", width: 150 },
  { field: "changePercentage", headerName: "Change (%)", width: 150 },
  { field: "volume", headerName: "Volume", width: 150 },
];

const stocksAction = () => async (dispatch) => {
  try {
    const action = await dispatch(getStocks());
    return action.payload; // Assuming getStocks returns a payload containing the stock data
  } catch (error) {
    throw new Error("Failed to fetch stocks data");
  }
};

const MarketsPage = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(stocksAction());
        if (data) {
          setRows(data.map((stock, index) => ({ id: index + 1, ...stock })));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Box sx={{ textAlign: "center" }}>
        <h2>Markets Page</h2>
      </Box>
      <div>
        <CountryDropdown />
        <IndexDropdown />
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
