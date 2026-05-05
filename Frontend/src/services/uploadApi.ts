import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/upload";

export const fetchEvidence = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data.data;
};

export const uploadEvidence = async (formData: FormData) => {
  const response = await axios.post(API_BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data.data;
};