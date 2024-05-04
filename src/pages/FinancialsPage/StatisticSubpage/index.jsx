import React from "react";
import TabsLayout1 from "@/pages/FinancialsPage/EquitiesPage";
import FinancialsTabsLayout from "@/pages/EquitiesFinancialsPage";
import { Box, Typography, Grid, Paper } from "@mui/material";

const StatisticSubpage = () => {
  // Example Risk Ratings data
  const riskRatings = {
    totalESGRiskScore: 75,
    environmentRiskScore: 60,
    socialRiskScore: 80,
    governanceRiskScore: 70,
  };

  return (
    <TabsLayout1>
      <FinancialsTabsLayout>
        {/* <Box sx={{ textAlign: "center" }}>
                <Typography variant="h2">Statistic Page</Typography>
  </Box>*/}
        {/* Stock Price History */}
        <Box mt={4} mb={2}>
          <Paper variant="outlined" elevation={3} sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Stock Price History
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>52 Week High:</strong> $XX.XX
                </Typography>
                <Typography variant="body1">
                  <strong>52 Week Low:</strong> $XX.XX
                </Typography>
                <Typography variant="body1">
                  <strong>52-Week Change:</strong> +XX.XX%
                </Typography>
                <Typography variant="body1">
                  <strong>Previous Close:</strong> $XX.XX
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Market Cap:</strong> $XXX billion
                </Typography>
                <Typography variant="body1">
                  <strong>Volume:</strong> XXX
                </Typography>
                <Typography variant="body1">
                  <strong>Average Volume:</strong> XXX
                </Typography>
                <Typography variant="body1">
                  <strong>Beta:</strong> XX
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        {/* Share Statistics */}
        <Box mb={4}>
          <Paper variant="outlined" elevation={3} sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Share Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Avg Vol 3 month:</strong> XXX
                </Typography>
                <Typography variant="body1">
                  <strong>Shares Outstanding:</strong> XXX
                </Typography>
                <Typography variant="body1">
                  <strong>Float:</strong> XXX
                </Typography>
                <Typography variant="body1">
                  <strong>Implied Shares Outstanding:</strong> XXX
                </Typography>
                <Typography variant="body1">
                  <strong>Short Ratio:</strong> XXX
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Dividend Yield:</strong> XX%
                </Typography>
                <Typography variant="body1">
                  <strong>Forward Dividend & Yield:</strong> $XX.XX (XX%)
                </Typography>
                <Typography variant="body1">
                  <strong>Ex-Dividend Date:</strong> MM/DD/YYYY
                </Typography>
                <Typography variant="body1">
                  <strong>1-Year Target Estimate:</strong> $XX.XX
                </Typography>
                <Typography variant="body1">
                  <strong>PE Ratio:</strong> XX
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </FinancialsTabsLayout>
    </TabsLayout1>
  );
};

export default StatisticSubpage;
