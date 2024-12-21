import React from "react";
import Header from "../components/Header";
import UserArticleList from "../components/UserArticleList";
import { Typography, Box, Paper, Grid, Card, CardContent, Button } from "@mui/material";

const ParticipantView = () => {
  const participantData = {
    name: "Telugu",
    articles: 12,
    points: 20,
    submittedArticles: [
      {
        title: "Telugu Culture",
        status: "Approved",
        reviewer: "Reviewer1",
        points: 3,
        reviewedOn: "5 Nov 10:15 AM",
        link: "/article/telugu-culture",
      },
      {
        title: "History of Telugu Language",
        status: "Not Approved",
        reviewer: "Reviewer2",
        points: 0,
        reviewedOn: "6 Nov 12:00 PM",
        link: "/article/history-telugu-language",
      },
      {
        title: "Telugu Literature",
        status: "Pending",
        reviewer: null,
        points: null,
        reviewedOn: null,
        link: "/article/telugu-literature",
      },
    ],
  };

  return (
    <Box sx={styles.pageContainer}>
      <Header />
      <Paper sx={styles.summaryContainer}>
        <Typography variant="h4" sx={styles.title}>Welcome, {participantData.name}</Typography>
        <Typography variant="body1" sx={styles.subtitle}>
          Here is a summary of your articles in the editathon:
        </Typography>
        <Grid container spacing={3} sx={styles.gridContainer}>
          <Grid item xs={12} md={6}>
            <Card sx={styles.card}>
              <CardContent>
                <Typography variant="h6">Total Articles Submitted:</Typography>
                <Typography variant="h5" sx={styles.cardValue}>{participantData.articles}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={styles.card}>
              <CardContent>
                <Typography variant="h6">Total Points:</Typography>
                <Typography variant="h5" sx={styles.cardValue}>{participantData.points}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={styles.articleListContainer}>
        <UserArticleList userData={participantData} isParticipantView={true} />
      </Box>
    </Box>
  );
};

const styles = {
  pageContainer: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f5f5f5",
  },
  summaryContainer: {
    padding: "2rem",
    marginBottom: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: "2rem",
  },
  gridContainer: {
    marginBottom: "2rem",
  },
  card: {
    padding: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  cardValue: {
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#1976d2",
  },
  articleListContainer: {
    marginTop: "2rem",
  },
};

export default ParticipantView;
