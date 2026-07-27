import axios from "axios";

const api = axios.create({
  baseURL: "https://leads-management-system-1.onrender.com/api",
});

// Automatically send JWT token with every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;