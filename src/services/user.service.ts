import axios from "axios";
import authHeader from "./header.service";

export const getCurrentUser = async () => {
  return await axios
    .get(`${import.meta.env.VITE_URL}/user/me`, { headers: authHeader() })
    .then((res) => {
      return res.data;
    });
};

export const updateUser = async (username: string, password: string) => {
  return await axios
    .put(
      `${import.meta.env.VITE_URL}/user/me`,
      {
        name: username,
        password: password,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      console.log(JSON.stringify(response.data) + "HELLO");
      return JSON.stringify(response.data);
    });
};
