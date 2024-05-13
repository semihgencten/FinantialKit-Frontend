import React from "react";
import { Box, Container, Typography, Grid, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: 10,
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <img
              src="src/assets/images/logo.png"
              alt="Logo"
              style={{ maxWidth: "90%", height: "80px" }}
            />
            <Typography variant="body1" color="text.secondary">
              Our mission is to deliver the best service possible.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link href="/" color="text.secondary">
                  Home
                </Link>
                <br />
                <Link href="/markets" color="text.secondary">
                  Markets
                </Link>
                <br />
                <Link href="/analysis" color="text.secondary">
                  Analysis
                </Link>
                <br />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link href="/portfolio" color="text.secondary">
                  Portfolio
                </Link>
                <br />
                <Link href="/watchlist" color="text.secondary">
                  Watchlist
                </Link>
                <br />
                <Link href="/news" color="text.secondary">
                  News
                </Link>
                <br />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body1" color="text.secondary">
              info@companyname.com
            </Typography>
            <Typography variant="body1" color="text.secondary">
              +1 234 567 890
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
