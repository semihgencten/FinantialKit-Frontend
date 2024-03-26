import React, { useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Box, Grid, Typography, OutlinedInput, Select, MenuItem } from "@mui/material";
import LocaleContext from '@/LocaleContext'; 
import { FormattedMessage } from 'react-intl'

const DefaultLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split("/").pop()
    ? location.pathname.split("/").pop().toLocaleUpperCase()
    : <FormattedMessage id="homepage.title" />;

  const { locale, setLocale } = useContext(LocaleContext);

  const handleLanguageChange = (event) => {
    setLocale(event.target.value);
  };

  return (
    <Box sx={{ width: "80%", mx: "auto" }}>
      <Typography variant="h4" sx={{ mt: "2rem" }}>
        {currentPage}
      </Typography>
      <Select
        value={locale}
        onChange={handleLanguageChange}
        sx={{ float: 'right', marginTop: '1rem', minWidth: 120 }}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="fr">French</MenuItem>
        <MenuItem value="arb">Arabic</MenuItem>
      </Select>
      <Grid container sx={{ p: "20px" }} bgcolor="lightgrey">
        <Grid item xs={3}>
          <Typography variant="h3">
             <FormattedMessage id="logo.label"/>
             </Typography>
        </Grid>
        <Grid item xs={6}>
          <OutlinedInput sx={{ width: "90%", height: "40px" }}></OutlinedInput>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h3">
            <FormattedMessage id="profile.label" />  
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ p: "20px" }} bgcolor="grey">
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Grid
            container
            sx={{ margin: "auto" }}
            spacing={1}
            justifyContent="center"
          >
            <Grid item>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={() => navigate("/")}
              >
              <FormattedMessage id="homepage.title" />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={() => navigate("/analysis")}
              >
              <FormattedMessage id="analysis.page.title" />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={() => navigate("/markets")}
              >
              <FormattedMessage id="markets.page.title" />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={() => navigate("/my-portfolio")}
              >
              <FormattedMessage id="portfolio.page.title" />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={() => navigate("/news")}
              >
              <FormattedMessage id="news.page.title" />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={() => navigate("/watchlist")}
              >
              <FormattedMessage id="watchlist.page.title" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <Outlet />
    </Box>
  );
};

export default DefaultLayout;
