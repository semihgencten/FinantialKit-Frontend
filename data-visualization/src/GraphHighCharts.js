import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import "./GraphHighCharts.css";

export const GraphHighCharts = ({ graphLightMode, volumeIndicatorStatus }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://demo-live-data.highcharts.com/aapl-ohlcv.json').then(response => response.json());

      const ohlcData = [],
          volumeData = [],
          dataLength = data.length,
          groupingUnits = [['week', [1]], ['month', [1, 2, 3, 4, 6]]];

      for (let i = 0; i < dataLength; i += 1) {
        ohlcData.push([data[i][0], data[i][1], data[i][2], data[i][3], data[i][4]]); // date, open, high, low, close
        volumeData.push([data[i][0], data[i][5]]); // date, volume
      }

      console.log("Candlestick: ", ohlcData);

      console.log("Volume Bar: ", volumeData);
      
      // initialize chart only if it doesn't exist
      if (!chartRef.current) {
        chartRef.current = Highcharts.stockChart('stockGraph', {
            rangeSelector: {
                selected: 4
            },
    
            title: {
                text: 'Apple Inc. (AAPL)'
            },
    
            yAxis: [{
                gridLineWidth: graphLightMode === "light" ? 1 : 0.5,
                labels: {
                    align: 'right',
                    x: -3,
                },
                title: {
                    text: 'Candlestick'
                },
                height: '70%',
                lineWidth: 1,
                resize: {
                    enabled: true
                }
            }, {
                gridLineWidth: graphLightMode === "light" ? 1 : 0.5,
                labels: {
                    align: 'right',
                    x: -3,
                },
                title: {
                    text: 'Volume'
                },
                top: '75%',
                height: '25%',
                offset: 0,
                lineWidth: 1
            }],
    
            tooltip: {
                split: true
            },
    
            series: [{
                type: 'candlestick',
                name: 'AAPL',
                data: ohlcData,
                dataGrouping: {
                    units: groupingUnits
                }
            }, {
                type: 'column',
                name: 'volume',
                data: volumeData,
                yAxis: 1,
                dataGrouping: {
                    units: groupingUnits
                }
            }],

            chart: {
            backgroundColor: graphLightMode === "light" ? "#FFFFFF" : "#000000",
            },

            plotOptions: {
                candlestick: {
                    color: graphLightMode === 'light' ? '#ef5350' : '#F44336',
                    upColor: graphLightMode === 'light' ? '#26a69a' : '#4CAF50',
                    lineColor: graphLightMode === 'light' ? '#ef5350' : '#F44336',
                    upLineColor: graphLightMode === 'light' ? '#26a69a' : '#4CAF50',
                    pointPadding: 0.1,
                    groupPadding: 0.1,
                },
                column: {
                    /*color: graphLightMode === 'light' ? '#26a69a' : '#4CAF50',*/
                    color: graphLightMode === 'light' ? '#89CFF0' : '#89CFF0',
                    negativeColor: graphLightMode === 'light' ? '#ef5350' : '#F44336',
                    pointPadding: 0.02,
                    groupPadding: 0.02,
                    borderColor: graphLightMode === "light" ? "transparent" : "#000000",
                    borderWidth: 1, 
                    borderRadius: 0,
                }
            }
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update({
        chart: {
          backgroundColor: graphLightMode === "light" ? "#FFFFFF" : "#000000",
        },
        plotOptions: {
          candlestick: {
            color: graphLightMode === 'light' ? '#ef5350' : '#F44336',
            upColor: graphLightMode === 'light' ? '#26a69a' : '#4CAF50',
            lineColor: graphLightMode === 'light' ? '#ef5350' : '#F44336',
            upLineColor: graphLightMode === 'light' ? '#26a69a' : '#4CAF50',
          },
          column: {
            borderColor: graphLightMode === "light" ? "transparent" : "#000000",
            borderWidth: 1, 
            borderRadius: 0,
            /*color: graphLightMode === 'light' ? '#26a69a' : '#4CAF50',*/
            color: graphLightMode === 'light' ? '#89CFF0' : '#5F9EA0',
            negativeColor: graphLightMode === 'light' ? '#ef5350' : '#F44336',
          }
        },
        yAxis: [{
            title: {
              style: {
                color: graphLightMode === "light" ? "#666666" : "#FFFFFF", 
              }
            },
            labels: {
                style: {
                    color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
                }
            },
            lineColor: graphLightMode === "light" ? "#333333" : "#FFFFFF",
            gridLineWidth: graphLightMode === "light" ? 1 : 0.5, 
        }, {
            title: {
              style: {
                color: graphLightMode === "light" ? "#666666" : "#FFFFFF", 
              }
            },
            labels: {
                style: {
                    color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
                }
            },
            lineColor: graphLightMode === "light" ? "#333333" : "#FFFFFF",
            gridLineWidth: graphLightMode === "light" ? 1 : 0.5, 
        }],
        xAxis: {
          labels: {
            style: {
              color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
            }
          }
        },
        title: {
          style: {
            color: graphLightMode === "light" ? "#000000" : "#FFFFFF",
          }
        },
        navigator: {
            maskFill: graphLightMode === "light" ? 'rgba(102, 122, 255, 0.3)' : 'rgba(255, 255, 255, 0.3)',
          },
      });

      const labels = chartRef.current.renderer.box.getElementsByClassName('highcharts-label');
      for (let label of labels) {
        const textElement = label.querySelector('text');
        if (textElement) {
          textElement.style.fill = graphLightMode === "light" ? "#000000" : "#FFFFFF";
        }
      }
    }
  }, [graphLightMode]);

  return <div id="stockGraph"></div>;
};