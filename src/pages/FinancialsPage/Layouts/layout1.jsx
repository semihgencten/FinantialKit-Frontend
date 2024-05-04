import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes

const TabsLayout_1 = ({ children }) => {
  const navigate = useNavigate(); // Use useNavigate hook
  const [value, setValue] = useState(getTabValueFromPath(location.pathname));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Programmatically navigate based on tab selection
    switch (newValue) {
      case "one":
        navigate("/equities/overview");
        break;
      case "two":
        navigate("/equities/financials/profile");
        break;
      case "three":
        navigate("/equities/technicals");
        break;
      case "four":
        navigate("/equities/news");
        break;
      case "five":
        navigate("/equities/charts");
        break;
      case "six":
        navigate("/equities/peer-analysis");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Box sx={{ textAlign: "left" }}>
        <h2>Nvidia Corporation</h2>
      </Box>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ transition: "0.3s" }} // Add CSS transition
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
  switch (path) {
    case "/equities/overview":
      return "one";
    case "/equities/financials":
      return "two";
    case "/equities/technicals":
      return "three";
    case "/equities/news":
      return "four";
    case "/equities/charts":
      return "five";
    case "/equities/peer-analysis":
      return "six";
    default:
      return "one";
  }
};
TabsLayout_1.propTypes = {
  children: PropTypes.node, // Validate children prop as a React node
};
export default TabsLayout_1;
