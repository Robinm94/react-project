import axios from "axios";
const API_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// Base URL to make requests to the movie database
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: "Bearer " + API_TOKEN,
  },
});

export default instance;
