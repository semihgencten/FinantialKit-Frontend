import React from 'react';

import TabsLayout1 from '@/pages/FinancialsPage/EquitiesPage';
import FinancialsTabsLayout from '@/pages/EquitiesFinancialsPage';
import { Box, Typography } from '@mui/material';

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
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2">Risk Page</Typography>
          
          
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box sx={{ padding: '50px 10px' }}>
              <Typography>Total ESG Risk Score: {riskRatings.totalESGRiskScore}</Typography>
            
            </Box>
            <Box sx={{ padding: '50px 10px' }}>
              
              <Typography>Environment Risk Score: {riskRatings.environmentRiskScore}</Typography>
            </Box>
            <Box sx={{ padding: '50px 10px' }}>
              <Typography>Social Risk Score: {riskRatings.socialRiskScore}</Typography>
              
            </Box>
            <Box sx={{ padding: '50px 10px' }}>
              
              <Typography>Governance Risk Score: {riskRatings.governanceRiskScore}</Typography>
            </Box>
          </Box>
        </Box>
      </FinancialsTabsLayout>
    </TabsLayout1>
  );
};

export default RiskSubpage;
