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

// import axios from "axios";

// // 🔥 Use deployed backend URL
// const API_BASE = "https://grc-dahboard.onrender.com/api/auth";

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

// import axios from "axios";

// const API_BASE = "https://grc-dahboard.onrender.com/api/auth";

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







// import axios from "axios";

// const API_BASE = "https://grc-dahboard.onrender.com/api/auth";

// export async function loginUser(username: string, password: string) {
//   try {
//     const response = await axios.post(`${API_BASE}/login`, {
//       username,
//       password,
//     });

//     if (!response.data.success) {
//       throw new Error(response.data.message || "Invalid username or password");
//     }

//     return response.data.data;
//   } catch (error: any) {
//     console.error("LOGIN ERROR:", error?.response?.data || error);
//     throw new Error(
//       error?.response?.data?.message || "Login failed. Please try again."
//     );
//   }
// }




// import axios from "axios";
// import { API_BASE } from "../api/config"; // ✅ use common base

// export async function loginUser(username: string, password: string) {
//   try {
//     const response = await axios.post(`${API_BASE}/auth/login`, {
//       username,
//       password,
//     });

//     if (!response.data.success) {
//       throw new Error(response.data.message || "Invalid username or password");
//     }

//     return response.data.data;
//   } catch (error: any) {
//     console.error("LOGIN ERROR:", error?.response?.data || error);

//     throw new Error(
//       error?.response?.data?.message || "Login failed. Please try again."
//     );
//   }
// }










// import axios from "axios";
// import { API_BASE } from "../api/config";

// export async function loginUser(username: string, password: string) {
//   try {
//     const response = await axios.post(`${API_BASE}/auth/login`, {
//       username,
//       password,
//     });

//     if (!response.data.success) {
//       throw new Error(response.data.message || "Invalid username or password");
//     }

//     return response.data.data;
//   } catch (error: any) {
//     console.error("LOGIN ERROR:", error?.response?.data || error);

//     throw new Error(
//       error?.response?.data?.message || "Login failed. Please try again."
//     );
//   }
// }




import { API_BASE } from "../api/config"; // or correct path

export async function loginUser(username: string, password: string) {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, {
      username,
      password,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Invalid username or password");
    }

    return response.data.data;
  } catch (error: any) {
    console.error("LOGIN ERROR:", error?.response?.data || error);
    throw new Error(
      error?.response?.data?.message || "Login failed. Please try again."
    );
  }
}