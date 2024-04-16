import React, { useState, useEffect, useRef } from "react";
import { useCreateGraph } from "./useCreateGraph";
import "./Graph.css";

export const Graph = () => {
  const mainGraphRef = useRef(null);

  const [graphIndicatorTuples, setGraphIndicatorTuples] = useState([]);
  const [graphDataSeries, setGraphDataSeries] = useState([]);
  const [graphAreaSeries, setGraphAreaSeries] = useState([]);
  const [graphSeriesType, setGraphSeriesType] = useState("candlestick");
  const [graphLightMode, setGraphLightMode] = useState("light");

  const indicatorsTransform = graphIndicatorTuples.map(([name, data]) => ({
    name,
    type: name,
    data,
  }));

  const indicatorGraphsRefs = useRef({});

  useEffect(() => {
    const currentIndicatorNames = new Set(
      indicatorsTransform.map((indicator) => indicator.name),
    );

    indicatorsTransform.forEach((indicator) => {
      if (!indicatorGraphsRefs.current[indicator.name]) {
        indicatorGraphsRefs.current[indicator.name] = React.createRef();
      }
    });

    Object.keys(indicatorGraphsRefs.current).forEach((indicatorName) => {
      if (!currentIndicatorNames.has(indicatorName)) {
        delete indicatorGraphsRefs.current[indicatorName];
      }
    });
  }, [indicatorsTransform]);

  const addTuples = (str, arr) => {
    setGraphIndicatorTuples([...graphIndicatorTuples, [str, arr]]);
  };

  const removeTuples = (index) => {
    setGraphIndicatorTuples(graphIndicatorTuples.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setGraphDataSeries([
      {
        time: "2018-12-22",
        open: 75.16,
        high: 82.84,
        low: 36.16,
        close: 45.72,
      },
      { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
      {
        time: "2018-12-24",
        open: 60.71,
        high: 60.71,
        low: 53.39,
        close: 59.29,
      },
      { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
      {
        time: "2018-12-26",
        open: 67.71,
        high: 105.85,
        low: 66.67,
        close: 91.04,
      },
      { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
      {
        time: "2018-12-28",
        open: 111.51,
        high: 142.83,
        low: 103.34,
        close: 131.25,
      },
      {
        time: "2018-12-29",
        open: 131.33,
        high: 151.17,
        low: 77.68,
        close: 96.43,
      },
      {
        time: "2018-12-30",
        open: 106.33,
        high: 110.2,
        low: 90.39,
        close: 98.1,
      },
      {
        time: "2018-12-31",
        open: 109.87,
        high: 114.69,
        low: 85.66,
        close: 111.26,
      },
    ]);

    setGraphAreaSeries([
      { time: "2018-12-22", value: 32.51 },
      { time: "2018-12-23", value: 31.11 },
      { time: "2018-12-24", value: 27.02 },
      { time: "2018-12-25", value: 27.32 },
      { time: "2018-12-26", value: 25.17 },
      { time: "2018-12-27", value: 28.89 },
      { time: "2018-12-28", value: 25.46 },
      { time: "2018-12-29", value: 23.92 },
      { time: "2018-12-30", value: 22.68 },
      { time: "2018-12-31", value: 22.67 },
    ]);

    addTuples("volume", [
      { time: "2018-12-22", value: 50000, color: "rgba(0, 150, 136, 0.8)" },
      { time: "2018-12-23", value: 10000, color: "rgba(255,82,82, 0.8)" },
      { time: "2018-12-24", value: 2000, color: "rgba(255,82,82, 0.8)" },
      { time: "2018-12-25", value: 100000, color: "rgba(255,82,82, 0.8)" },
      { time: "2018-12-26", value: 200000, color: "rgba(0, 150, 136, 0.8)" },
      { time: "2018-12-27", value: 800000, color: "rgba(0, 150, 136, 0.8)" },
      { time: "2018-12-28", value: 40000, color: "rgba(0, 150, 136, 0.8)" },
      { time: "2018-12-29", value: 800000, color: "rgba(0, 150, 136, 0.8)" },
      { time: "2018-12-30", value: 70000, color: "rgba(255,82,82, 0.8)" },
      { time: "2018-12-31", value: 10000, color: "rgba(255,82,82, 0.8)" },
    ]);
  }, []);

  useCreateGraph(
    mainGraphRef,
    indicatorGraphsRefs,
    graphDataSeries,
    indicatorsTransform,
    graphSeriesType,
    graphLightMode,
  );

  /*     const updateChart = () => {
        if (areaSeriesRef.current && graphDataSeriesRef.current) {
            areaSeriesRef.current.update({ time: '2018-12-31', value: 25 });
            graphDataSeriesRef.current.update({ time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 112 });
        }
    }; */

  const changeData = () => {
    setGraphDataSeries([
      {
        time: "2018-12-22",
        open: 80.16,
        high: 82.84,
        low: 36.16,
        close: 45.72,
      },
      { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
      {
        time: "2018-12-24",
        open: 60.71,
        high: 60.71,
        low: 53.39,
        close: 59.29,
      },
      { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
      {
        time: "2018-12-26",
        open: 67.71,
        high: 105.85,
        low: 66.67,
        close: 91.04,
      },
      { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
      {
        time: "2018-12-28",
        open: 111.51,
        high: 142.83,
        low: 103.34,
        close: 131.25,
      },
      {
        time: "2018-12-29",
        open: 131.33,
        high: 151.17,
        low: 77.68,
        close: 96.43,
      },
      {
        time: "2018-12-30",
        open: 106.33,
        high: 110.2,
        low: 90.39,
        close: 98.1,
      },
      {
        time: "2018-12-31",
        open: 109.87,
        high: 114.69,
        low: 85.66,
        close: 111.26,
      },
    ]);
  };

  return (
    <div className="root-graph-container">
      <div className="buttons">
        <button onClick={() => console.log("a")}>Update Chart</button>
        <button onClick={() => setGraphSeriesType("candlestick")}>
          Candlestick View
        </button>
        <button onClick={() => setGraphSeriesType("line")}>Line View</button>
        <button onClick={() => setGraphLightMode("light")}>Light Theme</button>
        <button onClick={() => setGraphLightMode("dark")}>Dark Theme</button>
        <button onClick={() => changeData()}></button>
      </div>
      <div ref={mainGraphRef} className="graph-container"></div>
      {indicatorsTransform.map((indicator) => (
        <div
          key={indicator.name}
          ref={(ref) => (indicatorGraphsRefs.current[indicator.name] = ref)}
          className="indicator-container"
        ></div>
      ))}
    </div>
  );
};
