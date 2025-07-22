// src/lib/axiosInstance.ts
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ usa la variable de entorno
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
