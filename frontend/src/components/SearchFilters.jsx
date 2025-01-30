import React, { useState } from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, Grid } from "@mui/material";

const SearchFilters = ({ onFiltersChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projectType, setProjectType] = useState("all");
  const [language, setLanguage] = useState("all");

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onFiltersChange({ searchQuery: query, projectType, language });
  };

  const handleProjectTypeChange = (e) => {
    const type = e.target.value;
    setProjectType(type);
    onFiltersChange({ searchQuery, projectType: type, language });
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    onFiltersChange({ searchQuery, projectType, language: lang });
  };

  return (
    <Grid container spacing={2} sx={styles.filters}>
      <Grid item xs={12} md={4}>
        <TextField
          label="Search contests..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchQueryChange}
          sx={styles.input}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Project Type</InputLabel>
          <Select value={projectType} onChange={handleProjectTypeChange} label="Project Type" sx={styles.select}>
            <MenuItem value="all">All Projects</MenuItem>
            <MenuItem value="wiki">Wikipedia</MenuItem>
            <MenuItem value="wikimedia">Wikimedia</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Language</InputLabel>
          <Select value={language} onChange={handleLanguageChange} label="Language" sx={styles.select}>
            <MenuItem value="all">All Languages</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const styles = {
  filters: {
    margin: "1rem 0",
  },
  input: {
    marginBottom: "1rem",
  },
  select: {
    marginBottom: "1rem",
  },
};

export default SearchFilters;
