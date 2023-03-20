import axios from "axios";
import authHeader from "./header.service";
import { tokenStr } from "./header.service";
import IUser from '../types/Auth';

const user = localStorage.getItem("user");

export const currentUser: IUser = user ? JSON.parse(user) : {};



export const getCurrentUser = async () => {
  if (tokenStr) {
    return await axios
      .get(`${import.meta.env.VITE_URL}/user/me`, { headers: authHeader() })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return res.data;
      });
  }
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
