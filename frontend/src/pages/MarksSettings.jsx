import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Chip,
  Grid,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const MarksSettings = () => {
  const [radioGroups, setRadioGroups] = useState([
    {
      title: "Accept the article?",
      buttons: [
        { title: "Yes", value: 1, description: "accepted" },
        { title: "No", value: 0, description: "not accepted" },
      ],
    },
  ]);

  const [previewText, setPreviewText] = useState("");

  const handleAddGroup = () => {
    setRadioGroups([...radioGroups, { title: "", buttons: [] }]);
  };

  const handleAddButton = (groupIndex) => {
    const updatedGroups = [...radioGroups];
    updatedGroups[groupIndex].buttons.push({
      title: "",
      value: 0,
      description: "",
    });
    setRadioGroups(updatedGroups);
  };

  const updateGroupTitle = (index, title) => {
    const updatedGroups = [...radioGroups];
    updatedGroups[index].title = title;
    setRadioGroups(updatedGroups);
  };

  const updateButton = (groupIndex, buttonIndex, field, value) => {
    const updatedGroups = [...radioGroups];
    updatedGroups[groupIndex].buttons[buttonIndex][field] = value;
    setRadioGroups(updatedGroups);
  };

  const removeGroup = (index) => {
    setRadioGroups(radioGroups.filter((_, i) => i !== index));
  };

  const handleButtonClick = (groupIndex, buttonIndex) => {
    const button = radioGroups[groupIndex].buttons[buttonIndex];
    setPreviewText(`${button.value} ${button.value > 0 ? "+" : ""}${button.value} ${button.description}`);
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" gutterBottom>
        Marks Settings
      </Typography>

      <Box sx={styles.radioGroups}>
        {radioGroups.map((group, groupIndex) => (
          <Box key={groupIndex} sx={styles.groupContainer}>
            <IconButton
              color="secondary"
              onClick={() => removeGroup(groupIndex)}
              sx={styles.removeGroupButton}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              label="Group Title"
              variant="outlined"
              value={group.title}
              onChange={(e) => updateGroupTitle(groupIndex, e.target.value)}
              fullWidth
            />
            {group.buttons.map((button, buttonIndex) => (
              <Box key={buttonIndex} sx={styles.buttonContainer}>
                <TextField
                  label="Button Title"
                  variant="outlined"
                  value={button.title}
                  onChange={(e) =>
                    updateButton(groupIndex, buttonIndex, "title", e.target.value)
                  }
                  fullWidth
                />
                <Box sx={styles.valueControl}>
                  <Typography>Value:</Typography>
                  <IconButton
                    onClick={() =>
                      updateButton(groupIndex, buttonIndex, "value", button.value - 1)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    type="number"
                    value={button.value}
                    onChange={(e) =>
                      updateButton(groupIndex, buttonIndex, "value", parseInt(e.target.value, 10))
                    }
                    sx={styles.numberInput}
                    inputProps={{ min: 0 }}
                  />
                  <IconButton
                    onClick={() =>
                      updateButton(groupIndex, buttonIndex, "value", button.value + 1)
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <TextField
                  label="Description"
                  variant="outlined"
                  value={button.description}
                  onChange={(e) =>
                    updateButton(groupIndex, buttonIndex, "description", e.target.value)
                  }
                  fullWidth
                />
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddButton(groupIndex)}
              sx={styles.addButton}
            >
              Add Radio Button
            </Button>
          </Box>
        ))}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleAddGroup}
          sx={styles.addGroupButton}
        >
          Add New Group
        </Button>
      </Box>

      <Box sx={styles.previewContainer}>
        <Typography variant="h6">Preview</Typography>
        <Typography variant="body2" sx={styles.previewText}>
          Please pick all compulsory mark controls below to test the mark
        </Typography>
        {radioGroups.map((group, groupIndex) => (
          <Box key={groupIndex} sx={styles.previewGroup}>
            <Typography variant="subtitle1">
              <strong>{group.title}</strong>
            </Typography>
            <Box sx={styles.previewButtons}>
              {group.buttons.map((button, buttonIndex) => (
                <Chip
                  key={buttonIndex}
                  label={button.title}
                  onClick={() => handleButtonClick(groupIndex, buttonIndex)}
                  sx={styles.previewChip}
                />
              ))}
            </Box>
          </Box>
        ))}
        {previewText && (
          <Box sx={styles.previewResult}>
            <Typography variant="body1">
              <strong>Selected Mark:</strong> {previewText}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  radioGroups: {
    marginBottom: "2rem",
  },
  groupContainer: {
    marginBottom: "2rem",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  removeGroupButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  buttonContainer: {
    marginTop: "1rem",
  },
  valueControl: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  numberInput: {
    width: "80px",
    textAlign: "center",
  },
  addButton: {
    marginTop: "1rem",
  },
  addGroupButton: {
    marginTop: "1rem",
  },
  previewContainer: {
    marginTop: "3rem",
  },
  previewText: {
    marginBottom: "1rem",
  },
  previewGroup: {
    marginBottom: "1rem",
  },
  previewButtons: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  previewChip: {
    cursor: "pointer",
    backgroundColor: "#1976d2",
    color: "#fff",
  },
  previewResult: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default MarksSettings;
