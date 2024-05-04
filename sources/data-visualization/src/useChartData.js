import React, { useState, useEffect } from "react";

// custom hook for data fetching and formatting
export const useChartData = () => {
  const fetchDataAndFormat = async () => {
    const response = await fetch(
      "https://demo-live-data.highcharts.com/aapl-ohlcv.json",
    );
    const data = await response.json();
    const ohlc = data.map((item) => [
      item[0],
      item[1],
      item[2],
      item[3],
      item[4],
    ]); // date, open, high, low, close
    const volume = data.map((item) => [item[0], item[5]]); // date, volume

    return { ohlc, volume };
  };

  const [data, setData] = useState({ ohlc: [], volume: [] });

  useEffect(() => {
    fetchDataAndFormat().then(setData);
  }, []);

  return data;
};
