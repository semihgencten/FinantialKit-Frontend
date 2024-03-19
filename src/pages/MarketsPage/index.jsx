import { Box } from '@mui/material'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'stockName', headerName: 'Stock Name', width: 130, renderCell: (params) => <Link to="/equities/overview">{params.value}</Link> },
    { field: 'price', headerName: 'Price', width: 130 },
];

const rows = [
    { id: 1, stockName: 'Nvidia', price: 100 },
];
const MarketsPage = () => {
  return (
    <div>
        <Box sx={{ textAlign: "center" }}>
        <h2>Markets Page</h2>;
        </Box>
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
            pagination: {
            paginationModel: { page: 0, pageSize: 5 },
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
