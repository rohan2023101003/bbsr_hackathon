import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 
    "Content-Type": "application/json",
  },
});


export const get = async (url) => {
  const response = await apiClient.get(url);
  return response.data;
};

export const post = async (url, data) => {
  const response = await apiClient.post(url, data);
  return response.data;
};
