import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Grid,
  Typography,
} from "@mui/material";
import NewsCard from "./NewsCard";

const NewsPage = () => {
  const [selectedCompany, setSelectedCompany] = useState("Nvidia");
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const companies = [
    { id: 1, companyName: "Nvidia" },
    { id: 2, companyName: "Apple Inc." },
    { id: 3, companyName: "Amazon.com Inc." },
    { id: 4, companyName: "Tesla, Inc." },
    { id: 5, companyName: "Microsoft Corporation" },
    { id: 6, companyName: "Alphabet Inc. (Google)" },
    { id: 7, companyName: "Facebook, Inc." },
    { id: 8, companyName: "Alibaba Group Holding Limited" },
    { id: 9, companyName: "Johnson & Johnson" },
    { id: 10, companyName: "Visa Inc." },
  ];

  useEffect(() => {
    const fetchNewsForCompany = async (companyName, pageNumber = 1) => {
      try {
        const apiKey = "cbda4c04725546cbb4bf24b7c55a34e4";
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${companyName}&page=${pageNumber}&pageSize=10&apiKey=${apiKey}`,
        );
        const data = await response.json();
        console.log(data);
        setNews(data.articles);
        setTotalPages(Math.ceil(data.totalResults / 10));
      } catch (error) {
        console.error(`Error fetching news for ${companyName}:`, error);
      }
    };

    if (selectedCompany) {
      fetchNewsForCompany(selectedCompany, page);
    }
  }, [selectedCompany, page]);

  const handleCompanyClick = (companyName) => {
    setSelectedCompany(companyName);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ my: 4 }} variant="h3">
        News for {selectedCompany}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-between",
          alignItems: "center",
        }}
      >
        <List component="nav" sx={{ alignSelf: "start", width: "20%" }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Compaines
          </Typography>
          {companies.map((company, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleCompanyClick(company.companyName)}
            >
              <ListItemText primary={company.companyName} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ textAlign: "left", ml: 4, width: "80%" }}>
          <Grid container spacing={2}>
            {news.map((article, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <NewsCard article={article} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 4,
            }}
          >
            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsPage;
