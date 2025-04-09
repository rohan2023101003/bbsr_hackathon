import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, List, ListItem, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const JurySetting = ({ formData, setFormData }) => {
  const [inputValue, setInputValue] = useState("");
  const [minimumMarks, setMinimumMarks] = useState(1); // optional field you can use in future

  const addJury = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !formData.jury.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        jury: [...prev.jury, trimmed],
      }));
    }
    setInputValue("");
  };

  const removeJury = (username) => {
    setFormData((prev) => ({
      ...prev,
      jury: prev.jury.filter((j) => j !== username),
    }));
  };
  return (
    <Box sx={styles.container}>
      <Typography variant="h4" gutterBottom>
        Jury Settings
      </Typography>

      {/* Add Jury Member */}
      <Box sx={styles.form}>
        <Typography variant="h6">Add Jury Member:</Typography>
        <Box sx={styles.inputContainer}>
          <TextField
            id="jury-input"
            label="Enter username"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={styles.input}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={addJury} sx={styles.addButton}>
            Add
          </Button>
        </Box>
      </Box>

      {/* Jury Member List */}
      <Box sx={styles.listContainer}>
        <Typography variant="h6">Jury Members:</Typography>
        <List sx={styles.list}>
        {formData.jury.map((member, index) => {
  const username = typeof member === "string" ? member : member.username;
  return (
    <ListItem key={username || index} sx={styles.listItem}>
      <Typography>{username}</Typography>
      <IconButton
        color="secondary"
        onClick={() => removeJury(username)}
        sx={styles.removeButton}
      >
        <RemoveIcon />
      </IconButton>
    </ListItem>
  );
})}
        </List>
      </Box>

      {/* Total Jury Members and Clear Button */}
      <Box sx={styles.statsContainer}>
        <Typography variant="body1">Total Jury Members:{formData.jury.length}</Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setFormData((prev) => ({ ...prev, jury: [] }))}
          sx={styles.clearButton}
        >
          Clear All Jury Members
        </Button>
      </Box>

      {/* Minimum Marks */}
      <Box sx={styles.marksContainer}>
        <Typography variant="h6">Minimum number of marks per article:</Typography>
        <Box sx={styles.marksControls}>
          <IconButton onClick={() => setMinimumMarks(Math.max(minimumMarks - 1, 1))}>
            <RemoveIcon />
          </IconButton>
          <TextField
            type="number"
            id="minimum-marks"
            value={minimumMarks}
            onChange={(e) => setMinimumMarks(Math.max(Number(e.target.value), 1))}
            sx={styles.marksInput}
            inputProps={{ min: 1 }}
          />
          <IconButton onClick={() => setMinimumMarks(minimumMarks + 1)}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Roboto', sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  form: {
    marginBottom: "2rem",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  input: {
    flex: 1,
  },
  addButton: {
    height: "56px",
  },
  listContainer: {
    marginTop: "1.5rem",
    marginBottom: "2rem",
  },
  list: {
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  removeButton: {
    marginLeft: "1rem",
  },
  statsContainer: {
    marginBottom: "1rem",
  },
  clearButton: {
    marginTop: "1rem",
  },
  marksContainer: {
    marginTop: "1rem",
  },
  marksControls: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  marksInput: {
    width: "60px",
    textAlign: "center",
  },
};

export default JurySetting;
