import { Box } from "@mui/material";
import TabsLayout from "@/pages/EquitiesPage";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getTechnical } from "@/actions/stockActions";
import { useParams } from "react-router-dom";
import { Gauge } from "@/components/Gauge";
import axios from "axios";

const maColumns = [
  { field: "name", headerName: "Moving Average", width: 125 },
  { field: "simple", headerName: "Simple", width: 110 },
  { field: "simpleAction", headerName: "Simple Action", width: 125 },
  { field: "exponential", headerName: "Exponential", width: 110 },
  { field: "exponentialAction", headerName: "Exponential Action", width: 150 },
];

const osColumns = [
  { field: "name", headerName: "Oscillator", width: 150 },
  { field: "value", headerName: "Value", width: 120 },
  { field: "action", headerName: "Action", width: 150 },
];

const pivotColumns = [
  { field: "method", headerName: "Method", width: 120 },
  { field: "S1", headerName: "S1", width: 90 },
  { field: "S2", headerName: "S2", width: 90 },
  { field: "S3", headerName: "S3", width: 90 },
  { field: "Pivot Points", headerName: "Pivot Points", width: 130 },
  { field: "R1", headerName: "R1", width: 90 },
  { field: "R2", headerName: "R2", width: 90 },
  { field: "R3", headerName: "R3", width: 90 },
];

const EquitiesTechnicalsPage = () => {
  const [data, setData] = useState(null);
  const [gaugeData, setGaugeData] = useState([]);

  const dispatch = useDispatch();
  const { symbol } = useParams();

  const fetchTechnicals = async () => {
    try {
      const response = await axios.get(
        `http://13.50.126.209:8000/api/stocks/${symbol}/technicals`,
      );
      const technicalsData = response.data;
      if (technicalsData) {
        // Apply addIds to each category of data before setting state
        const dataWithIds = {
          movingAverages: addIds(technicalsData.movingAverages),
          oscillators: addIds(technicalsData.oscillators),
          pivots: addIds(technicalsData.pivots),
        };
        setData(dataWithIds);
        setGaugeData(technicalsData.gaugeCharts);
        console.log(technicalsData.gaugeCharts);
      } else {
        console.error("No data received from the API");
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };
  /*   const technicalAction = async () => {
    const action = await dispatch(getTechnical(symbol));

    if (!action.error) {
      const fetchedData = action.payload;

      const dataWithIds = {
        movingAverages: addIds(fetchedData.movingAverages),
        oscillators: addIds(fetchedData.oscillators),
        pivots: addIds(fetchedData.pivots),
      };

      setData(dataWithIds);
    } else {
      console.error("Error fetching technical data:", action.error);
    }
  }; */
  const addIds = (rows) => {
    if (Array.isArray(rows)) {
      return rows.map((row, index) => ({
        id: index, // Generate a unique id using the row index
        ...row,
      }));
    } else {
      console.error("Invalid data format. Expected an array.");
      return [];
    }
  };
  useEffect(() => {
    fetchTechnicals();

    //technicalAction();
  }, [symbol]); // Run the effect when the symbol parameter changes

  return (
    <TabsLayout>
      <Box sx={{ textAlign: "center" }}>
        <h2>Technicals Page {symbol}</h2>
      </Box>
      <div style={{ paddingBottom: "64px" }}>
        <div
          style={{
            textAlign: "-webkit-center",
            display: "flex",
            flexDirection: "row",
            gap: "64px",
            placeContent: "center",
            paddingTop: "32px",
            paddingBottom: "32px",
          }}
        >
          {gaugeData.action && gaugeData.action.length > 0 && (
            <Gauge
              id="gauge-0"
              action={gaugeData.action}
              confidence={gaugeData.confidence}
            />
          )}
          {gaugeData.action && gaugeData.action.length > 0 && (
            <Gauge
              id="gauge-1"
              action={gaugeData.action}
              confidence={gaugeData.confidence}
            />
          )}
        </div>
        {/* <Gauge idd="gauge-1" action={gaugeData[1]?.action} confidence={gaugeData[1]?.confidence} /> */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ height: 450, width: "48%" }}>
            <h3>Moving Averages</h3>
            <DataGrid
              rows={data?.movingAverages || []}
              columns={maColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection={false}
            />
          </div>
          <div style={{ height: 400, width: "48%" }}>
            <h3>Oscillators</h3>
            <DataGrid
              rows={data?.oscillators || []}
              columns={osColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection={false}
            />
          </div>
        </div>
        <div style={{ height: 400, width: "60%", marginTop: "100px" }}>
          <h3>Pivots</h3>
          <DataGrid
            rows={data?.pivots || []}
            columns={pivotColumns}
            pageSizeOptions={10}
            checkboxSelection={false}
          />
        </div>
      </div>
    </TabsLayout>
  );
};

export default EquitiesTechnicalsPage;
