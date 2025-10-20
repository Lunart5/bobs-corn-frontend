import axios, { AxiosResponse } from "axios";

import { toast } from "react-toastify";
import { useAuthStore } from "../store/useAuthStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const myAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

myAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

myAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (requestError) => {
    if (requestError) {
      if (axios.isAxiosError(requestError) && requestError.status == 401) {
        useAuthStore.getState().logout();
        toast.dismiss();
        toast.error("Session expired, make login again");
      }
      return Promise.reject(requestError);
    }
  }
);

export default myAxios;
