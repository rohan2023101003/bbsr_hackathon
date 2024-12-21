import React, { useState } from "react";
import { Typography, Container, Grid, Box } from "@mui/material";
import Header from "../components/Header";
import SearchFilters from "../components/SearchFilters";
import ContestList from "../components/ContestList";
import CreateButton from "../components/CreateButton";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [contests, setContests] = useState([
    { id: 1, name: "Wikipedia Asian Month 2024", dateRange: "Nov 2024" },
    { id: 2, name: "Women in Red Translation Contest", dateRange: "Jul–Sep 2024" },
    { id: 3, name: "Feminism and Folklore 2024", dateRange: "Apr–May 2024" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const userRole = "participant";

  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCreateContest = () => {
    navigate("/new-editathon");
  };

  const handleContestClick = (contestId) => {
    navigate(`/contest/${contestId}`);
  };

  return (
    <Box sx={styles.dashboard}>
      <Container maxWidth="lg">
        <Header title="Editathons" />
        <SearchFilters onSearch={handleSearch} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <CreateButton onClick={handleCreateContest} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Upcoming Contests
            </Typography>
            <ContestList
              contests={contests}
              searchQuery={searchQuery}
              onContestClick={handleContestClick}
              userRole={userRole}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const styles = {
  dashboard: {
    padding: "2rem",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
};

export default Dashboard;
