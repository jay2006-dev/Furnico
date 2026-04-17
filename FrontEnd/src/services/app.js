import axios from "axios";

const API = axios.create({
  baseURL: "https://furnico-9jph.onrender.com//api/v1",
});

API.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default API;
