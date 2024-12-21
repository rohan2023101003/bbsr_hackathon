import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

const ContestDetail = ({ userRole }) => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const contestDetails = {
    id: contestId,
    name: "Writing Contest",
    description: "A contest for creative writers",
    rules: "Write a short story within 1000 words.",
    jury: ["Jury Member 1", "Jury Member 2"],
    numArticles: 50,
    numParticipants: 30,
    startDate: "2024-12-01T09:00:00",
    endDate: "2024-12-31T23:59:59",
  };

  const handleButtonClick = () => {
    console.log(`User role is: ${userRole}`);
    if (userRole === "coordinator") {
      navigate(`/edit-contest/${contestId}`);
    } else if (userRole === "jury") {
      navigate(`/jury-review/${contestId}`);
    } else if (userRole === "participant") {
      navigate(`/submit-article/${contestId}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Paper sx={styles.container}>
      <Typography variant="h3" gutterBottom>{contestDetails.name}</Typography>
      <Typography variant="body1" paragraph>{contestDetails.description}</Typography>

      <Typography variant="h5" gutterBottom>Rules:</Typography>
      <Typography variant="body2" paragraph>{contestDetails.rules}</Typography>

      <Typography variant="h5" gutterBottom>Jury Members:</Typography>
      <List>
        {contestDetails.jury.map((juryMember, index) => (
          <ListItem key={index}>
            <ListItemText primary={juryMember} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" gutterBottom>Number of Articles Submitted:</Typography>
      <Typography variant="body1">{contestDetails.numArticles}</Typography>

      <Typography variant="h5" gutterBottom>Number of Participants:</Typography>
      <Typography variant="body1">{contestDetails.numParticipants}</Typography>

      <Typography variant="h5" gutterBottom>Start Date:</Typography>
      <Typography variant="body1">{formatDate(contestDetails.startDate)}</Typography>

      <Typography variant="h5" gutterBottom>End Date:</Typography>
      <Typography variant="body1">{formatDate(contestDetails.endDate)}</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        sx={styles.button}
      >
        {userRole === "coordinator"
          ? "Edit Contest"
          : userRole === "jury"
          ? "Review"
          : "Submit Article"}
      </Button>
    </Paper>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Roboto', sans-serif",
    maxWidth: "900px",
    margin: "2rem auto",
    backgroundColor: "#fafafa",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 2rem",
    fontSize: "1rem",
  },
};

export default ContestDetail;
