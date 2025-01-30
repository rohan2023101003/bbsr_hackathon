import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { fetchSubmittedArticles } from "../api/contest";

const JuryDashboard = ({ contestId }) => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchSubmittedArticles(contestId);
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    loadArticles();
  }, [contestId]);

  const handleReviewClick = (articleId) => {
    navigate(`/contest/${contestId}/review/${articleId}`);
  };

  return (
    <Grid container spacing={3}>
      {articles.map((article) => (
        <Grid item xs={12} sm={6} md={4} key={article.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{article.title}</Typography>
              <Typography variant="body2">{article.content}</Typography>
              <Button variant="contained" onClick={() => handleReviewClick(article.id)}>
                Review
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default JuryDashboard;
