import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';


const PortfolioDetailPage = () => {
  const { portfolioId } = useParams();

  // Dummy data for portfolio assets
  const portfolioData = {
    '1': {
      name: 'Tech Stocks',
      assets: [
        { ticker: 'AAPL', lastPrice: '175.25', change: '+2.75', changePercent: '1.59%', currency: 'USD', marketTime: '2023-04-15 16:00:00', volume: '98,765,432', shares: '16,789,000', avgVol3m: '50,678,910', dayRange: '172.00 - 176.80', weekRange: '130.00 - 180.00', marketCap: '2.4T' },
        { ticker: 'MSFT', lastPrice: '300.40', change: '+1.80', changePercent: '0.60%', currency: 'USD', marketTime: '2023-04-15 16:00:00', volume: '12,345,678', shares: '7,609,800', avgVol3m: '19,876,543', dayRange: '295.00 - 302.50', weekRange: '250.00 - 310.00', marketCap: '1.8T' },
      ]
    },
    '2': {
      name: 'Global Bonds',
      assets: [
        { ticker: 'BND', lastPrice: '82.55', change: '-0.15', changePercent: '-0.18%', currency: 'USD', marketTime: '2023-04-15 16:00:00', volume: '500,000', shares: '1,200,000', avgVol3m: '450,000', dayRange: '81.50 - 83.00', weekRange: '80.00 - 85.00', marketCap: '550M' },
        { ticker: 'IEF', lastPrice: '110.25', change: '+0.20', changePercent: '0.18%', currency: 'USD', marketTime: '2023-04-15 16:00:00', volume: '600,000', shares: '800,000', avgVol3m: '300,000', dayRange: '109.00 - 111.00', weekRange: '100.00 - 115.00', marketCap: '200M' },
      ]
    }
  };

  const portfolio = portfolioData[portfolioId] || { name: "Unknown Portfolio", assets: [] };

  return (
    <Paper sx={{ p: 2, margin: 'auto',flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Portfolio Details: {portfolio.name}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell align="right">Last Price</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell align="right">Change %</TableCell>
              <TableCell align="right">Currency</TableCell>
              <TableCell align="right">Market Time</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Shares</TableCell>
              <TableCell align="right">Avg Vol (3m)</TableCell>
              <TableCell align="right">Day Range</TableCell>
              <TableCell align="right">52-Wk Range</TableCell>
              <TableCell align="right">Market Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolio.assets.map((asset, index) => (
              <TableRow
                key={index}
              >
                <TableCell component="th" scope="row">{asset.ticker}</TableCell>
                <TableCell align="right">{asset.lastPrice}</TableCell>
                <TableCell align="right">{asset.change}</TableCell>
                <TableCell align="right">{asset.changePercent}</TableCell>
                <TableCell align="right">{asset.currency}</TableCell>
                <TableCell align="right">{asset.marketTime}</TableCell>
                <TableCell align="right">{asset.volume}</TableCell>
                <TableCell align="right">{asset.shares}</TableCell>
                <TableCell align="right">{asset.avgVol3m}</TableCell>
                <TableCell align="right">{asset.dayRange}</TableCell>
                <TableCell align="right">{asset.weekRange}</TableCell>
                <TableCell align="right">{asset.marketCap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained"  size="small" sx={{ bgcolor: 'black', color: 'white', margin: '12px' }}>Add Asset</Button>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PortfolioDetailPage;

