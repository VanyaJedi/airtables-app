import axios from "axios";

export const createAPI = () => {
  const api = axios.create({
    baseURL: `http://localhost:3001/`,
    timeout: 50000,
    withCredentials: false
  });

  return api;
};
