

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Grid, Modal } from '@mui/material';
import { AddCircleOutline as AddIcon, DeleteOutline as DeleteIcon } from '@mui/icons-material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useNavigate } from 'react-router-dom';

const PortfolioPage = () => {
  const navigate = useNavigate();
  // Dummy list of portfolios
  const [portfolios, setPortfolios] = useState([
    {
      name: 'Tech Stocks',
      description: 'A portfolio consisting of various technology stocks.',
      assets: ['AAPL', 'MSFT', 'GOOGL'],
      dailyReturn: '-0.01%',
      risk: '15.61'
    },
    {
      name: 'Global Bonds',
      description: 'A diversified portfolio of global bond funds.',
      assets: ['BND', 'IEF', 'AGG'],
      dailyReturn: '0.05%',
      risk: '8.92'
    }
  ]);

  // State for managing new portfolio input fields
  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [newPortfolioDescription, setNewPortfolioDescription] = useState('');
  const [isCreatePortfolioModalOpen, setIsCreatePortfolioModalOpen] = useState(false);

  // Function to handle opening the create portfolio modal
  const openCreatePortfolioModal = () => {
    setIsCreatePortfolioModalOpen(true);
  };

  const handlePortfolioClick = (portfolioId) => {
    navigate(`/my-portfolio/detail/${portfolioId}`);
  };

  // Function to handle closing the create portfolio modal
  const closeCreatePortfolioModal = () => {
    setIsCreatePortfolioModalOpen(false);
  };

  // Function to handle creating a new portfolio
  const handleCreatePortfolio = () => {
    if (newPortfolioName.trim() !== '') {
      const newPortfolio = {
        name: newPortfolioName,
        description: newPortfolioDescription,
        assets: [],
        dailyReturn: null,
        risk: null,
        assetPrices: {}
      };
      setPortfolios([...portfolios, newPortfolio]);
      // Reset input fields after creating portfolio
      setNewPortfolioName('');
      setNewPortfolioDescription('');
      // Close the create portfolio modal
      closeCreatePortfolioModal();
    } else {
      alert('Please enter a name for the portfolio.');
    }
  };

  // Function to handle removing a portfolio
  const handleRemovePortfolio = (index) => {
    const updatedPortfolios = [...portfolios];
    updatedPortfolios.splice(index, 1);
    setPortfolios(updatedPortfolios);
  };

  return (
    <Box sx={{ textAlign: "center" }}>

      {/* Create portfolio modal */}
      <Modal
          open={isCreatePortfolioModalOpen}
          onClose={closeCreatePortfolioModal}
          aria-labelledby="create-portfolio-modal-title"
          aria-describedby="create-portfolio-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 10, // Adjust border radius
              boxShadow: 24,
              p: 4
            }}
          >
            <Typography id="create-portfolio-modal-title" variant="h6" component="h2">
              Create New Portfolio
            </Typography>
            <TextField
              label="Portfolio Name"
              value={newPortfolioName}
              onChange={(e) => setNewPortfolioName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Portfolio Description"
              value={newPortfolioDescription}
              onChange={(e) => setNewPortfolioDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}> {/* Centering button and adding space */}
              <Button variant="contained" onClick={handleCreatePortfolio} sx={{ bgcolor: 'black', color: 'white' }}>
                Create Portfolio
              </Button>
            </Box>
          </Box>
        </Modal>


      {/* List of existing portfolios */}
      <Box mt={4}>
        <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h4" >Your Portfolios</Typography>
        <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained"  size="small" onClick={openCreatePortfolioModal} sx={{ bgcolor: 'black', color: 'white' }}>Create New Portfolio</Button>
        </Grid>
        <List>
          {portfolios.map((portfolio, index) => (
            <Box key={index}>
              <ListItem key={index} button onClick={() => handlePortfolioClick(index + 1)}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item xs={8}>
                    <ListItemText
                      primary={portfolio.name}
                      secondary={portfolio.description}
                    />
                  </Grid>
                  <Grid item>
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemovePortfolio(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </Grid>
                </Grid>
              <ListItem>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ListItemText
                      primary="Daily Return"
                      secondary={portfolio.dailyReturn !== null ? `${portfolio.dailyReturn}` : 'N/A'}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ListItemText
                      primary="Risk"
                      secondary={portfolio.risk !== null ? portfolio.risk : 'N/A'}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Assets"
                  secondary={
                    <List>
                      {portfolio.assets.map((asset, assetIndex) => (
                        <ListItem key={assetIndex}>
                          <ListItemText
                            primary={asset}
                          />
                        </ListItem>
                      ))}
                    </List>
                  }
                />
              </ListItem>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default PortfolioPage;