import React from "react";
import TabsLayout1 from "@/pages/FinancialsPage/EquitiesPage";
import FinancialsTabsLayout from "@/pages/EquitiesFinancialsPage";
import { Box, Typography, Paper, Grid, Divider } from "@mui/material";

const RiskSubpage = () => {
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
        <Box sx={{ textAlign: "center", pt: 4 }}>
          {/*<Typography variant="h2">Risk Page</Typography>*/}
          <Paper variant="outlined" elevation={3} sx={{ mt: 4, p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  ESG Risk Ratings
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ mr: 4 }}>
                    <Typography variant="body1">
                      <strong>Total ESG Risk Score:</strong>
                    </Typography>
                    <Typography variant="body1">
                      {riskRatings.totalESGRiskScore}
                    </Typography>
                  </Box>
                  <Box sx={{ mr: 4 }}>
                    <Typography variant="body1">
                      <strong>Environment Risk Score:</strong>
                    </Typography>
                    <Typography variant="body1">
                      {riskRatings.environmentRiskScore}
                    </Typography>
                  </Box>
                  <Box sx={{ mr: 4 }}>
                    <Typography variant="body1">
                      <strong>Social Risk Score:</strong>
                    </Typography>
                    <Typography variant="body1">
                      {riskRatings.socialRiskScore}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <strong>Governance Risk Score:</strong>
                    </Typography>
                    <Typography variant="body1">
                      {riskRatings.governanceRiskScore}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </FinancialsTabsLayout>
    </TabsLayout1>
  );
};

export default RiskSubpage;
