import React from "react";
import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";

const NewsCard = ({ article }) => {
  return (
    <a href={article.url} target="_blank" style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={article.urlToImage}
          alt={article.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Author: {article.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Published At: {new Date(article.publishedAt).toLocaleString()}
          </Typography>
          <Link href={article.url} target="_blank" rel="noopener">
            Read More
          </Link>
        </CardContent>
      </Card>
    </a>
  );
};

export default NewsCard;
