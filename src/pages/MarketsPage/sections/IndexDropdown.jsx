import { useState } from "react";
import { Select, MenuItem } from "@mui/material";

function IndexDropdown() {
  const [selectedIndex, setSelectedIndex] = useState("");

  const handleChange = (event) => {
    setSelectedIndex(event.target.value);
  };

  return (
    <Select
      value={selectedIndex}
      onChange={handleChange}
      sx={{
        float: "up",
        marginLeft: "1rem",
        marginTop: "1rem",
        marginBottom: "1rem",
        minWidth: 120,
      }}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
    >
      <MenuItem value="">Select an Index</MenuItem>
      <MenuItem value="nasdaq100">NASDAQ 100</MenuItem>
      <MenuItem value="sp500">S&P 500</MenuItem>
      <MenuItem value="dowjones">Dow Jones</MenuItem>
    </Select>
  );
}

export default IndexDropdown;
