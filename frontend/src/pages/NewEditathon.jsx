import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Tab, Tabs, TextField, Typography, Paper } from "@mui/material";
import Header from "../components/Header";
import MarksSettings from "./MarksSettings";
import RuleSettings from "./RuleSettings";
import JurySetting from "./JurySetting";
import { post } from "../api"; // Import the post function from the API file

const NewEditathon = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",  // Change 'title' to 'name'
    code: "",
    project: "",
    description: "",
    start_date: "",
    end_date: "",
    created_by: "admin", // Assuming the user is an admin
    rules: {},
    accept_points: 1,
    reject_points: 0,
    jury: [],
  });
  

  const tabs = ["Info", "Rules", "Marks", "Jury"];

  // const handleOptionalChange = (event) => {
  //   const { name, checked } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: checked,
  //   }));
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Box sx={styles.formContainer}>
              <TextField
              label="Name" // Update label to reflect the 'name' field
              variant="outlined"
              fullWidth
              name="name"  // Use 'name' instead of 'title'
              value={formData.name}  // Bind to formData.name instead of formData.title
              onChange={handleInputChange}
              sx={styles.input}
            />
            <TextField
              label="Code"
              variant="outlined"
              fullWidth
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              sx={styles.input}
            />
            {formData.code && (
              <Typography variant="body2" sx={styles.link}>
                <a
                  href={`https://fountain.toolforge.org/editathon/${formData.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`https://fountain.toolforge.org/editathon/${formData.code}`}
                </a>
              </Typography>
            )}
            <TextField
              label="Project"
              variant="outlined"
              fullWidth
              name="project"
              value={formData.project}
              onChange={handleInputChange}
              sx={styles.input}
            />
            <TextField
              label="created_by"
              variant="outlined"
              fullWidth
              name="created_by"
              value={formData.created_by}
              onChange={handleInputChange}
              sx={styles.input}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              sx={styles.input}
            />
            <TextField
              label="Start Date"
              variant="outlined"
              type="datetime-local"
              fullWidth
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              sx={styles.input}
              InputLabelProps={{
                shrink: true, // Ensures the label stays above the input
              }}
            />
            <TextField
              label="End Date"
              variant="outlined"
              type="datetime-local"
              fullWidth
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              sx={styles.input}
              InputLabelProps={{
                shrink: true, // Ensures the label stays above the input
              }}
            />
          </Box>
        );
      case 1:
        return <RuleSettings  formData={formData} setFormData={setFormData}/>;
      case 2:
        return <MarksSettings  formData={formData} setFormData={setFormData}/>;
      case 3:
        return <JurySetting formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const handleBackButtonClick = () => {
    if (activeTab === 0) {
      navigate("/");
    } else {
      setActiveTab((prev) => Math.max(prev - 1, 0));
    }
  };

  
const handleSaveClick = async () => {
  console.log("Form Data before sending:", formData); 
  const { name, code, project, description, start_date, end_date, created_by } = formData;

  if (!name || !code || !project || !start_date || !end_date) {
    alert("Please fill in all required fields.");
    return;
  }

  // Extract only the date part from start_date and end_date
  const formattedStartDate = start_date.split("T")[0]; // Extract 'YYYY-MM-DD'
  const formattedEndDate = end_date.split("T")[0];   // Extract 'YYYY-MM-DD'
  console.log('Form Data:', formData); 
  const dataToSend = {
    name: formData.name,
    code: formData.code,
    project: formData.project,
    description: formData.description,
    start_date: formData.start_date,
    end_date: formData.end_date,
    created_by: formData.created_by,
    rules: formData.rules || {},
    jury: formData.jury || [],  // Ensure this is populated correctly
  };
  console.log('Data to send:', dataToSend);  

  try {
    const response = await fetch("http://localhost:5000/api/new-editathon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    const result = await response.json();

    if (response.status === 201) {
      // Success: Navigate to the contest page
      navigate(`/contest/${result.contest_id}`);
    } else {
      // Handle errors
      alert(result.error || "Failed to create the contest");
    }
  } catch (error) {
    console.error("Error saving data:", error);
    alert("There was an error while saving the data.");
  }
};
  
  

const handleNextButtonClick = () => {
  if (activeTab < tabs.length - 1) {
    setActiveTab((prev) => prev + 1);
  } else {
    handleSaveClick(); // Save when at last tab
  }
};
  

  return (
    <Box sx={styles.pageContainer}>
      <Header />
      <Typography variant="h4" sx={styles.title}>New Editathon</Typography>
      <Paper sx={styles.tabsContainer}>
        <Tabs
          value={activeTab}
          onChange={(e, newTab) => setActiveTab(newTab)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
      </Paper>
      <Box sx={styles.tabContent}>{renderTabContent()}</Box>
      <Box sx={styles.navigationButtons}>
        <Button variant="outlined" onClick={handleBackButtonClick} sx={styles.navButton}>
          Back
        </Button>
        {/* <Button variant="contained" color="primary" onClick={handleSaveClick} sx={styles.navButton}>
          Save
        </Button> */}
        <Button variant="contained" color="secondary" onClick={handleNextButtonClick} sx={styles.navButton}>
          {activeTab === tabs.length - 1 ? "Save" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  pageContainer: {
    padding: "2rem",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    marginBottom: "1.5rem",
  },
  tabsContainer: {
    marginBottom: "2rem",
  },
  tabContent: {
    marginBottom: "2rem",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  input: {
    marginBottom: "1rem",
  },
  link: {
    marginTop: "0.5rem",
    color: "#1976d2",
  },
  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginTop: "2rem",
  },
  navButton: {
    padding: "10px 20px",
    minWidth: "120px",
  },
};

export default NewEditathon;
