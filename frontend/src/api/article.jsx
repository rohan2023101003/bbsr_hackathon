import { get, post } from "./index";

export const fetchArticles = (contestId) => get(`/articles/${contestId}`);
export const submitArticle = (contestId, articleLink) =>
  post(`/articles`, { contestId, articleLink });
