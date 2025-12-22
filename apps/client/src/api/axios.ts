import axios from "axios";
import { useAuthStore } from "../store/auth/useAuthStore";

export const publicAxios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const authAxios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
authAxios.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
