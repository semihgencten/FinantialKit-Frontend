import React from "react";
import TabsLayout from "@/pages/EquitiesPage";
import FinancialsTabsLayout from "@/pages/EquitiesFinancialsPage";
import { Box, Typography } from "@mui/material";

const StatisticSubpage = () => {
  // Example Risk Ratings data
  const riskRatings = {
    totalESGRiskScore: 75,
    environmentRiskScore: 60,
    socialRiskScore: 80,
    governanceRiskScore: 70,
  };

  return (
    <TabsLayout>
      <FinancialsTabsLayout>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2">Statistic Page</Typography>
        </Box>
      </FinancialsTabsLayout>
    </TabsLayout>
  );
};

export default StatisticSubpage;
