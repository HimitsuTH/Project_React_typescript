import axios from "axios";

export const login = async (email: string, password: string) => {
  return await axios
    .post(`${import.meta.env.VITE_URL}/user/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
