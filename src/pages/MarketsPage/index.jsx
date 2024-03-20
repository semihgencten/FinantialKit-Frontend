import { Box } from '@mui/material'
// import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';


const columns = [
    { field: 'symbol', headerName: 'Symbol', width: 70 },
    { field: 'companyName', headerName: 'Name', width: 250, renderCell: (params) => <Link to="/equities/overview">{params.value}</Link> },
    { field: 'lastprice', headerName: 'Last', width: 130 },
    { field: 'changeAmount', headerName: 'Change', width: 130 },
    { field: 'changePercentage', headerName: 'Change (%)', width: 130 },
    { field: 'volume', headerName: 'Volume', width: 130 },

];

const rows = [
    { id: 1, companyName: 'Nvidia', lastprice: 100, changeAmount: -20, changePercentage: "-0.71%", volume: 15600 },
    { id: 2, companyName: 'Apple Inc.', lastprice: 150, changeAmount: 5, changePercentage: "+0.03%", volume: 25000 },
    { id: 3, companyName: 'Amazon.com Inc.', lastprice: 3200, changeAmount: -15, changePercentage: "-0.47%", volume: 18000 },
    { id: 4, companyName: 'Tesla, Inc.', lastprice: 800, changeAmount: 30, changePercentage: "+0.15%", volume: 35000 },
    { id: 5, companyName: 'Microsoft Corporation', lastprice: 250, changeAmount: 10, changePercentage: "+0.04%", volume: 20000 },
    { id: 6, companyName: 'Alphabet Inc. (Google)', lastprice: 2000, changeAmount: -25, changePercentage: "-1.25%", volume: 22000 },
    { id: 7, companyName: 'Facebook, Inc.', lastprice: 300, changeAmount: -7, changePercentage: "-0.36%", volume: 18000 },
    { id: 8, companyName: 'Alibaba Group Holding Limited', lastprice: 200, changeAmount: 8, changePercentage: "+0.60%", volume: 28000 },
    { id: 9, companyName: 'Johnson & Johnson', lastprice: 170, changeAmount: -3, changePercentage: "-0.02%", volume: 15000 },
    { id: 10, companyName: 'Visa Inc.', lastprice: 220, changeAmount: 12, changePercentage: "+0.55%", volume: 19000 },
];
const MarketsPage = () => {
  return (
    <div>
        <Box sx={{ textAlign: "center" }}>
            <h2>Markets Page</h2>;
        </Box>
        <Box sx={{ textAlign: "left" }}>
            <h2>Nasdaq 100 Stocks</h2>;
        </Box>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
    </div>
  );
};

export default MarketsPage;