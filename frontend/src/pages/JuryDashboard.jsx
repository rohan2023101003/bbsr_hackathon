import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid, TextField, Snackbar } from "@mui/material";
import axios from "axios";

const JuryDashboard = () => {
  const { contestId } = useParams();
  const [articles, setArticles] = useState([]);
  const [reviewData, setReviewData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    fetchArticles();
  }, [contestId]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/contest/${contestId}/submissions`);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const handleReviewChange = (submissionId, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [submissionId]: { ...prev[submissionId], [field]: value },
    }));
  };

  const submitReview = async (submissionId) => {
    try {
      const { marks, feedback } = reviewData[submissionId] || {};
      if (!marks) {
        alert("Marks are required");
        return;
      }

      await axios.post(`http://127.0.0.1:5000/api/contest/${contestId}/review`, {
        submission_id: submissionId,
        marks,
        feedback,
      });

      setSnackbar({ open: true, message: "Review submitted successfully!" });
      fetchArticles();
    } catch (error) {
      console.error("Error reviewing submission:", error);
    }
  };

  const deleteArticle = async (submissionId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/contest/${contestId}/delete-submission/${submissionId}`);
      setSnackbar({ open: true, message: "Article deleted successfully!" });
      fetchArticles();
    } catch (error) {
      console.error("Error deleting submission:", error);
    }
  };

  return (
    <Grid container spacing={3}>
      {articles.map((article) => (
        <Grid item xs={12} sm={6} md={4} key={article.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{article.title}</Typography>
              <Typography variant="body2">Submitted by: {article.user_username}</Typography>
              <Typography variant="body2">Score: {article.score || "Not reviewed yet"}</Typography>
              <Typography variant="body2">Feedback: {article.feedback || "No feedback given"}</Typography>

              <TextField
                label="Marks"
                type="number"
                variant="outlined"
                fullWidth
                value={reviewData[article.id]?.marks || ""}
                onChange={(e) => handleReviewChange(article.id, "marks", e.target.value)}
                sx={{ marginTop: "10px" }}
              />

              <TextField
                label="Feedback"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={reviewData[article.id]?.feedback || ""}
                onChange={(e) => handleReviewChange(article.id, "feedback", e.target.value)}
                sx={{ marginTop: "10px" }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={() => submitReview(article.id)}
                sx={{ marginTop: "10px" }}
              >
                Submit Review
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => deleteArticle(article.id)}
                sx={{ marginTop: "10px", marginLeft: "10px" }}
              >
                Delete Article
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
      />
    </Grid>
  );
};

export default JuryDashboard;
