import React from 'react';
import TabsLayout from '@/pages/EquitiesPage';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DividendsSubpage = () => {
  // Example dividend data
  const dividendData = [
    { name: 'Dividend Payout Ratio', value: '0.50' },
    { name: 'Dividend per Share (DPS)', value: '$1.20' },
    { name: 'Dividend Declaration Date', value: '2023-01-15' },
    { name: 'Ex-Dividend Date', value: '2023-02-01' },
    { name: 'Last Split Factor', value: '2:1' },
    { name: 'Forward Annual Dividend Rate', value: '$2.40' },
    { name: 'Forward Annual Dividend Yield', value: '4.5%' },
  ];

  return (
    <TabsLayout>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2">Dividends Page</Typography>
        
        {/* Displaying dividend information in a table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Parameter</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dividendData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </TabsLayout>
  );
};

export default DividendsSubpage;
