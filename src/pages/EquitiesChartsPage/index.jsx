import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TabsLayout from "@/pages/EquitiesPage";
import { Graph } from "@/components/Graph";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const EquitiesChartsPage = () => {
  const [graphLightMode, setGraphLightMode] = useState("light");
  const [viewMode, setViewMode] = useState("simple");
  const [selectedIndicatorsListTemporary, setSelectedIndicatorsListTemporary] =
    useState([]);
  const [selectedIndicatorsList, setSelectedIndicatorsList] = useState([]);
  const [showIndicatorsDialog, setShowIndicatorsDialog] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [indicators, setIndicators] = useState([
    { technicalName: "vol", displayName: "Volume", location: "side" },
    {
      technicalName: "rsi",
      displayName: "Stochastic Indicator",
      location: "side",
    },
    { technicalName: "mom", displayName: "Momentum", location: "side" },
    { technicalName: "bop", displayName: "Balance of Power", location: "side" },
    {
      technicalName: "ma",
      displayName: "Moving Average",
      location: "main",
      options: [
        { val: "ma7", sel: false },
        { val: "ma14", sel: false },
        { val: "ma30", sel: false },
        { val: "ma60", sel: false },
        { val: "ma120", sel: false },
      ],
    },
    { technicalName: "xyz", displayName: "XYZ", location: "side" },
    {
      technicalName: "boll",
      displayName: "Bollinger Bands",
      location: "main",
      options: [
        { val: 1, sel: false },
        { val: "boll5", sel: false },
        { val: "boll7", sel: false },
        { val: "boll10", sel: false },
        { val: "boll12", sel: false },
      ],
    },
  ]);

  const handleIndicatorClick = (indicator) => {
    if (indicator.location === "side") {
      // Check if the indicator already exists in the selectedIndicatorsListTemporary
      const existingIndicator = selectedIndicatorsListTemporary.find(
        (item) => item.technicalName === indicator.technicalName,
      );
      if (!existingIndicator) {
        // If not, add the indicator to the selectedIndicatorsListTemporary
        setSelectedIndicatorsListTemporary([
          ...selectedIndicatorsListTemporary,
          indicator,
        ]);
      } else {
        // If exists, remove it from the temporary list
        const updatedIndicatorsList = selectedIndicatorsListTemporary.filter(
          (item) => item.technicalName !== indicator.technicalName,
        );
        setSelectedIndicatorsListTemporary(updatedIndicatorsList);
      }
    } else if (indicator.options) {
      // If the indicator has options, update the selected option state
      setSelectedOption(indicator);
    }

    if (!indicator.options) {
      setSelectedOption(null);
    }
  };

  const handleOptionSelection = (option) => {
    // Check if the selected option is already present
    const optionIndex = selectedOptions.indexOf(option.val);
    const isOptionSelected = optionIndex !== -1;

    // Construct the indicator object with the selected option
    const selectedIndicator = {
      technicalName: `${option.val}`,
      displayName: `${selectedOption.displayName}-${option.val}`,
      location: "main",
    };

    // Update selected options
    const updatedOptions = isOptionSelected
      ? selectedOptions.filter((val) => val !== option.val)
      : [...selectedOptions, option.val];
    setSelectedOptions(updatedOptions);

    // Update temporary selected indicators list
    const indicatorToRemove = `${option.val}`;
    const updatedIndicatorsList = isOptionSelected
      ? selectedIndicatorsListTemporary.filter(
          (indicator) => indicator.technicalName !== indicatorToRemove,
        )
      : [...selectedIndicatorsListTemporary, selectedIndicator];
    setSelectedIndicatorsListTemporary(updatedIndicatorsList);

    // Update indicators list
    const updatedIndicators = indicators.map((indicator) => {
      if (indicator.technicalName === selectedOption.technicalName) {
        const updatedOptions = indicator.options.map((opt) => {
          if (opt.val === option.val) {
            return { ...opt, sel: !isOptionSelected };
          }
          return opt;
        });
        return { ...indicator, options: updatedOptions };
      }
      return indicator;
    });
    setIndicators(updatedIndicators);
  };

  const handleSubmitIndicators = () => {
    // Convert the temporary list to a Set to ensure uniqueness
    const uniqueIndicatorsSet = new Set(
      selectedIndicatorsListTemporary.map((indicator) =>
        JSON.stringify(indicator),
      ),
    );
    // Convert the Set back to an array of unique indicators
    const uniqueIndicatorsArray = Array.from(uniqueIndicatorsSet).map(
      (indicator) => JSON.parse(indicator),
    );
    setSelectedIndicatorsList(uniqueIndicatorsArray);

    console.log(uniqueIndicatorsArray);
    if (
      uniqueIndicatorsArray.filter((indicator) => indicator.location === "side")
        .length > 0
    ) {
      setViewMode("complex");
    } else {
      setViewMode("simple");
    }

    setShowIndicatorsDialog(false);
  };

  const handleResetIndicators = () => {
    // Reset selected indicators list and temporary list
    setSelectedIndicatorsListTemporary([]);
    setSelectedIndicatorsList([]);

    // Reset selected options
    setSelectedOptions([]);
    // Reset sel field for all options in the indicators state
    const updatedIndicators = indicators.map((indicator) => {
      if (indicator.options) {
        const updatedOptions = indicator.options.map((option) => ({
          ...option,
          sel: false,
        }));
        return { ...indicator, options: updatedOptions };
      }
      return indicator;
    });
    setIndicators(updatedIndicators);

    setViewMode("simple");
    setShowIndicatorsDialog(false);
  };

  return (
    <TabsLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          gap: "8px",
        }}
      >
        <h2>Charts Page</h2>
        <Button
          variant="outlined"
          onClick={() => setShowIndicatorsDialog(true)}
          sx={{ maxWidth: "320px" }}
        >
          Add/Remove Indicators
        </Button>
        <Dialog
          open={showIndicatorsDialog}
          onClose={() => setShowIndicatorsDialog(false)}
          PaperProps={{
            sx: {
              maxWidth: "revert",
              width: "70vw",
              maxHeight: "50vh",
              overflowY: "auto",
            },
          }}
        >
          <Grid container>
            {/* Left column */}
            <Grid item xs={6} sx={{ maxHeight: "40vh", overflowY: "auto" }}>
              <Paper>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Indicator</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {indicators.map((indicator, index) => (
                        <TableRow
                          key={index}
                          onClick={() => handleIndicatorClick(indicator)}
                        >
                          <TableCell>
                            {indicator.displayName}
                            {selectedIndicatorsListTemporary.some(
                              (item) =>
                                item.technicalName === indicator.technicalName,
                            ) && (
                              <CheckCircleIcon
                                color="primary"
                                style={{
                                  verticalAlign: "middle",
                                  float: "right",
                                }}
                              />
                            )}
                            {indicator.options && (
                              <span
                                style={{
                                  verticalAlign: "middle",
                                  float: "right",
                                  marginRight: "8px",
                                }}
                              >
                                {`${selectedOptions.filter((val) => indicator.options.map((opt) => opt.val).includes(val)).length}/${indicator.options.length}`}
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            {/* Right column */}
            <Grid item xs={6} sx={{ maxHeight: "40vh", overflowY: "auto" }}>
              <Paper>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Options</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOption &&
                        indicators
                          .find(
                            (indicator) =>
                              indicator.technicalName ===
                              selectedOption.technicalName,
                          )
                          ?.options.map((option, index) => (
                            <TableRow
                              key={index}
                              onClick={() => handleOptionSelection(option)}
                            >
                              <TableCell>
                                {option.val}
                                {option.sel && (
                                  <CheckCircleIcon
                                    color="primary"
                                    style={{
                                      verticalAlign: "middle",
                                      float: "right",
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                placeContent: "center",
                width: "100%",
                paddingY: "16px",
                gap: "16px",
              }}
            >
              <Button
                variant="contained"
                onClick={handleSubmitIndicators}
                sx={{ height: "30px" }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={handleResetIndicators}
                sx={{ height: "30px" }}
              >
                Reset
              </Button>
            </Box>
          </Grid>
        </Dialog>

        {/* Graph component */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "-webkit-center" }}
        >
          <Graph
            graphLightMode={graphLightMode}
            selectedIndicatorsList={[...selectedIndicatorsList]}
            viewMode={viewMode}
          />
        </Grid>
      </Box>
    </TabsLayout>
  );
};

export default EquitiesChartsPage;
