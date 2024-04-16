import { useEffect, useState, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

export const useCreateGraph = (
  mainChartRef,
  indicatorGraphsRefs,
  graphDataSeries,
  graphIndicatorTuples,
  graphSeriesType,
  graphLightMode,
) => {
  useEffect(() => {
    const initializeMainChart = () => {
      if (!mainChartRef.current) return;

      if (!mainChartRef.current.chart) {
        const chart = createChart(
          mainChartRef.current,
          getChartLayout(graphLightMode, "main", graphIndicatorTuples),
        );
        mainChartRef.current.chart = chart;

        if (graphDataSeries && graphDataSeries.length > 0) {
          initializeSeriesForMainChart(
            chart,
            graphDataSeries,
            graphSeriesType,
            graphLightMode,
          );
        }
        chart.timeScale().fitContent();
      } else {
        mainChartRef.current.chart.applyOptions(
          getChartLayout(graphLightMode, "main", graphIndicatorTuples),
        );
      }
    };

    const initializeIndicatorCharts = () => {
      Object.keys(indicatorGraphsRefs.current).forEach((indicatorName) => {
        const indicatorData = graphIndicatorTuples.find((indicatorTuple) => {
          return indicatorTuple.name === indicatorName;
        });

        const indicatorGraphRef = indicatorGraphsRefs.current[indicatorName];
        if (!indicatorGraphRef) return;

        if (!indicatorGraphRef.chart) {
          const chart = createChart(indicatorGraphRef, {
            ...getChartLayout(
              graphLightMode,
              "indicator",
              graphIndicatorTuples,
            ),
            height: 200,
          });
          indicatorGraphRef.chart = chart;

          if (indicatorName === "volume") {
            initializeSeriesForIndicator(
              chart,
              indicatorData.data,
              indicatorData.name,
              graphLightMode,
            );
          }
          chart.timeScale().fitContent();
        } else {
          indicatorGraphRef.chart.applyOptions({
            ...getChartLayout(
              graphLightMode,
              "indicator",
              graphIndicatorTuples,
            ),
            height: 200,
          });
        }
      });
    };

    initializeMainChart();
    initializeIndicatorCharts();

    return () => {
      if (mainChartRef.current?.chart) {
        mainChartRef.current.chart.remove();
        mainChartRef.current.chart = null;
      }

      Object.values(indicatorGraphsRefs.current).forEach((ref) => {
        if (ref.current?.chart) {
          ref.current.chart.remove();
          ref.current.chart = null;
        }
      });
    };
  }, [
    mainChartRef,
    indicatorGraphsRefs,
    graphDataSeries,
    graphIndicatorTuples,
    graphSeriesType,
    graphLightMode,
  ]);
};

function getChartLayout(
  graphLightMode,
  graphTypeMainOrIndicator,
  graphIndicatorTuples,
) {
  // case 1) when there is an indicator below main graph => no date scale on below
  // case 2) when there is no indicator below main graph => date scale exists below
  const timeScaleVisible = !(
    graphTypeMainOrIndicator === "main" && graphIndicatorTuples.length > 0
  );

  return {
    layout: {
      background: {
        type: "solid",
        color: graphLightMode === "dark" ? "#000000" : "#FFFFFF",
      },
      textColor:
        graphLightMode === "dark"
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(0, 0, 0, 0.9)",
    },
    grid: {
      vertLines: {
        color:
          graphLightMode === "dark"
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(0, 0, 0, 0.2)",
        style: 1,
        width: 0.5,
      },
      horzLines: {
        color:
          graphLightMode === "dark"
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(0, 0, 0, 0.2)",
        style: 1,
        width: 0.5,
      },
    },
    crosshair: {
      mode: CrosshairMode.Normal,
    },
    rightPriceScale: {
      scaleMargins: {
        top: 0.2,
        bottom: 0.2,
      },
    },
    timeScale: {
      visible: timeScaleVisible,
    },
  };
}

function initializeSeriesForMainChart(chart, data, seriesType, graphLightMode) {
  let series;
  if (seriesType === "candlestick") {
    series = chart.addCandlestickSeries({
      upColor: graphLightMode === "light" ? "#26a69a" : "#4CAF50",
      downColor: graphLightMode === "light" ? "#ef5350" : "#F44336",
      borderVisible: false,
      wickUpColor: graphLightMode === "light" ? "#26a69a" : "#4CAF50",
      wickDownColor: graphLightMode === "light" ? "#ef5350" : "#F44336",
    });
  } else if (seriesType === "line") {
    series = chart.addLineSeries({
      color: graphLightMode === "light" ? "#2962FF" : "#4CAF50",
    });
  }
  series.setData(data);
}

function initializeSeriesForIndicator(chart, data, seriesType, graphLightMode) {
  if (seriesType === "volume") {
    const series = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: { type: "volume" },
    });
    series.setData(
      data.map((item) => ({ time: item.time, value: item.value })),
    );
  }
}
