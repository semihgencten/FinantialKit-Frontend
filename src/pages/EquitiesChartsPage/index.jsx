import { useState, useEffect } from 'react';
import { Box, Button, Chip, Autocomplete, TextField, Grid } from '@mui/material'
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import TabsLayout from '@/pages/EquitiesPage';
import { Graph } from '@/components/Graph';

const EquitiesChartsPage = () => {
  const [graphLightMode, setGraphLightMode] = useState("light");
  const [viewMode, setViewMode] = useState("simple");
  const [selectedIndicatorsList, setSelectedIndicatorsList] = useState([]);
  const indicators = [
    { technicalName: "vol", displayName: "Volume" },
    { technicalName: "rsi", displayName: "Stochastic Indicator" },
    { technicalName: "mom", displayName: "Momentum" },
    { technicalName: "bop", displayName: "Balance of Power"},
  ];

  const toggleColorMode = () => {
    setGraphLightMode(prevMode => (prevMode === "light" ? "dark" : "light"));
  }

  const handleChange = (newValue) => {
    if (newValue.length > 0) {
      setViewMode("complex");
    } 
    else {
      setViewMode("simple");
    }
    if(newValue.length > 4){
      return;
    }
    else{
      setSelectedIndicatorsList(newValue);
    }
  };

  return (
    <TabsLayout>
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", gap: "8px" }}>
            <h2>Charts Page</h2>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                <Autocomplete
                  sx={{ width: 400 }}
                  multiple
                  id="multi-select"
                  options={indicators}
                  value={selectedIndicatorsList}
                  getOptionLabel={(option) => option.displayName}
                  onChange={(event, newValue) => {
                    handleChange(newValue);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        label={option.displayName} 
                        {...getTagProps({ index })}
                        sx={{ marginRight: '4px' }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Multiple Indicators (Maximum of 4)"
                    />
                  )}
                  isOptionEqualToValue={(option, value) => option.technicalName === value.technicalName}
                />
                <Box sx={{ width: "50px", placeSelf: "center" }}>
                    {graphLightMode === "light" ? <DarkModeOutlined onClick={toggleColorMode} /> : <LightModeOutlined onClick={toggleColorMode} />}
                </Box>
            </Box>
            <Grid container justifyContent="center" alignItems="center">
                <Graph graphLightMode={graphLightMode} selectedIndicatorsList={selectedIndicatorsList} viewMode={viewMode} />
            </Grid>
        </Box>
    </TabsLayout>
  );
};

export default EquitiesChartsPage;