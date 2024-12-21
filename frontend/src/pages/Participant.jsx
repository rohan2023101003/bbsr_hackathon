import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

const Participant = () => {
  const { contestId } = useParams();
  const [articleLink, setArticleLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/submit-article/${contestId}`);
    console.log(`Article submitted: ${articleLink}`);
  };

  return (
    <Box sx={styles.pageContainer}>
      <Paper sx={styles.formContainer}>
        <Typography variant="h4" sx={styles.title}>
          Submit Your Article for Contest {contestId}
        </Typography>
        <form onSubmit={handleSubmit} sx={styles.form}>
          <TextField
            label="Article Link"
            variant="outlined"
            fullWidth
            value={articleLink}
            onChange={(e) => setArticleLink(e.target.value)}
            required
            sx={styles.input}
          />
          <Box sx={styles.buttonContainer}>
            <Button variant="contained" color="primary" type="submit" sx={styles.submitButton}>
              Submit Article
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

const styles = {
  pageContainer: {
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
  },
  formContainer: {
    padding: "2rem",
    maxWidth: "600px",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    marginBottom: "1rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  submitButton: {
    padding: "10px 20px",
    minWidth: "200px",
  },
};

export default Participant;
