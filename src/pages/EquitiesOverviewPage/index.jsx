import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import TabsLayout from "@/pages/EquitiesPage";
import { Graph } from "@/components/Graph";
import { BriefTable } from "./sections";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const briefData = {
  left: [
    { id: 1, name: "Prev. Close", value: "$100" },
    { id: 2, name: "Open", value: "$110" },
    { id: 3, name: "Day's Range", value: "$95 - $120" },
    { id: 4, name: "52wk Range", value: "$80 - $150" },
    { id: 5, name: "Volume", value: "1000000" },
    { id: 6, name: "Average Volume", value: "500000" },
    { id: 7, name: "1 Year Change", value: "+20%" },
    { id: 8, name: "Shares Outstanding", value: "10000000" },
  ],
  right: [
    { id: 1, name: "Market Cap", value: "$1B" },
    { id: 2, name: "Revenue", value: "$500M" },
    { id: 3, name: "R/E Ratio", value: "20" },
    { id: 4, name: "EPS", value: "$5" },
    { id: 5, name: "Dividend (Yield)", value: "2% (1.5%)" },
    { id: 6, name: "Beta", value: "1.2" },
  ],
};
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
              sx={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ marginRight: "0.5em" }}>NVDA</span>
              <span style={{ fontSize: "1.5em" }}>
                {/* Assuming stockPrice is a state variable holding the price of the stock */}
                ${"850 (+ 4%)"}
              </span>
              <Box>
                <Stack marginLeft="35rem" spacing={2} direction="row">
                  <Button variant="outlined">Add To Watchlist</Button>
                  <Button variant="contained">Add To Portfolio</Button>
                  <Button variant="outlined">Select For Peer Analysis</Button>
                </Stack>
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "-webkit-center" }}>
            <Graph style={{ width: "100%" }} />
          </Grid>
        </Grid>
      </Box>
      <Box style={{ height: 450, width: "50%" }}>
        <BriefTable data={briefData} />
      </Box>
      <Box style={{ height: 150, width: "50%" }}></Box>
      <Box>
        <Stack spacing={2} direction="row">
          <Button variant="text">Add To Watchlist</Button>
          <Button variant="contained">Add To Portfolio</Button>
        </Stack>
      </Box>
    </TabsLayout>
  );
};

export default EquitiesOverviewPage;
