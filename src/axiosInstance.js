// utils/axiosInstance.js
"use client";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // apni API ka base URL
});

// har request se pehle token attach karo
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
