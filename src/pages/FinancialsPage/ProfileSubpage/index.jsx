import React from "react";
import TabsLayout from "@/pages/EquitiesPage";
import FinancialsTabsLayout from "@/pages/EquitiesFinancialsPage";
import { Box, Typography, Grid, Paper, Divider } from "@mui/material";

const ProfileSubpage = () => {
  const stockProfile = {
    about: "Example Inc. is a leading technology company specializing in...",
    keyExecutives: [
      { name: "John Doe", title: "CEO" },
      { name: "Jane Smith", title: "CFO" },
      // Add more key executives as needed
    ],
    sector: "Technology",
    industry: "Software",
    numberOfEmployees: "10,000",
    // Add more profile information as needed
  };

  return (
    <TabsLayout>
      <FinancialsTabsLayout>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Company Profile
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h4">About</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography>{stockProfile.about}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h4">Key Executives</Typography>
                <Divider sx={{ my: 2 }} />
                {stockProfile.keyExecutives.map((executive, index) => (
                  <div key={index}>
                    <Typography>Name: {executive.name}</Typography>
                    <Typography>Title: {executive.title}</Typography>
                    {index !== stockProfile.keyExecutives.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </div>
                ))}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h4">Company Information</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography>Sector: {stockProfile.sector}</Typography>
                <Typography>Industry: {stockProfile.industry}</Typography>
                <Typography>
                  Number of Employees: {stockProfile.numberOfEmployees}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </FinancialsTabsLayout>
    </TabsLayout>
  );
};

export default ProfileSubpage;
