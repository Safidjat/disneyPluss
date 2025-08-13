import axios from "axios";

const VITE_AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;
const VITE_DISNEY_BASE_URL = import.meta.env.VITE_DISNEY_BASE_URL;

export const instanceForAuth = axios.create({
    baseURL: VITE_AUTH_BASE_URL,
    headers: {
        'Content-type': 'application/json',
    }
});
instanceForAuth.interceptors.request.use((config) => { 
  const token = localStorage.getItem("disneyToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const instanceForDisney = axios.create({
    baseURL: VITE_DISNEY_BASE_URL,
    headers: {
        'Content-type': 'application/json',
    }
});

