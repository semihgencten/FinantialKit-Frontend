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

const DividendsSubpage = () => {
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
    <TabsLayout1>
      <FinancialsTabsLayout>
        <Box sx={{ textAlign: "center", pt: 4 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Dividends
          </Typography>
          <Divider sx={{ my: 2 }} />

          {/* Displaying dividend information in a styled table */}
          <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
            <Table sx={{ minWidth: 400 }}>
              <TableHead sx={{ backgroundColor: "#f3f3f3" }}>
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
        </Box>
      </FinancialsTabsLayout>
    </TabsLayout1>
  );
};

export default DividendsSubpage;
