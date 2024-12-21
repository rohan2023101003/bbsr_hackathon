import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UserArticleList = ({ userData }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="user-article-list">
      <Accordion expanded={expanded} onChange={toggleExpand} sx={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={styles.accordionSummary}
        >
          <Typography sx={styles.userSummary}>
            <strong>{userData.name}</strong> — Articles: {userData.articles}, Points: {userData.points}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table sx={styles.table} aria-label="user articles">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Article</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Reviewed By</strong></TableCell>
                  <TableCell><strong>Points</strong></TableCell>
                  <TableCell><strong>Reviewed On</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.submittedArticles.map((article, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <a href={article.link} target="_blank" rel="noopener noreferrer" style={styles.articleLink}>
                        {article.title}
                      </a>
                    </TableCell>
                    <TableCell>{article.status || "Pending"}</TableCell>
                    <TableCell>{article.reviewer || "-"}</TableCell>
                    <TableCell>{article.points || "0"}</TableCell>
                    <TableCell>{article.reviewedOn || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const styles = {
  accordion: {
    marginBottom: "1rem",
    borderRadius: "8px",
  },
  accordionSummary: {
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
  },
  userSummary: {
    fontSize: "1rem",
    color: "#007bff",
  },
  table: {
    minWidth: 650,
  },
  articleLink: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
};

export default UserArticleList;
