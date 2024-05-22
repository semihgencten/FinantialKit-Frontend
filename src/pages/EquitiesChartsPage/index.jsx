import { useState, useEffect } from "react";
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
import axios from "axios";

const EquitiesChartsPage = () => {
  const [graphLightMode, setGraphLightMode] = useState("light");
  const [viewMode, setViewMode] = useState("simple");
  const [selectedIndicatorsListTemporary, setSelectedIndicatorsListTemporary] =
    useState([]);
  const [selectedIndicatorsList, setSelectedIndicatorsList] = useState([]);
  const [showIndicatorsDialog, setShowIndicatorsDialog] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [indicators, setIndicators] = useState([]);

  const locationMap = {
    "Cycle Indicators": "main",
    "Math Operators": "main",
    "Math Transform": "main",
    "Momentum Indicators": "main",
    "Overlap Studies": "main",
    "Pattern Recognition": "main",
    "Price Transform": "main",
    "Statistic Functions": "main",
    "Volatility Indicators": "main",
    "Volume Indicators": "main",
    // must be provided if some of them will be on main
  };

  const fetchAndFormatIndicators = async () => {
    try {
      const response = await axios.get(
        "http://13.50.126.209:8000/api/indicators/",
      );
      const indicatorsList = response.data;
      console.log(indicatorsList);
      const formattedIndicators = [];

      if (indicatorsList) {
        for (const category in indicatorsList) {
          const location = locationMap[category] || "side";
          const technicalIndicators = indicatorsList[category];

          if (Array.isArray(technicalIndicators)) {
            const options = technicalIndicators.map((technicalName) => ({
              val: technicalName.toLowerCase(),
              sel: false,
            }));

            formattedIndicators.push({
              technicalName: category.toLowerCase(),
              displayName: category,
              location,
              options,
            });
          } else {
            console.error(
              `Expected an array for category "${category}", but got:`,
              technicalIndicators,
            );
          }
        }
        console.log(formattedIndicators);
        setIndicators(formattedIndicators);
      } else {
        console.error("No data received from the API");
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  useEffect(() => {
    fetchAndFormatIndicators();
  }, []);

  const handleIndicatorClick = (indicator) => {
    if (indicator.location === "main") {
      const existingIndicator = selectedIndicatorsListTemporary.find(
        (item) => item.technicalName === indicator.technicalName,
      );

      if (!existingIndicator) {
        setSelectedIndicatorsListTemporary([
          ...selectedIndicatorsListTemporary,
          indicator,
        ]);
      } else {
        const updatedIndicatorsList = selectedIndicatorsListTemporary.filter(
          (item) => item.technicalName !== indicator.technicalName,
        );
        setSelectedIndicatorsListTemporary(updatedIndicatorsList);
      }

      if (indicator.options) {
        setSelectedOption(indicator);
      }

      if (!indicator.options) {
        setSelectedOption(null);
      }
    }
  };

  const handleOptionSelection = (option) => {
    const optionIndex = selectedOptions.indexOf(option.val);
    const isOptionSelected = optionIndex !== -1;

    const selectedIndicator = {
      technicalName: `${option.val}`,
      displayName: `${selectedOption.displayName}-${option.val}`,
      location: "side",
    };

    const updatedOptions = isOptionSelected
      ? selectedOptions.filter((val) => val !== option.val)
      : [...selectedOptions, option.val];
    setSelectedOptions(updatedOptions);

    const indicatorToRemove = `${option.val}`;
    const updatedIndicatorsList = isOptionSelected
      ? selectedIndicatorsListTemporary.filter(
          (indicator) => indicator.technicalName !== indicatorToRemove,
        )
      : [...selectedIndicatorsListTemporary, selectedIndicator];
    setSelectedIndicatorsListTemporary(updatedIndicatorsList);

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
    const uniqueIndicatorsSet = new Set(
      selectedIndicatorsListTemporary.map((indicator) =>
        JSON.stringify(indicator),
      ),
    );
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

    console.log(indicators);
  };

  const handleResetIndicators = () => {
    setSelectedIndicatorsListTemporary([]);
    setSelectedIndicatorsList([]);
    setSelectedOptions([]);

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
          height: "92vh",
        }}
      >
        <h2>Charts Page</h2>
        <Button
          variant="outlined"
          onClick={() => setShowIndicatorsDialog(true)}
          sx={{ maxWidth: "320px", ml: "180px" }}
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
            indicators={indicators}
          />
        </Grid>
      </Box>
    </TabsLayout>
  );
};

export default EquitiesChartsPage;
