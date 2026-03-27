import axios from "axios";

const api = axios.create({
  baseURL:  "https://auto-email-scheduler-3.onrender.com"
});

export default api;