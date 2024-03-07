import './App.css';
import { Graph } from './Graph';
import { GraphHighCharts } from './GraphHighCharts';
import { useState } from 'react';
import { Button } from 'primereact/button';

function App() {
  const [graphLightMode, setGraphLightMode] = useState("light");
  const [volumeIndicatorStatus, setVolumeIndicatorStatus] = useState("open");

  const toggleColorMode = () => {
    if(graphLightMode === "light") {
      setGraphLightMode("dark");
    }
    else {
      setGraphLightMode("light");
    }
  }

  const toggleVolumeIndicator = () => {
    if (volumeIndicatorStatus === "open") {
        setVolumeIndicatorStatus("closed");
    } 
    else {
        setVolumeIndicatorStatus("open");
    }
  };

  return (
    <div className="main">
      {/* <Graph /> */}
      <div className='buttons'>
        <Button className="optionButton" label="Toggle Color Mode" onClick={() => toggleColorMode()} />
        <Button className="optionButton" label="Toggle Volume Indicator" onClick={() => toggleVolumeIndicator()} />
      </div>
      <GraphHighCharts graphLightMode={graphLightMode} volumeIndicatorStatus={volumeIndicatorStatus} />
    </div>
  );
}

export default App;
