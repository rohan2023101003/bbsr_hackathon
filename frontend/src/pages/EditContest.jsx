import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { fetchContestById } from "../api/contest";

const EditContest = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    project: "",
    description: "",
    startDate: "",
    endDate: "",
    jury: [],
  });

  // useEffect(() => {
  //   const savedContestData = JSON.parse(localStorage.getItem("contestData")) || {};
  //   if (savedContestData.id === contestId) {
  //     setFormData(savedContestData);
  //   }
  // }, [contestId]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  useEffect(() => {
    const loadContestDetails = async () => {
      try {
        // Fetch contest data from API based on contestId
        const contestData = await fetchContestById(contestId);
        console.log(contestData); 
        
        // Populate the form fields with the existing contest data
        setFormData({
          title: contestData.name || "",
        code: contestData.code || "",
        project: contestData.project || "", // Assuming the project field exists
        description: contestData.description || "",
        startDate: contestData.start_date || "",
        endDate: contestData.end_date || "",
        created_by: contestData.created_by || "", // If you want this editable
        jury: contestData.jury?.map((judge) => judge.username) || [], // If the jury are an array of objects, extract the username
      });
      } catch (error) {
        console.error("Error fetching contest details:", error);
        alert("Failed to load contest data.");
      }
    };

    loadContestDetails(); // Fetch the contest details when the component mounts
  }, [contestId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleJuryChange = (index, event) => {
    console.log("formData.jury", formData.jury);
    const newJury = [...formData.jury];

    newJury[index] = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      jury: newJury,
    }));
  };

  const handleAddJury = () => {
    setFormData((prevData) => ({
      ...prevData,
      jury: [...prevData.jury, ""],
    }));
  };

  const handleRemoveJury = (index) => {
    const newJury = formData.jury.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      jury: newJury,
    }));
  };

  const handleSaveClick = () => {
    // localStorage.setItem("contestData", JSON.stringify(formData));
    alert("Contest updated successfully!");
    navigate(`/contest/${contestId}`); 
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" gutterBottom>Edit Contest</Typography>
      <form style={styles.form}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Code"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Project"
          name="project"
          value={formData.project}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="datetime-local"
          value={formData.startDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="datetime-local"
          value={formData.endDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        {/* Jury Members Section */}
        <Typography variant="h6" gutterBottom>Jury Members</Typography>
        {formData.jury.map((jury, index) => (
          <Box key={index} sx={styles.juryContainer}>
            <TextField
              label={`Jury Member ${index + 1}`}
              name={`jury-${index}`}
              value={jury}
              onChange={(event) => handleJuryChange(index, event)}
              fullWidth
              margin="normal"
            />
            <IconButton
              color="error"
              onClick={() => handleRemoveJury(index)}
              sx={styles.removeButton}
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddJury}
          sx={styles.addJuryButton}
        >
          Add Jury Member
        </Button>

        <Box sx={styles.saveButtonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
            sx={styles.saveButton}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  juryContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  removeButton: {
    marginLeft: "1rem",
  },
  addJuryButton: {
    marginTop: "1rem",
  },
  saveButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  saveButton: {
    padding: "0.5rem 1.5rem",
  },
};

export default EditContest;
