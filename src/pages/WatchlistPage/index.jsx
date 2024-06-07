import { Box } from "@mui/material";
// import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { CountryDropdown } from "./sections";
import { IndexDropdown } from "./sections";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// trash can icon
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useEffect } from "react";
import { MagnifyingGlass, Spinner, Plus } from "@phosphor-icons/react";
import { Modal } from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Grid } from "@mui/material";
import { FormattedMessage } from "react-intl";

const rows = [
  {
    id: 1,
    symbol: "NVDA",
    companyName: "Nvidia",
    lastprice: 100,
    changeAmount: -20,
    changePercentage: "-0.71%",
    volume: 15600,
  },
  {
    id: 2,
    symbol: "AAPL",
    companyName: "Apple Inc.",
    lastprice: 150,
    changeAmount: 5,
    changePercentage: "+0.03%",
    volume: 25000,
  },
  {
    id: 3,
    symbol: "AMZN",
    companyName: "Amazon.com Inc.",
    lastprice: 3200,
    changeAmount: -15,
    changePercentage: "-0.47%",
    volume: 18000,
  },
  {
    id: 4,
    symbol: "TSLA",
    companyName: "Tesla, Inc.",
    lastprice: 800,
    changeAmount: 30,
    changePercentage: "+0.15%",
    volume: 35000,
  },
  {
    id: 5,
    symbol: "MSFT",
    companyName: "Microsoft Corporation",
    lastprice: 250,
    changeAmount: 10,
    changePercentage: "+0.04%",
    volume: 20000,
  },
  {
    id: 6,
    symbol: "GOOGLE",
    companyName: "Alphabet Inc. (Google)",
    lastprice: 2000,
    changeAmount: -25,
    changePercentage: "-1.25%",
    volume: 22000,
  },
  {
    id: 7,
    symbol: "META",
    companyName: "Facebook, Inc.",
    lastprice: 300,
    changeAmount: -7,
    changePercentage: "-0.36%",
    volume: 18000,
  },
  {
    id: 8,
    symbol: "BABA",
    companyName: "Alibaba Group Holding Limited",
    lastprice: 200,
    changeAmount: 8,
    changePercentage: "+0.60%",
    volume: 28000,
  },
  {
    id: 9,
    symbol: "JNJ",
    companyName: "Johnson & Johnson",
    lastprice: 170,
    changeAmount: -3,
    changePercentage: "-0.02%",
    volume: 15000,
  },
  {
    id: 10,
    symbol: "V",
    companyName: "Visa Inc.",
    lastprice: 220,
    changeAmount: 12,
    changePercentage: "+0.55%",
    volume: 19000,
  },
];

