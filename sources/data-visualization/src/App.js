import "./App.css";
import { Graph } from "./Graph";
import { GraphHighCharts } from "./GraphHighCharts";
import { useState } from "react";
import { Button } from "primereact/button";

function App() {
  const [graphLightMode, setGraphLightMode] = useState("light");
  const [selectedIndicatorsList, setSelectedIndicatorsList] = useState([]);

  const toggleColorMode = () => {
    if (graphLightMode === "light") {
      setGraphLightMode("dark");
    } else {
      setGraphLightMode("light");
    }
  };

  const addRSIIndicator = () => {
    setSelectedIndicatorsList((prevList) => {
      // Check if "rsi" is already included to avoid duplicates
      if (!prevList.includes("rsi")) {
        return [...prevList, "rsi"];
      }
      return prevList;
    });
  };

  const removeRSIIndicator = () => {
    setSelectedIndicatorsList((prevList) =>
      prevList.filter((item) => item !== "rsi"),
    );
  };

  const addVolumeIndicator = () => {
    setSelectedIndicatorsList((prevList) => {
      // Check if "rsi" is already included to avoid duplicates
      if (!prevList.includes("volume")) {
        return [...prevList, "volume"];
      }
      return prevList;
    });
  };

  const removeVolumeIndicator = () => {
    setSelectedIndicatorsList((prevList) =>
      prevList.filter((item) => item !== "volume"),
    );
  };

  return (
    <div className="main">
      {/* <Graph /> */}
      <div className="buttons">
        <Button
          className="optionButton"
          label="Toggle Color Mode"
          onClick={() => toggleColorMode()}
        />
        <Button
          className="optionButton"
          label="Add Volume Indicator"
          onClick={() => addVolumeIndicator()}
        />
        <Button
          className="optionButton"
          label="Remove Volume Indicator"
          onClick={() => removeVolumeIndicator()}
        />
        <Button
          className="optionButton"
          label="Add RSI Indicator"
          onClick={() => addRSIIndicator()}
        />
        <Button
          className="optionButton"
          label="Remove RSI Indicator"
          onClick={() => removeRSIIndicator()}
        />
      </div>
      <GraphHighCharts
        graphLightMode={graphLightMode}
        selectedIndicatorsList={selectedIndicatorsList}
      />
    </div>
  );
}

export default App;
