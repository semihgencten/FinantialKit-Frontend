import { useState, useEffect } from "react";
import { Box, Button, Dialog, Grid, Paper } from "@mui/material";
import TabsLayout from "@/pages/EquitiesPage";
import { Graph } from "@/components/Graph";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const EquitiesChartsPage = () => {
  const [graphLightMode, setGraphLightMode] = useState("light");
  const [viewMode, setViewMode] = useState("simple");
  const [selectedIndicatorsList, setSelectedIndicatorsList] = useState([]);
  const [showIndicatorsDialog, setShowIndicatorsDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [indicators, setIndicators] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [finalizedIndicators, setFinalizedIndicators] = useState([]);

  const [graphReservedViewHeight, setGraphReservedViewHeight] = useState(100);


  const fetchAndFormatIndicators = async () => {
    try {
      const response = await axios.get(
        "http://13.50.126.209:8000/api/indicators/",
      );
      const indicatorsList = response.data;
      if (indicatorsList) {
        const indicatorTypesToRemove = ["Math Operators", "Math Transform", "Statistic Functions"];
        
        const filteredIndicatorsList = Object.entries(indicatorsList)
        .reduce((acc, [key, value]) => {
            if (!indicatorTypesToRemove.includes(key)) {
                acc[key] = value;
            }
            return acc;
        }, {});
    
        const formattedIndicators = Object.keys(filteredIndicatorsList).map(
          (category) => ({
            technicalName: category.toLowerCase(),
            displayName: category,
            location: "main",
            options: filteredIndicatorsList[category].map((technicalName) => ({
              val: technicalName.toLowerCase(),
              sel: false,
            })),
          }),
        );
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
    setSelectedOption(indicator);
    setShowOptions(true);
  };

  const handleOptionSelection = (option) => {
    const updatedIndicators = indicators.map((ind) => {
      if (ind.technicalName === selectedOption.technicalName) {
        return {
          ...ind,
          options: ind.options.map((opt) => ({
            ...opt,
            sel: opt.val === option.val ? !opt.sel : opt.sel,
          })),
        };
      }
      return ind;
    });

    setIndicators(updatedIndicators);

    const optionSelected = updatedIndicators
      .find((ind) => ind.technicalName === selectedOption.technicalName)
      .options.find((opt) => opt.val === option.val).sel;

    if (optionSelected) {
      setSelectedIndicatorsList((prev) => [
        ...prev,
        {
          ...option,
          technicalName: `${option.val}`,
          displayName: `${selectedOption.displayName}-${option.val}`,
          location: "side",
          sel: true,
        },
      ]);
    } else {
      setSelectedIndicatorsList((prev) =>
        prev.filter((ind) => ind.technicalName !== `${option.val}`),
      );
    }
  };

  const handleBackToCategories = () => {
    setShowOptions(false);
  };

  const handleCloseDialog = () => {
    if (selectedIndicatorsList.length > 0) {
      setViewMode("complex");
    } else {
      setViewMode("simple");
    }

    let indicatorCountSide = selectedIndicatorsList.filter(
        (indicator) => indicator.location === "side" && !indicator.displayName.startsWith("Overlap Studies")
      ).length;
    if(indicatorCountSide === 0){
        setGraphReservedViewHeight(100);
    }
    else{
        setGraphReservedViewHeight(100 + (2 * indicatorCountSide));
    }
    setFinalizedIndicators(selectedIndicatorsList);
    setShowIndicatorsDialog(false);
    setShowOptions(false);
  };

  useEffect(() => {
    document.getElementById('box123').style.height = graphReservedViewHeight + "vh";
  }, [graphReservedViewHeight]);

  return (
    <TabsLayout>
      <Box
      id="box123"
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          gap: "8px",
          height: (graphReservedViewHeight.toString() + "vh")
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
          onClose={handleCloseDialog}
          PaperProps={{
            sx: { maxHeight: "50vh", overflowY: "auto", width: "25vw" },
          }}
        >
          {!showOptions ? (
            <Grid
              container
              sx={{
                height: "65vh",
                overflowY: "auto",
                justifyContent: "center",
                placeContent: "center",
              }}
            >
              <h4
                style={{ textAlign: "center", width: "100%", margin: "1rem" }}
              >
                Select Indicator Category
              </h4>
              {indicators.map((indicator, index) => {
                const selTrueAmount = indicator.options.filter(
                  (option) => option.sel,
                ).length;
                const totalOptions = indicator.options.length;
                const fractionDisplay = `${selTrueAmount} / ${totalOptions}`;
                return (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    onClick={() => handleIndicatorClick(indicator)}
                    sx={{ textAlign: "-webkit-center" }}
                  >
                    <Paper
                      square
                      variant="outlined"
                      sx={{
                        padding: "5px",
                        margin: "5px",
                        width: "15vw",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ marginLeft: "2%" }}>
                        {indicator.displayName}
                      </div>
                      <div style={{ marginLeft: "auto" }}>
                        {fractionDisplay}
                      </div>
                    </Paper>
                  </Grid>
                );
              })}
              <Button
                variant="outlined"
                onClick={handleCloseDialog}
                sx={{ width: "160px", mt: "12px" }}
              >
                Apply
              </Button>
            </Grid>
          ) : (
            <>
              <Grid
                container
                sx={{
                  justifyContent: "center",
                  placeContent: "center",
                  pb: "2rem",
                  mt: "10px",
                }}
              >
                <h4 style={{ textAlign: "center", margin: "1rem" }}>
                  {selectedOption.displayName}
                </h4>
                <KeyboardReturnIcon
                  onClick={handleBackToCategories}
                  color="primary"
                  style={{
                    position: "absolute",
                    right: 20,
                    top: 20,
                    height: "40px",
                    width: "40px",
                  }}
                />
                {selectedOption.options.map((option, index) => (
                  <Grid
                    item
                    key={index}
                    xs={8}
                    onClick={() => handleOptionSelection(option)}
                  >
                    <Paper
                      square
                      variant="outlined"
                      sx={{
                        padding: "5px",
                        margin: "5px",
                        width: "15vw",
                        cursor: "pointer",
                      }}
                    >
                      {option.val}
                      {selectedIndicatorsList.some(
                        (ind) => ind.val === option.val && ind.sel,
                      ) && (
                        <CheckCircleIcon
                          color="primary"
                          sx={{ float: "right" }}
                        />
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Dialog>
        <Graph
          graphLightMode={graphLightMode}
          selectedIndicatorsList={finalizedIndicators}
          viewMode={viewMode}
          indicators={indicators}
          graphReservedViewHeight={graphReservedViewHeight}
        />
      </Box>
    </TabsLayout>
  );
};

export default EquitiesChartsPage;
