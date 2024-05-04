import { Box } from "@mui/material";
import TabsLayout from "@/pages/EquitiesPage";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getTechnical } from "@/actions/stockActions";
import { useParams } from "react-router-dom";

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

const GaugeChart1 = () => {
  return (
    <div
      style={{
        height: 200,
        width: "100%",
        marginBottom: "20px",
        border: "1px solid #ccc",
      }}
    >
      {/* Placeholder for Gauge Chart 1 */}
      <h3 style={{ textAlign: "center" }}>Gauge Chart 1</h3>
      <p style={{ textAlign: "center" }}>Placeholder for Gauge Chart 1</p>
    </div>
  );
};

const GaugeChart2 = () => {
  return (
    <div
      style={{
        height: 200,
        width: "100%",
        marginBottom: "20px",
        border: "1px solid #ccc",
      }}
    >
      {/* Placeholder for Gauge Chart 2 */}
      <h3 style={{ textAlign: "center" }}>Gauge Chart 2</h3>
      <p style={{ textAlign: "center" }}>Placeholder for Gauge Chart 2</p>
    </div>
  );
};

const EquitiesTechnicalsPage = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const { symbol } = useParams(); // Access the symbol parameter from the route

  const technicalAction = async () => {
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
  };
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
    technicalAction();
  }, [symbol]); // Run the effect when the symbol parameter changes

  return (
    <TabsLayout>
      <Box sx={{ textAlign: "center" }}>
        <h2>Technicals Page {symbol}</h2>;
      </Box>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <GaugeChart1 />
          <GaugeChart2 />
        </div>
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
    </TabsLayout>
  );
};

export default EquitiesTechnicalsPage;
