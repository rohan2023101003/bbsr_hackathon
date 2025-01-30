import { get, post } from "./index";

// Fetch submitted articles for a specific contest
export const fetchSubmittedArticles = (contestId) => 
  get(`/api/contest/${contestId}/submissions`);  // Here we are assuming that 'submissions' is the correct endpoint for fetching articles.


// Post review for an article
export const postArticleReview = (contestId, articleId, marks, feedback) => 
  post(`/api/contest/${contestId}/submit`, { 
    submission_id: articleId, 
    marks, 
    feedback 
  });
