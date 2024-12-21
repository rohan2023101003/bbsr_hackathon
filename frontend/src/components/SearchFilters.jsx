import React from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, Grid } from "@mui/material";

const SearchFilters = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Grid container spacing={2} sx={styles.filters}>
      <Grid item xs={12} md={4}>
        <TextField
          label="Search contests..."
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
          sx={styles.input}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Project Type</InputLabel>
          <Select defaultValue="all" label="Project Type" sx={styles.select}>
            <MenuItem value="all">All Projects</MenuItem>
            <MenuItem value="wiki">Wikipedia</MenuItem>
            <MenuItem value="wikimedia">Wikimedia</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Language</InputLabel>
          <Select defaultValue="en" label="Language" sx={styles.select}>
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
