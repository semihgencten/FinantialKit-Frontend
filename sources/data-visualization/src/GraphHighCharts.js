import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts/highstock";
import { useChartData } from "./useChartData";
import "./GraphHighCharts.css";

export const GraphHighCharts = ({ graphLightMode, selectedIndicatorsList }) => {
  const chartRef = useRef(null);
  const data = useChartData();
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
          name: "AAPL",
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
          height: selectedIndicatorsList.length === 0 ? "100%" : "60%",
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
          text: "Apple Inc. (AAPL)",
        },

        chart: {
          backgroundColor: graphLightMode === "light" ? "#FFFFFF" : "#000000",
        },

        tooltip: {
          split: true,
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
      },
      false,
    ); // false to delay redraw

    chartRef.current.yAxis.forEach((axis) => {
      axis.update(
        {
          gridLineWidth: graphLightMode === "light" ? 1 : 0.5,
          labels: {
            style: {
              color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
            },
          },
          lineColor: graphLightMode === "light" ? "#333333" : "#FFFFFF",
        },
        false,
      ); // false to delay redraw
    });

    /* chartRef.current.series.forEach(series => {
        // apply series-specific updates here if needed
      }); */

    chartRef.current.redraw();
  };

  const updateGraphIndicators = () => {
    const chart = chartRef.current;

    const mainAxis = chart.get("mainAxis");

    if (mainAxis) {
      mainAxis.update(
        {
          height: selectedIndicatorsList.length === 0 ? "100%" : "60%",
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
      if (!chart.get(indicator)) {
        // series doesn't exist, so add it based on the type of indicator
        if (indicator === "volume") {
          if (!chart.get("volumeAxis")) {
            chart.addAxis(
              {
                id: "volumeAxis",
                gridLineWidth: graphLightMode === "light" ? 1 : 0.5,
                labels: {
                  align: "right",
                  x: -3,
                },
                title: {
                  text: "Volume",
                },
                offset: 0,
                lineWidth: 1,
              },
              false,
              false,
            ); // second false to delay redraw
          }

          chart.addSeries(
            {
              id: "volume",
              type: "column",
              name: "Volume",
              data: data.volume,
              yAxis: "volumeAxis",
              dataGrouping: {
                units: groupingUnits,
              },
            },
            false,
          ); // prevent immediate redraw
        }
        if (indicator === "rsi") {
          const rsidata = data.volume;
          if (!chart.get("rsiAxis")) {
            chart.addAxis(
              {
                id: "rsiAxis",
                gridLineWidth: graphLightMode === "light" ? 1 : 0.5,
                labels: {
                  align: "right",
                  x: -3,
                },
                title: {
                  text: "RSI",
                },
                offset: 0,
                lineWidth: 1,
              },
              false,
              false,
            ); // second false to delay redraw
          }

          chart.addSeries(
            {
              id: indicator,
              type: "line",
              name: indicator,
              data: rsidata,
              yAxis: "rsiAxis",
              dataGrouping: {
                units: groupingUnits,
              },
            },
            false,
          ); // prevent immediate redraw
        }
      }
    });

    const axesToRemove = chart.yAxis.filter((axis) => {
      return (
        axis.userOptions.id !== "mainAxis" &&
        axis.userOptions.id !== "navigator-y-axis" &&
        !selectedIndicatorsList.includes(
          axis.userOptions.id.replace("Axis", ""),
        )
      );
    });

    axesToRemove.forEach((axis) => {
      axis.remove(false);
    });

    const defaultMainGraphHeight = 60; // main OHLC graph is 60% default
    const computedIndicatorHeight = 40 / selectedIndicatorsList.length; // the amount remaining from the default graph is 40% for indicators

    // iterate over the remaining axes to update their height and top values
    chart.yAxis.forEach((axis) => {
      // ensure we're only dealing with indicator axes, not the main or navigator axis
      if (
        axis.options.id !== "mainAxis" &&
        axis.options.id !== "navigator-y-axis"
      ) {
        const indicatorIndex = selectedIndicatorsList.indexOf(
          axis.options.id.replace("Axis", ""),
        );
        if (indicatorIndex !== -1) {
          // If the axis is found in the selectedIndicatorsList
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

    chart.redraw();
  };

  useEffect(() => {
    initializeGraph();
  }, [data.ohlc, data.volume]);

  useEffect(() => {
    if (chartRef.current) {
      updateGraphForLightOrDarkMode();
    }
  }, [graphLightMode]);

  useEffect(() => {
    if (chartRef.current) {
      updateGraphIndicators();
    }
  }, [selectedIndicatorsList, data]);

  return <div id="stockGraph"></div>;
};
