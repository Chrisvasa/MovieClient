import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7174/api/",
});

export default api;