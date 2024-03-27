import React from 'react';
import TabsLayout from '@/pages/EquitiesPage';
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
    <TabsLayout>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2">Risk Page</Typography>
        
        {/* Displaying Risk Ratings horizontally */}
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
    </TabsLayout>
  );
};

export default RiskSubpage;
