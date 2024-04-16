import { useState } from "react";
import { Select, MenuItem } from "@mui/material";

function CountryDropdown() {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Select
      value={selectedCountry}
      onChange={handleChange}
      sx={{
        float: "up",
        marginTop: "1rem",
        marginBottom: "1rem",
        minWidth: 120,
      }}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
    >
      <MenuItem value="">Select a Country</MenuItem>
      <MenuItem value="USA">United States</MenuItem>
      <MenuItem value="CAN">Canada</MenuItem>
      <MenuItem value="UK">United Kingdom</MenuItem>
      <MenuItem value="FRA">France</MenuItem>
      <MenuItem value="GER">Germany</MenuItem>
      {/* Add more countries as needed */}
    </Select>
  );
}

export default CountryDropdown;
