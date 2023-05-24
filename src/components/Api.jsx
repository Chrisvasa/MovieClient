import axios from "axios";

// Base API for the local DB to be used around the program
export const api = axios.create({
  baseURL: "https://localhost:7174/api/",
});

// TMDB API KEY - Insert your own here
export const apiKey = "";