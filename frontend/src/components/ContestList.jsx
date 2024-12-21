import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const ContestList = ({ contests, searchQuery, userRole }) => {
  const filteredContests = contests.filter((contest) =>
    contest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ margin: "2rem 0" }}>
      <Typography variant="h4" gutterBottom>
        Contests
      </Typography>
      {filteredContests.length === 0 ? (
        <Typography>No contests found</Typography>
      ) : (
        filteredContests.map((contest) => (
          <Card key={contest.id} sx={{ marginBottom: "1rem", borderRadius: "4px" }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ marginBottom: "0.5rem" }}>
                <Link to={`/contest/${contest.id}`} style={{ textDecoration: "none", color: "#007BFF" }}>
                  {contest.name}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "1rem" }}>
                {contest.dateRange}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ContestList;
