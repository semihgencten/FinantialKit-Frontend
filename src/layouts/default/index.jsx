import React, { useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Button,
  Box,
  Grid,
  Typography,
  OutlinedInput,
  Select,
  MenuItem,
  Divider,
  CssBaseline,
  Menu,
  IconButton,
  Avatar,
  Container,
} from "@mui/material";
import LocaleContext from "@/LocaleContext";
import { FormattedMessage } from "react-intl";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/actions/authActions";
import Footer from "./components/Footer";
import Cookies from "universal-cookie";

const styles = {
  navButton: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#3F72AF",
      color: "white",
    },
    height: "100%",
    width: "100%",
  },
};

const NavButton = ({ route, titleId }) => {
  const navigate = useNavigate();
  return (
    <Button sx={styles.navButton} onClick={() => navigate(route)}>
      <FormattedMessage id={titleId} />
    </Button>
  );
};

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { locale, setLocale } = useContext(LocaleContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageChange = (event) => {
    setLocale(event.target.value);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  let isAuthenticated = false;

  let cookies = new Cookies();
  const try_connect = () => {
    isAuthenticated = cookies.get("token") ? true : false;
  };

  try_connect();

  // const { user, status, error, isAuthenticated } = useSelector(
  //   (state) => state.user,
  // );

  const logout = async () => {
    dispatch(logoutUser());
  };

  return (
    <Box sx={{ mx: "auto", bgcolor: "#F9F7F7" }}>
      <CssBaseline />
      <Grid container sx={{ p: "25px" }} bgcolor="#F9F7F7" alignItems="center">
        <Grid item xs={3}>
          <img
            src="/src/assets/images/logo.png"
            alt="Logo"
            style={{ maxWidth: "100%", height: "80px" }}
          />
        </Grid>

        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <OutlinedInput
            sx={{ width: "90%", height: "40px" }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Select
            value={locale}
            onChange={handleLanguageChange}
            sx={{ minWidth: 110, height: "40px" }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="tr">Türkçe</MenuItem>
            <MenuItem value="esp">Español</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
          </Select>
          <IconButton onClick={handleProfileMenuOpen} size="large">
            <AccountCircleIcon fontSize="large" sx={{ color: "#112D4E" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                isAuthenticated
                  ? navigate("/my-profile")
                  : navigate("/sign-in");
                handleMenuClose();
              }}
            >
              {isAuthenticated ? "My Profile" : "Login"}
            </MenuItem>
            <MenuItem
              style={{ display: isAuthenticated ? "block" : "none" }}
              onClick={() => {
                navigate("/settings");
                handleMenuClose();
              }}
            >
              Settings
            </MenuItem>
            <MenuItem
              style={{ display: isAuthenticated ? "block" : "none" }}
              onClick={() => {
                logout();
                navigate("/");
                handleMenuClose();
              }}
            >
              Sign Out
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Grid container bgcolor="#F9F7F7" alignItems="center">
        {[
          { route: "/", titleId: "homepage.title" },
          { route: "/filter", titleId: "analysis.page.title" },
          { route: "/markets", titleId: "markets.page.title" },
          { route: "/my-portfolio", titleId: "portfolio.page.title" },
          { route: "/news", titleId: "news.page.title" },
          { route: "/watchlist", titleId: "watchlist.page.title" },
        ].map((item, index, array) => (
          <React.Fragment key={index}>
            <Grid item xs>
              <NavButton route={item.route} titleId={item.titleId} />
            </Grid>
            {index !== array.length - 1 && (
              <Divider orientation="vertical" flexItem />
            )}
          </React.Fragment>
        ))}
      </Grid>
      <Box sx={{ width: "100%", height: "4px", bgcolor: "#112D4E" }}></Box>
      {/* Content rendered here will have restricted width */}
      <Box sx={{ width: "90%", mx: "auto", mt: 2 }}>
        <Outlet />
      </Box>
      {/* Footer Component */}
      <div style={{ height: "20px" }}></div>
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