const MarketsPage = () => {
  const [selection, setSelection] = useState([]);

  const [watchlist, setWatchlist] = useState(rows);

  const [selectedCountry, setSelectedCountry] = useState("");

  const [selectedIndex, setSelectedIndex] = useState("");

  const [isBusy, setIsBusy] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  function handleSelectionChange(newSelection) {
    setSelection(newSelection);
  }

  const columns = [
    {
      field: "symbol",
      headerName: "Symbol",
      width: 120,
    },
    {
      field: "companyName",
      headerName: "Name",
      width: 250,
      renderCell: (params) => (
        <Link to="/equities/NVDA/overview">{params.value}</Link>
      ),
    },
    {
      field: "lastprice",
      headerName: "Last",
      width: 150,
    },
    {
      field: "changeAmount",
      headerName: "Change",
      width: 150,
    },
    {
      field: "changePercentage",
      headerName: "Change (%)",
      width: 150,
    },
    {
      field: "volume",
      headerName: "Volume",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 410,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // Prevent click event from bubbling up to the row
          setIsBusy(true);
          console.log(params);
          let rowToAdd = params.row;
          console.log(rowToAdd);

          try {
            // Replace this with actual API call
            setTimeout(() => {
              setIsBusy(false);
            }, 2000);
            console.log("Added to portfolio");
          } catch (err) {
            console.error(err);
            setIsBusy(false);
          }
        };

        const onRemove = (e) => {
          e.stopPropagation(); // Prevent click event from bubbling up to the row
          setIsBusy(true);
          console.log(params);
          let rowToRemove = params.row;
          console.log(rowToRemove);
        };

        return (
          <div className="">
            <button
              className="btn btn-primary w-4 mr-2 btn-md"
              onClick={onClick}
            >
              <span className="me-2">Add to Portfolio</span>
              {isBusy ? (
                <Spinner height={24} width={24} />
              ) : (
                <Plus height={24} width={24} />
              )}
            </button>
            <button
              className="btn btn-danger w-4 btn-md ml-2"
              style={{
                marginLeft: "0.5rem",
              }}
              onClick={onRemove}
            >
              <span className="me-2">Remove from Watchlist</span>
              {isBusy ? (
                <Spinner height={24} width={24} />
              ) : (
                <DeleteIcon height={24} width={24} />
              )}
            </button>
          </div>
        );
      },
    },
  ];

  function handleRemoveFromWatchlist() {
    setIsBusy(true);
    const newWatchlist = watchlist.filter((item) => {
      return !selection.includes(item.id);
    });

    try {
      // Replace this with actual API call
      setTimeout(() => {
        setWatchlist(newWatchlist);
        setIsBusy(false);
      }, 2000);

      console.log("Removed from watchlist");
    } catch (err) {
      console.error(err);
      setIsBusy(false);
    }
  }

  async function handleAddToPortfolio() {
    // Add selected items to portfolio
    setIsBusy(true);
    console.log("Add to portfolio");

    try {
      // Replace this with actual API call
      setTimeout(() => {
        setIsBusy(false);
      }, 2000);
      console.log("Added to portfolio");
    } catch (err) {
      console.error(err);
      setIsBusy(false);
    }
  }

  function filterWatchlist() {
    setIsBusy(true);
    console.log("Filtering watchlist");

    try {
      // Replace this with actual API call
      setTimeout(() => {
        setIsBusy(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setIsBusy(false);
    }
  }

  return (
    <div>
      <Box sx={{ textAlign: "center" }}>
        <h2>Watchlist</h2>
      </Box>

      <div className="row">
        <div
          className="col-md-2 slide-in-left"
          style={{
            display: "flex",
            flexDirection: "column",

            margin: "0.5rem",
          }}
        >
          <CountryDropdown
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          ></CountryDropdown>

          <IndexDropdown
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          ></IndexDropdown>

          <Button
            variant="contained"
            disabled={isBusy}
            onClick={() => {
              filterWatchlist();
            }}
          >
            <div
              style={{
                marginRight: "0.5rem",
              }}
            >
              Filter Results
            </div>
            {isBusy ? (
              <Spinner height={24} width={24} />
            ) : (
              <MagnifyingGlass height={24} width={24} />
            )}
          </Button>
        </div>

        <DataGrid
          className="col-md-7 slide-in-right"
          rows={watchlist}
          columns={columns}
          onRowSelectionModelChange={(selection) => {
            handleSelectionChange(selection);
          }}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          // horizontalScroll

          autoHeight
        ></DataGrid>
        {/* bootstrap table of the datagrid */}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          style={{
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: isBusy || selection.length < 1 ? "grey" : "red",
            }}
            disabled={isBusy || selection.length < 1}
            onClick={() => {
              handleRemoveFromWatchlist();
            }}
          >
            <span
              style={{
                color: "white",
                marginRight: "0.5rem",
              }}
            >
              Remove From Watchlist
            </span>
            {isBusy ? ( // Show spinner if busy
              <Spinner height={24} width={24} />
            ) : (
              <DeleteIcon
                style={{
                  color: "white",
                }}
              />
            )}
          </Button>

          <Button
            variant="contained"
            style={{
              backgroundColor:
                isBusy || selection.length < 1 ? "grey" : "green",
            }}
            disabled={isBusy || selection.length < 1}
            onClick={() => {
              handleAddToPortfolio();
            }}
          >
            <span
              style={{
                color: "white",
                marginRight: "0.5rem",
              }}
            >
              Add To Portfolio
            </span>
            {isBusy ? (
              <Spinner height={24} width={24} />
            ) : (
              <Plus
                height={24}
                width={24}
                style={{
                  color: "white",
                }}
              />
            )}
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default MarketsPage;
