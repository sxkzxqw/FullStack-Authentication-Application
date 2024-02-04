import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = `http://localhost:5000/api`
const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

api.interceptors.response.use((config) => {
  return config;
}, async (err) => {
  if (err.response.status === 401 && err.config && !err.config._isRetry) {
    try {
      const originalRequest = err.config;
      originalRequest._isRetry = true;

      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);

      return api.request(originalRequest);
    } catch (error) {
      alert(error);
    }
  }

  throw err;
})

export default api;