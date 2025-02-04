import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import axios from "axios";

const ParticipantDashboard = () => {
  const { username } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, [username]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/user/${username}/submissions`);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  return (
    <Grid container spacing={3}>
      {articles.map((article) => (
        <Grid item xs={12} sm={6} md={4} key={article.title}>
          <Card>
            <CardContent>
              <Typography variant="h5">{article.title}</Typography>
              <Typography variant="body2">Submitted on: {new Date(article.submitted_on).toLocaleString()}</Typography>
              <Typography variant="body2">Score: {article.score || "Pending"}</Typography>
              <Typography variant="body2">Feedback: {article.feedback || "No feedback yet"}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ParticipantDashboard;
