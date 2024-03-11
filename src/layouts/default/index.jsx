import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Box, Grid, Typography, OutlinedInput } from "@mui/material";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split("/").pop()
    ? location.pathname.split("/").pop().toLocaleUpperCase()
    : "HOME";
  return (
    <Box sx={{ width: "80%", mx: "auto" }}>
      <Typography variant="h4" sx={{ mt: "2rem" }}>
        {currentPage}
      </Typography>
      <Grid container sx={{ p: "20px" }} bgcolor="lightgrey">
        <Grid item xs={3}>
          <Typography variant="h3">LOGO HERE</Typography>
        </Grid>
        <Grid item xs={6}>
          <OutlinedInput sx={{ width: "90%", height: "40px" }}></OutlinedInput>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h3">PROFILE</Typography>
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
                Home
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={() => navigate("/analysis")}
              >
                analysis
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={() => navigate("/markets")}
              >
                markets
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={() => navigate("/my-portfolio")}
              >
                My Portfolio
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={() => navigate("/news")}
              >
                news
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={() => navigate("/watchlist")}
              >
                watchlist
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
