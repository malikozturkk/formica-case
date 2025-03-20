import axios from "axios";
import { refreshAccessToken, getCookie } from "./auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://formica-case.local/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const accessToken = getCookie("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken(); 

        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config); 
        }
      } catch (refreshError) {
        console.error("Session expired. Please log in again.");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
