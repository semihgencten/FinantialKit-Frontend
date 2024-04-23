import React from 'react';
import TabsLayout1 from '@/pages/FinancialsPage/EquitiesPage';
import FinancialsTabsLayout from '@/pages/EquitiesFinancialsPage';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from '@mui/material';

const StatementsSubpage = () => {
  // Example data for Income Statements
  const incomeStatementData = [
    { name: 'Revenue', value: '$1,000,000' },
    { name: 'Cost of Goods Sold', value: '$400,000' },
    { name: 'Gross Profit', value: '$600,000' },
    { name: 'Operating Expenses', value: '$200,000' },
    { name: 'Research & Development', value: '$50,000' },
    { name: 'Marketing & Sales', value: '$100,000' },
    { name: 'General & Administrative', value: '$50,000' },
    { name: 'Operating Income', value: '$400,000' },
    { name: 'Interest Expense', value: '$50,000' },
    { name: 'Taxes', value: '$100,000' },
    { name: 'Net Income', value: '$250,000' },
  ];

  // Example data for Balance Sheet
  const balanceSheetData = [
    { name: 'Assets', value: '$2,000,000' },
    { name: 'Current Assets', value: '$1,000,000' },
    { name: 'Cash & Equivalents', value: '$500,000' },
    { name: 'Accounts Receivable', value: '$200,000' },
    { name: 'Inventory', value: '$300,000' },
    { name: 'Long-term Assets', value: '$1,000,000' },
    { name: 'Property, Plant & Equipment', value: '$800,000' },
    { name: 'Intangible Assets', value: '$200,000' },
    { name: 'Liabilities', value: '$1,000,000' },
    { name: 'Current Liabilities', value: '$500,000' },
    { name: 'Accounts Payable', value: '$200,000' },
    { name: 'Short-term Debt', value: '$300,000' },
    { name: 'Long-term Liabilities', value: '$500,000' },
    { name: 'Equity', value: '$1,000,000' },
  ];

  // Example data for Cash Flow statement
  const cashFlowData = [
    { name: 'Operating Activities', value: '$400,000' },
    { name: 'Net Income', value: '$250,000' },
    { name: 'Depreciation & Amortization', value: '$50,000' },
    { name: 'Changes in Working Capital', value: '$100,000' },
    { name: 'Investing Activities', value: '-$200,000' },
    { name: 'Capital Expenditures', value: '-$150,000' },
    { name: 'Acquisitions', value: '-$50,000' },
    { name: 'Financing Activities', value: '-$100,000' },
    { name: 'Debt Issuance', value: '-$50,000' },
    { name: 'Dividends Paid', value: '-$50,000' },
    { name: 'Net Cash Flow', value: '$100,000' },
  ];

  return (
    <TabsLayout1>
      <FinancialsTabsLayout>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2">Statements Page</Typography>

          
          <Box display="flex" justifyContent="space-between" mt={2}>
           
            <Box>
              <Typography variant="h4">Income Statements</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Parameter</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {incomeStatementData.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

           
            <Divider orientation="vertical" flexItem />

          
            <Box>
              <Typography variant="h4">Balance Sheet</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Parameter</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {balanceSheetData.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          
          <Box mt={2}>
            <Typography variant="h4">Cash Flow</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Parameter</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cashFlowData.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </FinancialsTabsLayout>
      
    </TabsLayout1>
  );
};

export default StatementsSubpage;