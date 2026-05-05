// // frontend/src/services/authApi.ts

// import axios from "axios";

// const API_BASE = "http://localhost:5000/api/auth";

// export async function loginUser(username: string, password: string) {
//   const response = await axios.post(`${API_BASE}/login`, {
//     username,
//     password,
//   });

//   if (!response.data.success) {
//     throw new Error("Invalid username or password");
//   }

//   return response.data.data;
// }

import axios from "axios";

// 🔥 Use deployed backend URL
const API_BASE = "https://grc-dahboard.onrender.com/api/auth";

export async function loginUser(username: string, password: string) {
  const response = await axios.post(`${API_BASE}/login`, {
    username,
    password,
  });

  if (!response.data.success) {
    throw new Error("Invalid username or password");
  }

  return response.data.data;
}