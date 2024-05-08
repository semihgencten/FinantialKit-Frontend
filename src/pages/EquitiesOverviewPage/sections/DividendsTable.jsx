import React from "react";
import TabsLayout1 from "@/pages/FinancialsPage/EquitiesPage";
import FinancialsTabsLayout from "@/pages/EquitiesFinancialsPage";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";

const DividendsTable = () => {
  // Example dividend data
  const dividendData = [
    { name: "Dividend Payout Ratio", value: "0.50" },
    { name: "Dividend per Share (DPS)", value: "$1.20" },
    { name: "Dividend Declaration Date", value: "2023-01-15" },
    { name: "Ex-Dividend Date", value: "2023-02-01" },
    { name: "Last Split Factor", value: "2:1" },
    { name: "Forward Annual Dividend Rate", value: "$2.40" },
    { name: "Forward Annual Dividend Yield", value: "4.5%" },
  ];

  return (
    <div>
      <Typography sx={{ backgroundColor: "#F9F7F7" }} variant="h4" gutterBottom>
        Dividends
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead sx={{ backgroundColor: "#F9F7F7" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "#333",
                }}
              >
                Parameter
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "#333",
                }}
              >
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dividendData.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontSize: "1rem", color: "#555" }}
                >
                  {row.name}
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", color: "#555" }}>
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DividendsTable;
