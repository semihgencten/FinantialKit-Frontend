import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
import { Box } from "@mui/material";

export const Gauge = ({ id, action, confidence }) => {
  const confidenceValue = parseFloat(confidence);

  const setupGauge = () => {
    Highcharts.chart(id, {
      chart: {
        type: "gauge",
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: "90%",
      },
      title: {
        text: action,
      },
      pane: {
        startAngle: -90,
        endAngle: 89.9,
        background: null,
        center: ["50%", "75%"],
        size: "100%",
      },
      yAxis: {
        min: 0,
        max: 100,
        tickPixelInterval: 20,
        tickPosition: "inside",
        labels: {
          distance: 20,
          style: {
            fontSize: "14px",
          },
        },
        lineWidth: 0,
        plotBands: [
          {
            from: 0,
            to: 40,
            color: "#DF5353", // red
          },
          {
            from: 40,
            to: 70,
            color: "#DDDF0D", // yellow
          },
          {
            from: 70,
            to: 100,
            color: "#55BF3B", // green
          },
        ],
      },
      series: [
        {
          name: "Confidence",
          data: [confidenceValue],
          dial: {
            radius: "80%",
            backgroundColor: "gray",
            baseWidth: 12,
            baseLength: "0%",
            rearLength: "0%",
          },
          pivot: {
            backgroundColor: "gray",
            radius: 6,
          },
        },
      ],
    });
  };

  useEffect(() => {
    HighchartsMore(Highcharts);
    SolidGauge(Highcharts);
    setupGauge();
  }, []);

  return <Box id={id} style={{ height: "400px", width: "500px" }}></Box>;
};
