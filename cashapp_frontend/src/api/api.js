import axios from "axios";

const API_BASE_URL = "https://cash-app-backend-eight.vercel.app"; // Django backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
