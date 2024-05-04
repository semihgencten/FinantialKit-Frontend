/*import { Box } from '@mui/material'
import TabsLayout from '@/pages/EquitiesPage';

const EquitiesFinancialsPage = () => {
  return (
    <TabsLayout>
      <Box sx={{ textAlign: "center" }}>
        <h2>Financials Page</h2>;
      </Box>
    </TabsLayout>
  );
};

export default EquitiesFinancialsPage;
*/
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types"; // Import PropTypes
import { Box } from "@mui/material";

const FinancialsTabsLayout = ({ children }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(getTabValueFromPath(location.pathname));
  const { symbol: routeSymbol } = useParams(); // Get symbol from route params

  useEffect(() => {
    localStorage.setItem("currentSymbol", routeSymbol || "");
  }, [routeSymbol]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const currentSymbol =
      localStorage.getItem("currentSymbol") || routeSymbol || "";
    switch (newValue) {
      case "one":
        navigate(`/equities/${currentSymbol}/financials/profile`);
        break;
      case "two":
        navigate(`/equities/${currentSymbol}/financials/dividends`);
        break;
      case "three":
        navigate(`/equities/${currentSymbol}/financials/statements`);
        break;
      case "four":
        navigate(`/equities/${currentSymbol}/financials/risk`);
        break;
      case "five":
        navigate(`/equities/${currentSymbol}/financials/statistics`);
        break;
      case "six":
        navigate(`/equities/${currentSymbol}/financials/holders`);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ transition: "0.3s" }}
      >
        <Tab value="one" label="Profile" />
        <Tab value="two" label="Dividends" />
        <Tab value="three" label="Statements" />
        <Tab value="four" label="Risk" />
        <Tab value="five" label="Statistic" />
        <Tab value="six" label="Holders" />
      </Tabs>
      {children}
    </div>
  );
};
const getTabValueFromPath = (path) => {
  if (path.includes("profile")) {
    return "one";
  } else if (path.includes("dividends")) {
    return "two";
  } else if (path.includes("statements")) {
    return "three";
  } else if (path.includes("risk")) {
    return "four";
  } else if (path.includes("statistics")) {
    return "five";
  } else if (path.includes("holders")) {
    return "six";
  } else {
    return "one";
  }
};
FinancialsTabsLayout.propTypes = {
  children: PropTypes.node, // Validate children prop as a React node
};
export default FinancialsTabsLayout;
