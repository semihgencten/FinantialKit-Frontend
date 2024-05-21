import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts/highstock";
import { Box } from "@mui/material";
import { useChartData } from "@/hooks/useChartData";
import "./Graph.css";
import axios from "axios";

export const Graph = ({
  graphLightMode = "light",
  selectedIndicatorsList = [],
  viewMode = "simple",
  indicators,
  stockName = "NVDA",
}) => {
  const [stockGraphData, setStockGraphData] = useState([]);
  const [stockVolumeData, setStockVolumeData] = useState([]);

  const fetchStockData = async (startDate, endDate) => {
    try {
      const url = `http://13.50.126.209:8000/api/stocks/${stockName}/priceHistory/${startDate}/${endDate}/1d`;
      const response = await axios.get(url);
      const stockData = response.data.priceHistory;
      const chartData = stockData.map((data) => {
        const timestamp = new Date(data.Date).getTime();
        return [timestamp, data.Open, data.High, data.Low, data.Close];
      });

      const volumeData = stockData.map((data) => {
        const timestamp = new Date(data.Date).getTime();
        return [timestamp, data.Volume];
      });

      console.log(chartData, volumeData);
      setStockGraphData(chartData);
      setStockVolumeData(volumeData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchIndicator = async () => {
    const postBody = {
      symbol: "AAPL",
      start_date: "2024-05-14",
      end_date: "2024-05-20",
      indicator: "MA",
      period: 14,
      price_type: "close",
    };
    const response = await axios.post(
      "http://13.50.126.209:8000/api/indicators/",
      postBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  };

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const today = new Date();
    const lastYearToday = new Date(today);
    lastYearToday.setFullYear(today.getFullYear() - 50);

    const formattedToday = getFormattedDate(today);
    const formattedLastYearToday = getFormattedDate(lastYearToday);

    fetchStockData(formattedLastYearToday, formattedToday);
    fetchIndicator();
  }, [stockName]);

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
    if (stockGraphData.length > 0 && !chartRef.current) {
      // always by default, the main graph with ohlc data will be rendered
      const series = [
        {
          type: "candlestick",
          name: "NVDA",
          data: stockGraphData,
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

        tooltip: {
          shape: "square",
          headerShape: "callout",
          borderWidth: 0,
          shadow: false,
          positioner: function (width, height, point) {
            const chart = this.chart;
            let position;

            if (point.isHeader) {
              position = {
                x: Math.max(
                  chart.plotLeft,
                  Math.min(
                    point.plotX + chart.plotLeft - width / 2,
                    chart.chartWidth - width - chart.marginRight,
                  ),
                ),
                y: point.plotY,
              };
            } else {
              position = {
                x: point.series.chart.plotLeft,
                y: point.series.yAxis.top - chart.plotTop,
              };
            }
            return position;
          },
          formatter: function () {
            let s = "";

            if (this.points) {
              console.log(this.points);
              this.points.forEach(function (point) {
                if (point.point.open !== undefined) {
                  s +=
                    `<b>${Highcharts.dateFormat("%d %b %Y", point.point.x)}</b><br/>` +
                    `<b>${point.series.name}</b><br/>` +
                    `<b>Open: ${point.point.open}</b><br/>` +
                    `<b>High: ${point.point.high}</b><br/>` +
                    `<b>Low: ${point.point.low}</b><br/>` +
                    `<b>Close: ${point.point.close}</b><br/>`;
                } else {
                  s += `<b>${point.series.name}: ${point.y}</b><br/>`;
                }
              });
            } else {
              s = Highcharts.dateFormat("%d %b %Y", this.x);
            }
            return s;
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
      console.log(series);
      if (
        series.name &&
        series.name !== "NVDA" &&
        series.yAxis.userOptions.id !== "mainAxis"
      ) {
        series.update(
          {
            tooltip: {
              pointFormat: "<span>{series.name}: {point.y}</span>",
            },
          },
          false,
        );
      } else if (
        series.name &&
        series.name !== "NVDA" &&
        series.yAxis.userOptions.id === "mainAxis"
      ) {
        series.update(
          {
            tooltip: {
              pointFormat: "<span>{series.userOptions.id}: {point.y}</span>",
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

  // add axis for side indicator
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

    const sideIndicatorSeriesToRemove = chart.series.filter(
      (series) =>
        series.userOptions.id !== "main" &&
        !selectedIndicatorsList.includes(series.userOptions.id),
    );

    sideIndicatorSeriesToRemove.forEach((series) => series.remove(false));

    // dynamically check and add missing indicators
    selectedIndicatorsList.forEach((indicator) => {
      // check if the series already exists
      let axisName;
      if (!chart.get(indicator)) {
        // series doesn't exist, so add it based on the type of indicator
        if (indicator.technicalName === "ad") {
          axisName = indicator.technicalName + "Axis";
          if (!chart.get(axisName)) {
            addIndicatorAxis(chart, axisName, indicator.technicalName);
          }
          console.log(stockVolumeData);
          console.log(data.volume);
          addIndicatorSeries(chart, axisName, indicator, stockVolumeData);
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
            addIndicatorAxis(
              chart,
              axisName,
              indicator.technicalName,
              indicator.location,
            );
          }
          addIndicatorSeries(chart, axisName, indicator, momdata);
        }
        if (indicator.technicalName === "bop") {
          const bopdata = data.volume;
          axisName = indicator.technicalName + "Axis";
          if (!chart.get(axisName)) {
            addIndicatorAxis(
              chart,
              axisName,
              indicator.technicalName,
              indicator.location,
            );
          }
          addIndicatorSeries(chart, axisName, indicator, bopdata);
        }
        // uncomment below for code which work with correct data
        /* if (indicator.location === "main") {
                    addIndicatorSeries(chart, axisName, indicator, data.ohlc, indicator.location);
                } */
        // for mockup purposes, temporarily some values close to data.ohlc will be provided for ma7, ma14 and ma30
        if (indicator.technicalName === "ma7") {
          let b = data.ohlc.map((index) => {
            return [index[0], index[1] - 15];
          });

          addIndicatorSeries(chart, "mainAxis", indicator, b);
        }

        if (indicator.technicalName === "ma14") {
          let c = data.ohlc.map((index) => {
            return [index[0], index[1] + 15];
          });

          addIndicatorSeries(chart, "mainAxis", indicator, c);
        }

        if (indicator.technicalName === "ma30") {
          addIndicatorSeries(chart, "mainAxis", indicator, data.ohlc);
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
    const computedIndicatorHeight =
      40 /
      selectedIndicatorsList.filter(
        (indicator) => indicator.location === "side",
      ).length; // the amount remaining from the default graph is 40% for side indicators
    // iterate over the remaining axes to update their height and top values
    chart.yAxis.forEach((axis) => {
      // ensure we're only dealing with indicator axes, not the main or navigator axis
      if (
        axis.options.id !== "mainAxis" &&
        axis.options.id !== "navigator-y-axis"
      ) {
        const sideIndicators = selectedIndicatorsList.filter(
          (indicator) => indicator.location === "side",
        );
        const indicator = sideIndicators.find(
          (ind) => axis.options.id === ind.technicalName + "Axis",
        );
        if (indicator) {
          // If the axis is found in the selectedIndicatorsList
          const indicatorIndex = sideIndicators.indexOf(indicator);
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
    if (chartRef.current) {
      updateGraphForLightOrDarkMode();
    }
  }, [stockGraphData, stockVolumeData]);

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
  }, [selectedIndicatorsList, stockGraphData, viewMode]);

  return <Box id="stockGraph"></Box>;
};
