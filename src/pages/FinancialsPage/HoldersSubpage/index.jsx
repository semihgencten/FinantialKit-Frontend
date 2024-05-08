import React from "react";
import TabsLayout1 from "@/pages/FinancialsPage/EquitiesPage";
import FinancialsTabsLayout from "@/pages/EquitiesFinancialsPage";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";

const HoldersSubpage = () => {
  // Example data for Insider Purchases Last 6 Months
  const insiderPurchasesData = [
    { parameter: "Purchases", value: "100" },
    { parameter: "Sales", value: "50" },
    { parameter: "Net Shares Purchased", value: "50" },
    { parameter: "Total Insider Shares Held", value: "500" },
    { parameter: "% Net Shares Purchased", value: "10%" },
  ];

  // Example data for Top Mutual Fund Holders
  const topMutualFundHoldersData = [
    { holder: "Mutual Fund A", sharesHeld: "1000" },
    { holder: "Mutual Fund B", sharesHeld: "800" },
    { holder: "Mutual Fund C", sharesHeld: "700" },
  ];

  // Example data for Top Institutional Holders
  const topInstitutionalHoldersData = [
    { holder: "Institution A", sharesHeld: "2000" },
    { holder: "Institution B", sharesHeld: "1800" },
    { holder: "Institution C", sharesHeld: "1500" },
  ];

  return (
    <TabsLayout1>
      <FinancialsTabsLayout>
        <Box sx={{ textAlign: "center", pt: 4 }}>
          {/* Insider Purchases Last 6 Months */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Insider Purchases Last 6 Months
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f3f3f3" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#333333" }}>
                      Parameter
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#333333" }}>
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {insiderPurchasesData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ color: "#555555" }}
                      >
                        {row.parameter}
                      </TableCell>
                      <TableCell sx={{ color: "#555555" }}>
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Top Mutual Fund Holders */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Top Mutual Fund Holders
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f3f3f3" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#333333" }}>
                      Holder
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#333333" }}>
                      Shares Held
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topMutualFundHoldersData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ color: "#555555" }}
                      >
                        {row.holder}
                      </TableCell>
                      <TableCell sx={{ color: "#555555" }}>
                        {row.sharesHeld}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Top Institutional Holders */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Top Institutional Holders
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f3f3f3" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#333333" }}>
                      Holder
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#333333" }}>
                      Shares Held
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topInstitutionalHoldersData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ color: "#555555" }}
                      >
                        {row.holder}
                      </TableCell>
                      <TableCell sx={{ color: "#555555" }}>
                        {row.sharesHeld}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </FinancialsTabsLayout>
    </TabsLayout1>
  );
};

export default HoldersSubpage;
