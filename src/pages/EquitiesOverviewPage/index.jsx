import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import TabsLayout from "@/pages/EquitiesPage";
import { Graph } from "@/components/Graph";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LeftBriefTable from "./sections/LeftBriefTable";
import RightBriefTable from "./sections/RightBriefTable";
import DividendsTable from "./sections/DividendsTable";

const movingAverages = [
  { id: 1, name: "Prev. Close", value: "$100" },
  { id: 2, name: "Open", value: "$110" },
  { id: 3, name: "Day's Range", value: "$95 - $120" },
  { id: 4, name: "52wk Range", value: "$80 - $150" },
  { id: 5, name: "Volume", value: "1000000" },
  { id: 6, name: "Average Volume", value: "500000" },
  { id: 7, name: "1 Year Change", value: "+20%" },
  { id: 8, name: "Shares Outstanding", value: "10000000" },
];
const marketDetails = [
  { id: 1, name: "Market Cap", value: "$1B" },
  { id: 2, name: "Revenue", value: "$500M" },
  { id: 3, name: "R/E Ratio", value: "20" },
  { id: 4, name: "EPS", value: "$5" },
  { id: 5, name: "Dividend (Yield)", value: "2% (1.5%)" },
  { id: 6, name: "Beta", value: "1.2" },
];

const EquitiesOverviewPage = () => {
  return (
    <TabsLayout>
      <Box sx={{ textAlign: "center" }}>
        <Grid container justifyContent="left" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              marginTop={"1rem"}
              component="h3"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "1.5em", marginRight: "0.5em" }}>
                {"NVDA"} 859(+4%)
              </span>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "right",
                  justifyContent: "flex-end",
                }}
              >
                <Stack spacing={2} direction="row">
                  <Button variant="outlined">Add To Watchlist</Button>
                  <Button variant="contained">Add To Portfolio</Button>
                  <Button variant="outlined">Select For Peer Analysis</Button>
                </Stack>
              </Box>
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8} lg={9.6}>
              <Box border={1} borderColor="grey.500" borderRadius={5} p={2}>
                <Graph style={{ width: "90%" }} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2.4}>
              <Box border={1} borderColor="grey.500" borderRadius={5} p={2}>
                <RightBriefTable data={marketDetails} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ height: 150, width: "100%" }}>
        <Grid container spacing={0.004} item xs={16}>
          <Grid item xs={6}>
            <LeftBriefTable data={movingAverages} />
          </Grid>
          <Grid marginTop="2rem" item xs={6}>
            <DividendsTable />
          </Grid>
        </Grid>
      </Box>
    </TabsLayout>
  );
};

export default EquitiesOverviewPage;
