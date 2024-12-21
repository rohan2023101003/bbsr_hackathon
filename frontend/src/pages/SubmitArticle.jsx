import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, List, ListItem, Typography, Paper, Box } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Paper)({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
});

const FormContainer = styled('div')({
  marginBottom: "20px",
});

const SubmitButton = styled(Button)({
  backgroundColor: "#007bff",
  color: "#fff",
  '&:hover': {
    backgroundColor: "#0056b3",
  },
});

const SubmittedArticlesContainer = styled(Box)({
  marginTop: "20px",
  backgroundColor: "#f9f9f9",
  padding: "15px",
  borderRadius: "8px",
});

const ListItemStyled = styled(ListItem)({
  borderBottom: "1px solid #ddd",
  padding: "10px 0",
});

const Header = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "15px",
  color: "#007bff",
});

const SubmitArticle = () => {
  const { contestId } = useParams();
  const [articleLink, setArticleLink] = useState("");
  const [submittedArticles, setSubmittedArticles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedArticles([...submittedArticles, articleLink]);
    setArticleLink("");
  };

  return (
    <Container>
      <Header variant="h4" gutterBottom>
        Submit Article for Contest: {contestId}
      </Header>

      <form onSubmit={handleSubmit}>
        <FormContainer>
          <TextField
            label="Article Link"
            variant="outlined"
            fullWidth
            value={articleLink}
            onChange={(e) => setArticleLink(e.target.value)}
            required
            sx={{ marginBottom: "20px" }}
          />
        </FormContainer>

        <SubmitButton type="submit" variant="contained" fullWidth>
          Submit Article
        </SubmitButton>
      </form>

      {submittedArticles.length > 0 && (
        <SubmittedArticlesContainer>
          <Typography variant="h6" gutterBottom>
            Submitted Articles:
          </Typography>
          <List>
            {submittedArticles.map((article, index) => (
              <ListItemStyled key={index}>
                {article}
              </ListItemStyled>
            ))}
          </List>
        </SubmittedArticlesContainer>
      )}
    </Container>
  );
};

export default SubmitArticle;
