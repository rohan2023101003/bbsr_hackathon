import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../components/Header";

const JuryReview = () => {
  const { contestId } = useParams();
  const [contestInfo, setContestInfo] = useState({});
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const contestResponse = await axios.get(`/api/contest/${contestId}`);
        const usersResponse = await axios.get(`/api/contest/${contestId}/users`);

        setContestInfo(contestResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching contest data:", error);
      }
    };

    fetchContestData();
  }, [contestId]);

  const handleToggleUserDetails = (user) => {
    setExpandedUser(expandedUser === user ? null : user);
  };

  return (
    <div>
      <Header />
      <Box sx={styles.container}>
        <Typography variant="h4" gutterBottom>{contestInfo.name}</Typography>
        <Typography variant="h6" paragraph>{contestInfo.description}</Typography>

        <Box sx={styles.statsContainer}>
          <Typography variant="body1"><strong>Users:</strong> {contestInfo.stats?.users}</Typography>
          <Typography variant="body1"><strong>Articles:</strong> {contestInfo.stats?.articles}</Typography>
          <Typography variant="body1"><strong>Marks:</strong> {contestInfo.stats?.marks}</Typography>
          <Typography variant="body1"><strong>Without Marks:</strong> {contestInfo.stats?.withoutMarks}</Typography>
        </Box>

        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Articles</strong></TableCell>
                <TableCell><strong>Points</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <React.Fragment key={user.name}>
                  <TableRow>
                    <TableCell>
                      <Box
                        sx={styles.userName}
                        onClick={() => handleToggleUserDetails(user.name)}
                      >
                        {user.name}
                        <IconButton sx={styles.expandButton}>
                          <ExpandMoreIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>{user.articles}</TableCell>
                    <TableCell>{user.points}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={3}>
                      <Collapse in={expandedUser === user.name} timeout="auto" unmountOnExit>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell><strong>Article</strong></TableCell>
                              <TableCell><strong>Reviewed By</strong></TableCell>
                              <TableCell><strong>Points</strong></TableCell>
                              <TableCell><strong>Reviewed On</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {user.submittedArticles.map((article, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                                    {article.title}
                                  </a>
                                </TableCell>
                                <TableCell>{article.reviewer}</TableCell>
                                <TableCell>
                                  {article.points}{" "}
                                  {article.acceptedPoints && `(+${article.acceptedPoints} accepted)`}
                                </TableCell>
                                <TableCell>{article.reviewedOn}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Roboto', sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  statsContainer: {
    marginBottom: "1.5rem",
  },
  tableContainer: {
    marginTop: "2rem",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  expandButton: {
    marginLeft: "8px",
    transform: "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
  },
};

export default JuryReview;
