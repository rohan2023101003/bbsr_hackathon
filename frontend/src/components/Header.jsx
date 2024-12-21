import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = ({ title }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={styles.toolbar}>
        <Typography variant="h6" sx={styles.title}>
          {title}
        </Typography>
        <Button variant="contained" color="secondary" sx={styles.loginButton}>
          Log In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    flexGrow: 1,
  },
  loginButton: {
    borderRadius: "50px",
    padding: "0.5rem 1.5rem",
  },
};

export default Header;
