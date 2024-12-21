import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Tab, Tabs, TextField, Typography, Paper } from "@mui/material";
import Header from "../components/Header";
import MarksSettings from "./MarksSettings";
import RuleSettings from "./RuleSettings";
import JurySetting from "./JurySetting";

const NewEditathon = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    project: "",
    description: "",
    startDate: "",
    endDate: "",
    consensualVote: false,
    hiddenMarks: false,
  });

  const tabs = ["Info", "Rules", "Marks", "Jury"];

  const handleOptionalChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

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
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              value={formData.title}
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
              name="startDate"
              value={formData.startDate}
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
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              sx={styles.input}
              InputLabelProps={{
                shrink: true, // Ensures the label stays above the input
              }}
            />
          </Box>
        );
      case 1:
        return <RuleSettings />;
      case 2:
        return <MarksSettings />;
      case 3:
        return <JurySetting />;
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

  const handleSaveClick = () => {
    const { title, code, project, startDate, endDate } = formData;
    if (!title || !code || !project || !startDate || !endDate) {
      return;
    }
    localStorage.setItem("editathonData", JSON.stringify(formData));
    alert("Data Saved Successfully!");
  };

  const handleNextButtonClick = () => {
    if (activeTab === tabs.length - 1) {
      navigate("/jury-review");
    } else {
      const nextTab = Math.min(activeTab + 1, tabs.length - 1);
      setActiveTab(nextTab);
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
        <Button variant="contained" color="primary" onClick={handleSaveClick} sx={styles.navButton}>
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={handleNextButtonClick} sx={styles.navButton}>
          Next
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
