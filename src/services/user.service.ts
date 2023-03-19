import axios from "axios";
import { Token } from "@/types/Auth";

const userString = localStorage.getItem("user");

const user: Token | null = userString ? JSON.parse(userString) : null;



export const updateUser = async (username: string, password: string) => {
  return await axios
    .put(
      `${import.meta.env.VITE_URL}/user/me`,
      {
        name: username,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }
    )
    .then((response) => {
      console.log(JSON.stringify(response.data) + "HELLO");
      return JSON.stringify(response.data);
    });
};
