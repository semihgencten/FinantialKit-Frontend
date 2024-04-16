import { Box } from "@mui/material";
import TabsLayout from "@/pages/EquitiesPage";
import { DataGrid } from "@mui/x-data-grid";

const maColumns = [
  { field: "name", headerName: "Moving Average", width: 125 },
  { field: "simple", headerName: "Simple", width: 110 },
  { field: "simpleAction", headerName: "Simple Action", width: 125 },
  { field: "exponential", headerName: "Exponential", width: 110 },
  { field: "exponentialAction", headerName: "Exponential Action", width: 150 },
];

const maRows = [
  {
    id: 1,
    name: "MA(5)",
    simple: 145,
    simpleAction: "Buy",
    exponential: 148,
    exponentialAction: "Strong Buy",
  },
  {
    id: 2,
    name: "MA(10)",
    simple: 150,
    simpleAction: "Buy",
    exponential: 152,
    exponentialAction: "Strong Buy",
  },
  {
    id: 3,
    name: "MA(20)",
    simple: 155,
    simpleAction: "Buy",
    exponential: 158,
    exponentialAction: "Strong Buy",
  },
  {
    id: 4,
    name: "MA(50)",
    simple: 160,
    simpleAction: "Buy",
    exponential: 165,
    exponentialAction: "Strong Buy",
  },
  {
    id: 5,
    name: "MA(100)",
    simple: 170,
    simpleAction: "Buy",
    exponential: 175,
    exponentialAction: "Strong Buy",
  },
  {
    id: 6,
    name: "MA(200)",
    simple: 180,
    simpleAction: "Buy",
    exponential: 185,
    exponentialAction: "Strong Buy",
  },
];

const osColumns = [
  { field: "name", headerName: "Oscillator", width: 150 },
  { field: "value", headerName: "Value", width: 120 },
  { field: "action", headerName: "Action", width: 150 },
];

const osRows = [
  { id: 1, name: "RSI", value: 70, action: "Sell" },
  { id: 2, name: "Stochastic Oscillator", value: 80, action: "Strong Buy" },
  { id: 3, name: "MACD", value: -0.002, action: "Sell" },
  { id: 4, name: "Williams %R", value: -30, action: "Buy" },
  { id: 5, name: "CCI", value: 100, action: "Strong Buy" },
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

const pivotRows = [
  {
    id: 1,
    method: "Classic",
    S1: 148,
    S2: 146,
    S3: 145,
    "Pivot Points": 144,
    R1: 143,
    R2: 143,
    R3: 141,
  },
  {
    id: 2,
    method: "Fibonacci",
    S1: 155,
    S2: 152,
    S3: 150,
    "Pivot Points": 148,
    R1: 146,
    R2: 144,
    R3: 141,
  },
  {
    id: 3,
    method: "Camarilla",
    S1: 152,
    S2: 150,
    S3: 148,
    "Pivot Points": 146,
    R1: 144,
    R2: 142,
    R3: 140,
  },
  {
    id: 4,
    method: "Woodies",
    S1: 150,
    S2: 148,
    S3: 146,
    "Pivot Points": 144,
    R1: 142,
    R2: 140,
    R3: 138,
  },
  {
    id: 5,
    method: "DeMarks",
    S1: 147,
    S2: 145,
    S3: 143,
    "Pivot Points": 141,
    R1: 139,
    R2: 137,
    R3: 135,
  },
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
  return (
    <TabsLayout>
      <Box sx={{ textAlign: "center" }}>
        <h2>Technicals Page</h2>;
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
              rows={maRows}
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
              rows={osRows}
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
            rows={pivotRows}
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
