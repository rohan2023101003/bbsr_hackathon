import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import { fetchContestById } from "../api/contest"; // Assuming this is the API function to fetch contest details

const ContestDetail = ({ userRole }) => {
  const { contestId } = useParams();
  console.log("Contest ID:", contestId);
  const navigate = useNavigate();

  const [contestDetails, setContestDetails] = useState(null); // State to store contest details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State to store error messages

  useEffect(() => {
    const loadContestDetails = async () => {
      try {
        const data = await fetchContestById(contestId); // Fetch data from backend
        console.log(data); // Log the data to see the structure
        const formattedContest = {
          id: data.id,
          name: data.name,
          description: data.description,
          rules: data.rules || "No rules provided", // You may need to handle undefined rules
          jury: data.jury || [],
          numArticles: data.submissions.reduce((sum, submission) => sum + submission.submission_count, 0), // Summing all submissions
          numParticipants: data.submissions.length,
          startDate: data.start_date,
          endDate: data.end_date,
          project: data.project || "Not specified", // Assuming `project` field exists
          code: data.code || "Not specified", // Assuming `language` field exists
        };
        
        setContestDetails(formattedContest); // Update state with the fetched data
      } catch (error) {
        setError("Failed to fetch contest details");
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    loadContestDetails(); // Call the function to load contest details
  }, [contestId]); // Only re-run this effect if the contestId changes

  const handleButtonClick = () => {
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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    contestDetails && (
      <Paper sx={styles.container}>
        <Typography variant="h3" gutterBottom>{contestDetails.name}</Typography>
        <Typography variant="body1" paragraph>{contestDetails.description}</Typography>

        <Typography variant="h5" gutterBottom>Rules:</Typography>
        <Typography variant="body2" paragraph>
  {typeof contestDetails.rules === "string"
    ? contestDetails.rules
    : `Rule Type: ${contestDetails.rules?.ruleType}, Optional: ${contestDetails.rules?.optional ? "Yes" : "No"}`}
</Typography>


<Typography variant="h5" gutterBottom>Jury Members:</Typography>
{contestDetails.jury.length > 0 ? (
  <List>
    {contestDetails.jury.map((juryMember, index) => (
      <ListItem key={index}>
        <ListItemText primary={juryMember} />
      </ListItem>
    ))}
  </List>
) : (
  <Typography variant="body2">No jury members assigned.</Typography>
)}

        <Typography variant="h5" gutterBottom>Project Type:</Typography>
        <Typography variant="body1">{contestDetails.project}</Typography>

        <Typography variant="h5" gutterBottom>Language:</Typography>
        <Typography variant="body1">{contestDetails.code}</Typography>

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
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/")}
          sx={styles.homeButton}
        >
          Go to Homepage
        </Button>
      </Paper>
    )
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
  homeButton: {
    marginTop: "1rem",
    marginLeft: "1rem",
    padding: "0.5rem 2rem",
    fontSize: "1rem",
  },
};

export default ContestDetail;
