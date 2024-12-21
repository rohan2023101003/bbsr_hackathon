import React from "react";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CreateButton = ({ onClick }) => {
  return (
    <Tooltip title="Create New" aria-label="create new">
      <Fab
        color="primary"
        aria-label="create"
        onClick={onClick}
        sx={styles.button}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

const styles = {
  button: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",  
  },
};

export default CreateButton;
