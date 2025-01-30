import React, { useState, useEffect } from "react";
import { Typography, Container, Grid, Box } from "@mui/material";
import Header from "../components/Header";
import SearchFilters from "../components/SearchFilters";
import ContestList from "../components/ContestList";
import CreateButton from "../components/CreateButton";
import { useNavigate } from "react-router-dom";
import { fetchContest } from "../api/contest"; // import the fetchContest function

const Dashboard = ({userRole}) => {
  const [contests, setContests] = useState([]); // Initialize contests as an empty array
  const [filters, setFilters] = useState({
    searchQuery: "",
    projectType: "all",
    language: "all",
  });


  const navigate = useNavigate();

  useEffect(() => {
    const loadContests = async () => {
      try {
        const data = await fetchContest(); // Fetch the contests from the backend
        // Map the response to the required format
        const formattedContests = data.map((contest) => ({
          id: contest.id,
          name: contest.name,
          dateRange: `${new Date(contest.start_date).toLocaleDateString()} – ${new Date(contest.end_date).toLocaleDateString()}`,
          projectType: contest.project || "wiki", // Assuming `project` field exists
          language: contest.language || "en",
        }));
        setContests(formattedContests); // Set the contests in state
      } catch (error) {
        console.error("Failed to fetch contests:", error);
      }
    };

    loadContests();
  }, []); // Empty dependency array to run only once when the component mounts

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCreateContest = () => {
    navigate("/new-editathon");
  };

  const handleContestClick = (contestId) => {
    navigate(`/contest/${contestId}`);
  };

  const filteredContests = contests.filter((contest) => {
    const matchesSearch = contest.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesProject = filters.projectType === "all" || contest.projectType === filters.projectType;
    const matchesLanguage = filters.language === "all" || contest.language === filters.language;
    return matchesSearch && matchesProject && matchesLanguage;
  });

  return (
    <Box sx={styles.dashboard}>
      <Container maxWidth="lg">
        <Header title="Editathons" />
        <SearchFilters onFiltersChange={handleFiltersChange} />
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
              searchQuery={filters.searchQuery}
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
