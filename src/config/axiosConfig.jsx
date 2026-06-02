import axios from "axios";
import toast from "react-hot-toast";

// Create API instance with base configuration
const api = axios.create({
  baseURL: "https://explore-mates-backend.vercel.app/api",
  timeout: 10000,
  withCredentials: true,
});

// Request interceptor to add auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // toast.error('Session expired. Please login again.');
      // localStorage.removeItem('token');
      // // Redirect to login after a short delay to show toast
      // setTimeout(() => {
      //   window.location.href = '/login';
      // }, 1500);
    }

    // Handle server errors
    else if (error.response?.status >= 500) {
      toast.error("Server error. Please try again later.");
    }

    // Handle network errors
    else if (error.code === "ECONNABORTED" || !error.response) {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default api;
