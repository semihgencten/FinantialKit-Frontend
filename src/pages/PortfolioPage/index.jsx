import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Grid,
  Modal,
  Paper,
} from "@mui/material";
import {
  AddCircleOutline as AddIcon,
  DeleteOutline as DeleteIcon,
  BusinessCenter as PortfolioIcon,
} from "@mui/icons-material";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  getAllPortfolios,
  createPortfolio,
  deletePortfolio,
} from "@/actions/portfolioActions";
import errorImage from "@/assets/images/portfolio_not_found.png";

const PortfolioPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const portfolios = useSelector((state) => state.portfolio.portfolios);
  const portfolioStatus = useSelector((state) => state.portfolio.status);
  const portfolioError = useSelector((state) => state.portfolio.error);
  const isAuthenticated = useSelector(
    (state) => state.portfolio.isAuthenticated,
  );

  const [newPortfolioName, setNewPortfolioName] = useState("");
  const [newPortfolioDescription, setNewPortfolioDescription] = useState("");
  const [isCreatePortfolioModalOpen, setIsCreatePortfolioModalOpen] =
    useState(false);

  useEffect(() => {
    if (portfolioStatus === "idle") {
      dispatch(getAllPortfolios());
    }
  }, [portfolioStatus, dispatch]);

  const openCreatePortfolioModal = () => {
    setIsCreatePortfolioModalOpen(true);
  };

  const closeCreatePortfolioModal = () => {
    setIsCreatePortfolioModalOpen(false);
  };

  const handleCreatePortfolio = () => {
    if (newPortfolioName.trim() !== "") {
      const newPortfolio = {
        name: newPortfolioName,
        description: newPortfolioDescription,
      };
      dispatch(createPortfolio(newPortfolio));
      setNewPortfolioName("");
      setNewPortfolioDescription("");
      closeCreatePortfolioModal();
    } else {
      alert("Please enter a name for the portfolio.");
    }
  };

  const handleRemovePortfolio = (id) => {
    dispatch(deletePortfolio(id));
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4, padding: 2 }}>
        <div
          className="container"
          style={{ position: "relative", maxWidth: "500px", margin: "auto" }}
        >
          <img
            src={errorImage}
            alt="Unauthorized"
            className="img-fluid"
            style={{
              width: "100%",
              height: "auto",
              maskImage:
                "linear-gradient(to bottom, transparent, black, black, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black, black, transparent)",
            }}
          />
        </div>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          <FormattedMessage
            id="login.message"
            defaultMessage="Login to see your portfolios"
          />
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          <FormattedMessage
            id="login.explanation"
            defaultMessage="By logging in, you will be able to create and manage your portfolios, track your investments and performance. Don't miss out on the full features of our platform!"
          />
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={() => navigate("/login")}
        >
          <FormattedMessage id="login.button" defaultMessage="Login Now" />
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <Modal
        open={isCreatePortfolioModalOpen}
        onClose={closeCreatePortfolioModal}
        aria-labelledby="create-portfolio-modal-title"
        aria-describedby="create-portfolio-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 10,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="create-portfolio-modal-title"
            variant="h6"
            component="h2"
          >
            <FormattedMessage
              id="create.portfolio.title"
              defaultMessage="Create New Portfolio"
            />
          </Typography>
          <TextField
            label={
              <FormattedMessage
                id="portfolio.name.label"
                defaultMessage="Portfolio Name"
              />
            }
            value={newPortfolioName}
            onChange={(e) => setNewPortfolioName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label={
              <FormattedMessage
                id="portfolio.description.label"
                defaultMessage="Portfolio Description"
              />
            }
            value={newPortfolioDescription}
            onChange={(e) => setNewPortfolioDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button variant="contained" onClick={handleCreatePortfolio}>
              <FormattedMessage
                id="create.button"
                defaultMessage="Create Portfolio"
              />
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box mt={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h4">
            <PortfolioIcon
              sx={{ verticalAlign: "bottom", mr: 2, pr: 0.2, fontSize: "3rem" }}
            />
            <FormattedMessage
              id="your.portfolios.title"
              defaultMessage="Your Portfolios"
            />
          </Typography>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            size="small"
            onClick={openCreatePortfolioModal}
          >
            <FormattedMessage
              id="create.new.portfolio.button"
              defaultMessage="Create New Portfolio"
            />
          </Button>
        </Grid>
        <List>
          {portfolios.map((portfolio, index) => (
            <Paper
              key={portfolio.id}
              elevation={3}
              sx={{
                my: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: `0 4px 8px ${portfolio.dailyReturn && portfolio.dailyReturn.includes("-") ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 128, 0, 0.3)"}`, // Colored shadow based on daily return
                transition: "box-shadow 0.3s ease-in-out",
              }}
            >
              <ListItem
                key={index}
                button
                onClick={() => navigate(`/my-portfolio/detail/${portfolio.id}`)}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={8}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          style={{ fontSize: "1.25rem", fontWeight: "bold" }}
                        >
                          {portfolio.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          style={{
                            color: "#666",
                            fontStyle: "italic",
                            fontSize: "0.9rem",
                          }}
                        >
                          {portfolio.description}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemovePortfolio(portfolio.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </Grid>
                </Grid>
                <ListItem>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <ListItemText
                        primary={
                          <FormattedMessage
                            id="daily.return.label"
                            defaultMessage="Daily Return"
                          />
                        }
                        secondary={
                          <Typography
                            style={{
                              color:
                                portfolio.dailyReturn &&
                                portfolio.dailyReturn.includes("-")
                                  ? "red"
                                  : "green", // Conditional coloring based on daily return
                              fontWeight: "bold",
                            }}
                          >
                            {portfolio.dailyReturn !== null
                              ? `${portfolio.dailyReturn}`
                              : "N/A"}
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText
                        primary={
                          <FormattedMessage
                            id="risk.label"
                            defaultMessage="Risk"
                          />
                        }
                        secondary={
                          portfolio.risk !== null ? portfolio.risk : "N/A"
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <FormattedMessage
                        id="assets.label"
                        defaultMessage="Assets"
                      />
                    }
                    secondary={
                      <List>
                        {portfolio.assets.map((asset, assetIndex) => (
                          <ListItem key={assetIndex}>
                            <ListItemText primary={asset} />
                          </ListItem>
                        ))}
                      </List>
                    }
                  />
                </ListItem>
              </ListItem>
              <Divider />
            </Paper>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default PortfolioPage;
