import axios from "axios";

type User = {
  id: number;
  name: string;
  role: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get("http://localhost:5000/api/users");
  return response.data.data;
};