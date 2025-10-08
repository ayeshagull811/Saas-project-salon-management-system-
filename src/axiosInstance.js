// utils/axiosInstance.js
"use client";
import axios from "axios";

// Set your Railway backend URL here
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // use env variable
  headers: {
    "Content-Type": "application/json",
  },
});


// Attach token to every request if it exists in localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
