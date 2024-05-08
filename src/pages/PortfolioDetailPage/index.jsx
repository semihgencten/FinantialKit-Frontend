import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  Box,
  Modal,
  TextField,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import SettingsIcon from "@mui/icons-material/Settings";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

const PortfolioDetailPage = () => {
  const { portfolioId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([
    "lastPrice",
    "change",
    "changePercent",
    "currency",
    "marketTime",
    "volume",
    "shares",
    "avgVol3m",
    "dayRange",
    "weekRange",
    "marketCap",
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [transaction, setTransaction] = useState({
    type: "",
    date: "",
    amount: "",
    price: "",
    commission: "",
  });

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleChange = (event) => {
    setTransaction({
      ...transaction,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    // Logic to handle submission (e.g., API call, state update)
    console.log(transaction);
    handleClose();
  };

  // Constant array to maintain the original order of columns
  const allColumns = [
    "lastPrice",
    "change",
    "changePercent",
    "currency",
    "marketTime",
    "volume",
    "shares",
    "avgVol3m",
    "dayRange",
    "weekRange",
    "marketCap",
  ];

  // Dummy data for portfolio assets
  const portfolioData = {
    1: {
      name: "Tech Stocks",
      assets: [
        {
          id: 1,
          ticker: "AAPL",
          lastPrice: "175.25",
          change: "+2.75",
          changePercent: "1.59%",
          currency: "USD",
          marketTime: "2023-04-15 16:00:00",
          volume: "98,765,432",
          shares: "16,789,000",
          avgVol3m: "50,678,910",
          dayRange: "172.00 - 176.80",
          weekRange: "130.00 - 180.00",
          marketCap: "2.4T",
        },
        {
          id: 2,
          ticker: "MSFT",
          lastPrice: "300.40",
          change: "+1.80",
          changePercent: "0.60%",
          currency: "USD",
          marketTime: "2023-04-15 16:00:00",
          volume: "12,345,678",
          shares: "7,609,800",
          avgVol3m: "19,876,543",
          dayRange: "295.00 - 302.50",
          weekRange: "250.00 - 310.00",
          marketCap: "1.8T",
        },
      ],
    },
    2: {
      name: "Global Bonds",
      assets: [
        {
          id: 3,
          ticker: "BND",
          lastPrice: "82.55",
          change: "-0.15",
          changePercent: "-0.18%",
          currency: "USD",
          marketTime: "2023-04-15 16:00:00",
          volume: "500,000",
          shares: "1,200,000",
          avgVol3m: "450,000",
          dayRange: "81.50 - 83.00",
          weekRange: "80.00 - 85.00",
          marketCap: "550M",
        },
        {
          id: 4,
          ticker: "IEF",
          lastPrice: "110.25",
          change: "+0.20",
          changePercent: "0.18%",
          currency: "USD",
          marketTime: "2023-04-15 16:00:00",
          volume: "600,000",
          shares: "800,000",
          avgVol3m: "300,000",
          dayRange: "109.00 - 111.00",
          weekRange: "100.00 - 115.00",
          marketCap: "200M",
        },
      ],
    },
  };
  const portfolio = portfolioData[portfolioId] || {
    name: "Unknown Portfolio",
    assets: [],
  };

  const handleColumnSelect = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ p: 2, margin: "auto", flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Portfolio Details: {portfolio.name}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              {allColumns
                .filter((column) => selectedColumns.includes(column))
                .map((column) => (
                  <TableCell key={column} align="right">
                    {column}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolio.assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell component="th" scope="row">
                  {asset.ticker}
                </TableCell>
                {allColumns
                  .filter((column) => selectedColumns.includes(column))
                  .map((column) => (
                    <TableCell key={column} align="right">
                      {asset[column]}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
        variant="contained"
        size="small"
        sx={{ bgcolor: "black", color: "white", margin: "12px" }}
        onClick={handleOpen}
      >
        Add Asset
      </Button>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Transaction
          </Typography>
          <Box
            component="form"
            sx={{ mt: 2 }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Type</InputLabel>
              <Select
                native
                value={transaction.type}
                onChange={handleChange}
                label="Type"
                inputProps={{
                  name: "type",
                }}
              >
                <option aria-label="None" value="" />
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={transaction.date}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              name="price"
              value={transaction.price}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Commission"
              type="number"
              name="commission"
              value={transaction.commission}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
      <Button
        onClick={(event) => setAnchorEl(event.currentTarget)}
        startIcon={<SettingsIcon />}
        variant="outlined"
        size="small"
        sx={{ ml: 2 }}
      >
        Configure
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {allColumns.map((column) => (
          <MenuItem key={column} onClick={() => handleColumnSelect(column)}>
            <Checkbox checked={selectedColumns.includes(column)} />
            {column}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
};

export default PortfolioDetailPage;
