import React, { useState } from "react";
import { Box, Button, FormControl, InputLabel, Select, MenuItem, TextField, FormControlLabel, Checkbox, Typography, Paper } from "@mui/material";

const RuleSettings = ({formData,setFormData}) => {
  const [selectedRule, setSelectedRule] = useState(""); 
  const [isOptional, setIsOptional] = useState(false);
  const [user, setUser] = useState("21GauriGuptaa");
  const [article, setArticle] = useState("");

  const handleOptionalChange = () => setIsOptional(!isOptional);
  const handleShowClick = () => alert(`User: ${user}, Article: ${article}`);

  const handleRuleChange = (event) => {
    setSelectedRule(event.target.value); 
    setFormData({
      ...formData,
      rules: {
        ...formData.rules,
        ruleType: event.target.value, // Storing the selected rule
        optional: isOptional,
      },
    });
  };

  return (
    <Box sx={styles.pageContainer}>
      <Paper sx={styles.formContainer}>
        <Typography variant="h4" sx={styles.title}>Rule Settings</Typography>
        
        <form>
          <Box sx={styles.section}>
            <FormControl fullWidth variant="outlined" sx={styles.formControl}>
              <InputLabel>Select Rule</InputLabel>
              <Select value={selectedRule} onChange={handleRuleChange} label="Select Rule">
                <MenuItem value="">Select a rule</MenuItem>
                <MenuItem value="articleNamespace">Article Namespace</MenuItem>
                <MenuItem value="userRole">User Role</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {selectedRule === "articleNamespace" && (
            <Box sx={styles.ruleInputSection}>
              <FormControlLabel
                control={
                  <Checkbox checked={isOptional} onChange={handleOptionalChange} />
                }
                label="Optional"
              />
              <Typography variant="body1" sx={styles.text}>
                Article must belong to the main namespace.
              </Typography>
            </Box>
          )}

          {selectedRule === "userRole" && (
            <Box sx={styles.ruleInputSection}>
              <TextField
                label="User Role"
                variant="outlined"
                fullWidth
                value={user}
                onChange={(e) => setUser(e.target.value)}
                sx={styles.textField}
              />
              <Typography variant="body1" sx={styles.text}>
                Specify the role for the user.
              </Typography>
            </Box>
          )}

          <Box sx={styles.buttonsContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowClick}
              sx={styles.button}
            >
              Show Data
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
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    padding: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center",
  },
  section: {
    marginBottom: "1.5rem",
  },
  formControl: {
    width: "100%",
  },
  ruleInputSection: {
    marginTop: "1.5rem",
  },
  textField: {
    marginBottom: "1rem",
  },
  text: {
    fontSize: "0.875rem",
    color: "#555",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  button: {
    padding: "10px 20px",
  },
};

export default RuleSettings;
