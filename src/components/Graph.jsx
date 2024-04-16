import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts/highstock";
import { Box } from "@mui/material";
import { useChartData } from "@/hooks/useChartData";
import "./Graph.css";

export const Graph = ({
  graphLightMode = "light",
  selectedIndicatorsList = [],
  viewMode = "simple",
}) => {
  const chartRef = useRef(null);
  const data = useChartData(
    "https://demo-live-data.highcharts.com/aapl-ohlcv.json",
  );

  // comment below for Backend API Request
  // const data = useChartData("http://localhost:8000/api/histories/");

  const groupingUnits = [
    ["week", [1]],
    ["month", [1, 2, 3, 4, 6]],
  ];

  const initializeGraph = () => {
    if (data.ohlc.length > 0 && !chartRef.current) {
      // always by default, the main graph with ohlc data will be rendered
      const series = [
        {
          type: "candlestick",
          name: "NVDA",
          data: data.ohlc,
          id: "main",
          dataGrouping: {
            units: groupingUnits,
          },
        },
      ];

      const yAxis = [
        {
          id: "mainAxis",
          gridLineWidth: graphLightMode === "light" ? 1 : 0.5,
          labels: {
            align: "right",
            x: -3,
          },
          title: {
            text: "Candlestick",
          },
          height: viewMode === "simple" ? "100%" : "60%",
          lineWidth: 1,
          resize: {
            enabled: true,
          },
        },
      ];

      const plotOptions = {
        candlestick: {
          color: graphLightMode === "light" ? "#ef5350" : "#F44336",
          upColor: graphLightMode === "light" ? "#26a69a" : "#4CAF50",
          lineColor: graphLightMode === "light" ? "#ef5350" : "#F44336",
          upLineColor: graphLightMode === "light" ? "#26a69a" : "#4CAF50",
          pointPadding: 0.1,
          groupPadding: 0.1,
        },
        column: {
          /*color: graphLightMode === 'light' ? '#26a69a' : '#4CAF50',*/
          color: graphLightMode === "light" ? "#89CFF0" : "#89CFF0",
          negativeColor: graphLightMode === "light" ? "#ef5350" : "#F44336",
          pointPadding: 0.02,
          groupPadding: 0.02,
          borderColor: graphLightMode === "light" ? "transparent" : "#000000",
          borderWidth: 1,
          borderRadius: 0,
        },
      };

      chartRef.current = Highcharts.stockChart("stockGraph", {
        rangeSelector: {
          selected: 4,
        },

        title: {
          text: "NVIDIA Corp (NVDA)",
        },

        chart: {
          backgroundColor: graphLightMode === "light" ? "#FFFFFF" : "#000000",
        },

        yAxis: yAxis,

        series: series,

        plotOptions: plotOptions,

        navigator: {
          series: {
            id: "main",
          },
        },
      });
    }
  };

  const updateAxisColors = () => {
    chartRef.current.yAxis.forEach((axis) => {
      axis.update(
        {
          gridLineWidth: graphLightMode === "light" ? 1 : 0.5,
          lineColor: graphLightMode === "light" ? "#333333" : "#FFFFFF",
          title: {
            style: {
              color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
            },
          },
          labels: {
            style: {
              color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
            },
          },
        },
        false,
      );
    });

    chartRef.current.redraw();
  };

  const updatePlotOptions = () => {
    chartRef.current.series.forEach((series) => {
      if (series.name && series.name !== "NVDA") {
        series.update(
          {
            tooltip: {
              pointFormat: "<span>{point.y}</span>",
            },
          },
          false,
        );
      }
    });

    chartRef.current.redraw();
  };

  const updateGraphForLightOrDarkMode = () => {
    chartRef.current.update(
      {
        chart: {
          backgroundColor: graphLightMode === "light" ? "#FFFFFF" : "#000000",
        },
        plotOptions: {
          candlestick: {
            color: graphLightMode === "light" ? "#ef5350" : "#F44336",
            upColor: graphLightMode === "light" ? "#26a69a" : "#4CAF50",
            lineColor: graphLightMode === "light" ? "#ef5350" : "#F44336",
            upLineColor: graphLightMode === "light" ? "#26a69a" : "#4CAF50",
          },
          column: {
            color: graphLightMode === "light" ? "#89CFF0" : "#89CFF0",
            negativeColor: graphLightMode === "light" ? "#ef5350" : "#F44336",
            borderColor: graphLightMode === "light" ? "transparent" : "#000000",
          },
        },
        tooltip: {
          style: {
            color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
            fontSize: "12px",
          },
          backgroundColor:
            graphLightMode === "light"
              ? "rgba(255, 255, 255, 0.65)"
              : "rgba(0, 0, 0, 0.5)",
          borderColor: graphLightMode === "light" ? "#FFFFFF" : "#CCCCCC",
          borderRadius: 5,
          borderWidth: 1,
        },
        navigator: {
          maskFill:
            graphLightMode === "light"
              ? "rgba(102, 122, 255, 0.3)"
              : "rgba(255, 255, 255, 0.3)",
        },
        title: {
          style: {
            color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
          },
        },
        xAxis: {
          labels: {
            style: {
              color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
            },
          },
        },
        yAxis: {
          title: {
            style: {
              color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
            },
          },
          labels: {
            style: {
              color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
            },
          },
        },
      },
      false,
    ); // false to delay redraw
  };

  const addIndicatorAxis = (chart, axisName, indicatorTechnicalName) => {
    chart.addAxis(
      {
        id: axisName,
        gridLineWidth: graphLightMode === "light" ? 1 : 0.5,
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: indicatorTechnicalName,
        },
        offset: 0,
        lineWidth: 1,
      },
      false,
      false,
    ); // second false to delay redraw
  };

  const addIndicatorSeries = (chart, axisName, indicator, data) => {
    chart.addSeries(
      {
        id: indicator.technicalName,
        type: indicator.technicalName === "vol" ? "column" : "line",
        name: indicator.displayName,
        data: data,
        yAxis: axisName,
        dataGrouping: {
          units: groupingUnits,
        },
      },
      false,
    ); // prevent immediate redraw
  };

  const updateGraphIndicators = () => {
    const chart = chartRef.current;

    const mainAxis = chart.get("mainAxis");

    if (mainAxis) {
      mainAxis.update(
        {
          height: viewMode === "simple" ? "100%" : "60%",
        },
        false,
      );
    }

    const seriesToRemove = chart.series.filter(
      (series) =>
        series.userOptions.id !== "main" &&
        !selectedIndicatorsList.includes(series.userOptions.id),
    );

    seriesToRemove.forEach((series) => series.remove(false));

    // dynamically check and add missing indicators
    selectedIndicatorsList.forEach((indicator) => {
      // check if the series already exists
      let axisName;
      if (!chart.get(indicator)) {
        // series doesn't exist, so add it based on the type of indicator
        if (indicator.technicalName === "vol") {
          axisName = indicator.technicalName + "Axis";
          if (!chart.get(axisName)) {
            addIndicatorAxis(chart, axisName, indicator.technicalName);
          }

          addIndicatorSeries(chart, axisName, indicator, data.volume);
        }
        if (indicator.technicalName === "rsi") {
          const rsidata = data.volume;
          axisName = indicator.technicalName + "Axis";
          if (!chart.get(axisName)) {
            addIndicatorAxis(chart, axisName, indicator.technicalName);
          }
          addIndicatorSeries(chart, axisName, indicator, rsidata);
        }
        if (indicator.technicalName === "mom") {
          const momdata = data.volume;
          axisName = indicator.technicalName + "Axis";
          if (!chart.get(axisName)) {
            addIndicatorAxis(chart, axisName, indicator.technicalName);
          }
          addIndicatorSeries(chart, axisName, indicator, momdata);
        }
        if (indicator.technicalName === "bop") {
          const momdata = data.volume;
          axisName = indicator.technicalName + "Axis";
          if (!chart.get(axisName)) {
            addIndicatorAxis(chart, axisName, indicator.technicalName);
          }
          addIndicatorSeries(chart, axisName, indicator, momdata);
        }
      }
    });

    const axesToRemove = chart.yAxis.filter((axis) => {
      return (
        axis.userOptions.id !== "mainAxis" &&
        axis.userOptions.id !== "navigator-y-axis" &&
        !selectedIndicatorsList.some(
          (indicator) =>
            axis.userOptions.id === indicator.technicalName + "Axis",
        )
      );
    });

    axesToRemove.forEach((axis) => {
      axis.remove(false);
    });

    const defaultMainGraphHeight = viewMode === "simple" ? 100 : 60; // main OHLC graph is 60% default
    const computedIndicatorHeight = 40 / selectedIndicatorsList.length; // the amount remaining from the default graph is 40% for indicators

    // iterate over the remaining axes to update their height and top values
    chart.yAxis.forEach((axis) => {
      // ensure we're only dealing with indicator axes, not the main or navigator axis
      if (
        axis.options.id !== "mainAxis" &&
        axis.options.id !== "navigator-y-axis"
      ) {
        const indicator = selectedIndicatorsList.find(
          (ind) => axis.options.id === ind.technicalName + "Axis",
        );
        if (indicator) {
          // If the axis is found in the selectedIndicatorsList
          const indicatorIndex = selectedIndicatorsList.indexOf(indicator);
          const topPositionValue =
            defaultMainGraphHeight + indicatorIndex * computedIndicatorHeight;
          const topPositionString = `${topPositionValue}%`;
          const indicatorHeightString = `${computedIndicatorHeight}%`;

          // now update the axis with the new height and top values
          axis.update(
            {
              top: topPositionString,
              height: indicatorHeightString,
            },
            false,
          ); // false to delay the redraw
        }
      }
    });
  };

  useEffect(() => {
    initializeGraph();
  }, [data.ohlc, data.volume]);

  useEffect(() => {
    if (chartRef.current) {
      updateGraphForLightOrDarkMode();
      updateAxisColors();
      updatePlotOptions();
    }
  }, [graphLightMode]);

  useEffect(() => {
    if (chartRef.current) {
      updateGraphIndicators();
      updateAxisColors();
      updatePlotOptions();
    }
  }, [selectedIndicatorsList, data, viewMode]);

  return <Box id="stockGraph"></Box>;
};
