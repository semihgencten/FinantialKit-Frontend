import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const columns = [
  { field: "symbol", headerName: "Symbol", width: 120 },
  {
    field: "companyName",
    headerName: "Name",
    width: 250,
    
  },
  { field: "lastprice", headerName: "Last", width: 150 },
  { field: "changeAmount", headerName: "Change", width: 150 },
  { field: "changePercentage", headerName: "Change (%)", width: 150 },
  { field: "volume", headerName: "Volume", width: 150 },
  {
    field: "remove",
    headerName: "Remove",
    width: 150,
    renderCell: (params) => (
      <Button variant="contained" onClick={() => removeFromWatchlist(params.id)}>Remove</Button>
    ),
  },
];

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([
    // Initial watchlist data
    {
      id: 1,
      symbol: "NVDA",
      companyName: "Nvidia",
      lastprice: 100,
      changeAmount: -20,
      changePercentage: "-0.71%",
      volume: 15600,
    },
    // Add more initial data if needed
  ]);

  const removeFromWatchlist = (id) => {
    // removing item from watchlist
    setWatchlist(watchlist.filter((item) => item.id !== id));
  };

  const addToPortfolio = (id) => {
    // adding item to portfolio
    
  };

  return (
    <div>
      <Box sx={{ textAlign: "center" }}>
        <h2>Watchlist</h2>
      </Box>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={watchlist}
          columns={columns}
          pageSize={10}
          checkboxSelection
        />
      </div>
      <div>
        <Stack spacing={2} direction="row">
          {/* Modified button functionalities */}
          <Button variant="contained">Add To Portfolio</Button>
        </Stack>
      </div>
    </div>
  );
};

export default WatchlistPage;

