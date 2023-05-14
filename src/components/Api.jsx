import axios from "axios";

// Base API for the local DB to be used around the program
const api = axios.create({
  baseURL: "https://localhost:7174/api/",
});

export default api;