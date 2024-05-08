import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes

const TabsLayout = ({ children }) => {
  const navigate = useNavigate(); // Use useNavigate hook
  const [value, setValue] = useState(
    getTabValueFromPath(window.location.pathname),
  );
  const { symbol: routeSymbol } = useParams(); // Get symbol from route params

  useEffect(() => {
    setValue(getTabValueFromPath(window.location.pathname));
  }, [window.location.pathname]);

  useEffect(() => {
    localStorage.setItem("currentSymbol", routeSymbol || "");
  }, [routeSymbol]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const currentSymbol =
      localStorage.getItem("currentSymbol") || routeSymbol || "";

    switch (newValue) {
      case "one":
        navigate(`/equities/${currentSymbol}/overview`);
        break;
      case "two":
        navigate(`/equities/${currentSymbol}/financials/profile`);
        break;
      case "three":
        navigate(`/equities/${currentSymbol}/technicals`);
        break;
      case "four":
        navigate(`/equities/${currentSymbol}/news`);
        break;
      case "five":
        navigate(`/equities/${currentSymbol}/charts`);
        break;
      case "six":
        navigate(`/equities/${currentSymbol}/peer-analysis`);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Box sx={{ textAlign: "left" }}>
        <h2>{routeSymbol ? routeSymbol.toUpperCase() : ""} Overview</h2>
      </Box>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ transition: "0.3s" }}
      >
        <Tab value="one" label="Overview" />
        <Tab value="two" label="Financials" />
        <Tab value="three" label="Technicals" />
        <Tab value="four" label="News" />
        <Tab value="five" label="Charts" />
        <Tab value="six" label="Peer Analysis" />
      </Tabs>
      {children}
    </div>
  );
};

const getTabValueFromPath = (path) => {
  if (path.includes("overview")) {
    return "one";
  } else if (path.includes("financials")) {
    return "two";
  } else if (path.includes("technicals")) {
    return "three";
  } else if (path.includes("/news")) {
    return "four";
  } else if (path.includes("charts")) {
    return "five";
  } else if (path.includes("peer-analysis")) {
    return "six";
  } else {
    return "one";
  }
};

TabsLayout.propTypes = {
  children: PropTypes.node,
};

export default TabsLayout;
