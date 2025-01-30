import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { postArticleReview } from "../api/contest";

const ArticleReview = ({ contestId }) => {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const [marks, setMarks] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleMarksChange = (e) => setMarks(e.target.value);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleSaveReview = async () => {
    try {
      await postArticleReview(contestId, articleId, marks, feedback);
      alert("Review saved successfully.");
      navigate(`/contest/${contestId}`);
    } catch (error) {
      alert("Error saving review");
    }
  };

  return (
    <div>
      <Typography variant="h5">Review Article</Typography>
      <TextField
        label="Marks"
        value={marks}
        onChange={handleMarksChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Feedback"
        value={feedback}
        onChange={handleFeedbackChange}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSaveReview}>
        Save Review
      </Button>
    </div>
  );
};

export default ArticleReview;
