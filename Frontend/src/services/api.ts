import axios from "axios";

const api = axios.create({
  baseURL: "/api"
});

export const fetchRisks = async () => {
  const response = await api.get("/risks");
  return response.data.data;
};

export const fetchControls = async () => {
  const response = await api.get("/controls");
  return response.data.data;
};

export const fetchCompliance = async () => {
  const response = await api.get("/compliance");
  return response.data.data;
};

export default api;